const { reply, menu } = require("../lib");

module.exports = {
  name: "Menu",
  triggers: ["menu", "info"],
  code: async (sock, msg) => {
    let text = `Hai ${msg.messages[0].pushName}, berikut adalah beberapa fitur yang tersedia!\n\n${menu()}`
    reply(sock, msg, text)
  },
};
