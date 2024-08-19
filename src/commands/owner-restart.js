const { reply, check } = require("../lib");
const { exec } = require("child_process");

module.exports = {
  name: "Restart Bot",
  triggers: ["restart"],
  code: async (sock, msg) => {
    try {
      if (await check.isOwner(msg)) {
        reply(sock, msg, "Restart.");
        exec("pm2 restart whatsapp-bot");
      } else
        reply(
          sock,
          msg,
          "[ ! ] Anda tidak punya akses untuk menggunakan perintah ini!"
        );
    } catch (e) {
      reply(sock, msg, `[ ! ] ${e}`);
    }
  },
};
