const { exec } = require("child_process");
const { reply, check, filterMsg } = require("../lib");

module.exports = {
  name: "CLI (Owner Only)",
  triggers: ["$"],
  code: async (sock, msg) => {
    if (check.isOwner(msg)) {
      const cmd = await filterMsg.position(msg, "except first");
      try {
        const output = await new Promise((resolve, reject) => {
            exec(cmd, async (err, stdout, stderr) => {
                if(err){reject(new Error(`[ ! ] ${err.message}`))}
                else if(stderr){reject(new Error(stderr))}
                else resolve(stdout)
            });
        })
        await reply(sock, msg, output)
      } catch (e) {
        await reply(sock, msg, `[ ! ] ${e}`);
      }
    } else {
      reply(
        sock,
        msg,
        "[ ! ] Anda tidak punya akses untuk menggunakan perintah ini!"
      );
    }
  },
};
