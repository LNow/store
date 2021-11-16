import fastify from "fastify";
// import { connect } from "./event-store";

const PORT = 3000;


const server = fastify({
  logger: { level: "debug" },
});

server.get("/hello", async (_request, reply) => {
  reply.send({hello: "world"});
});

const startServer = async () => {
  try {
    // await connect();
    await server.listen(PORT);
    console.info(`Server started at port ${PORT}`);
  } catch (err) {
    server.log.error(err);
  }
};

startServer();
