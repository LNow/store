import { EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";

export const client = EventStoreDBClient.connectionString(
  "esdb://localhost:2113?tls=false"
);

export const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1
  });
}
