import { SHA512 } from "crypto-js";
import { pool } from "./db";

export const enum EventType {
  NewBlock = "new_block",
  NewBurnBlock = "new_burn_block",
  NewMempoolTx = "new_mempool_tx",
  DropMempoolTx = "drop_mempool_tx",
  NewAttachments = "new_attachments",
  NewMicroblocks = "new_microblocks",
}

export const handleNewEvent = async (type: EventType, body:any) => {
  switch (type) {
    case EventType.NewBlock: {
      const key = body.index_block_hash + body.block_hash + body.block_height;
      const hash = SHA512(key).toString();
      await saveEvent(type, hash, JSON.stringify(body));

      break;
    }

    case EventType.NewBurnBlock: {
      const key = body.burn_block_hash + body.burn_block_height + body.burn_amount;
      const hash = SHA512(key).toString();
      await saveEvent(type, hash, JSON.stringify(body));

      break;
    }
    case EventType.NewAttachments: {
      const key = JSON.stringify(body);
      const hash = SHA512(key).toString();

      await saveEvent(type, hash, key);
      break;
    }
    case EventType.NewMempoolTx:
    case EventType.DropMempoolTx:
    case EventType.NewMicroblocks: {
      break;
    }
  }
};

const saveEvent = async (type: EventType, hash: string, body: string) => {
  const queryText = `INSERT INTO event_store.raw_events(type, hash, body) VALUES ($1, $2, $3)
  ON CONFLICT ON CONSTRAINT raw_events_un DO nothing
  `;

  const client = await pool.connect();

  const result = await client.query(queryText, [type, hash, body]);
  client.release();
};
