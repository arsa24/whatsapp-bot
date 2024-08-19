const { reply, check } = require("../lib");
const { exec } = require("child_process");

module.exports = {
  name: "Stop Bot",
  triggers: ["stop"],
  code: async (sock, msg) => {
    try {
      if (await check.isOwner(msg)) {
        reply(sock, msg, "Stop.");
        exec("npm stop");
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
