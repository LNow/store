import fastify from "fastify";
import { EventType, handleNewEvent } from "./events";

const server = fastify({
  logger: { level: "info", prettyPrint: true },
  bodyLimit: 500000000, // 500 MB
});

server.post("/new_block", async (request, reply) => {
  try {
    handleNewEvent(EventType.NewBlock, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

server.post("/new_burn_block", async (request, reply) => {
  try {
    handleNewEvent(EventType.NewBurnBlock, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

server.post("/new_mempool_tx", async (request, reply) => {
  try {
    await handleNewEvent(EventType.NewMempoolTx, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

server.post("/drop_mempool_tx", async (request, reply) => {
  try {
    await handleNewEvent(EventType.DropMempoolTx, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

server.post("/attachments/new", async (request, reply) => {
  try {
    await handleNewEvent(EventType.NewAttachments, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

server.post("/new_microblocks", async (request, reply) => {
  try {
    await handleNewEvent(EventType.NewMicroblocks, request.body);
    reply.status(200).send({result: "ok"});
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: error });
  }
});

const PORT = 3000;
export const startServer = async () => {
  try {
    await server.listen(PORT);
  } catch (error) {
    server.log.error(error);
  }
};
