const { reply, check } = require("../lib");

module.exports = {
  triggers: ["ping", "p"],
  code: async (sock, msg) => {
    reply(sock, msg, "pong")
  },
};
