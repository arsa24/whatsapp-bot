const { reply, check } = require("../lib");

module.exports = {
  name: "Ping",
  triggers: ["ping", "p"],
  code: async (sock, msg) => {
    reply(sock, msg, "pong")
  },
};
