const { reply, check, filterMsg } = require("../lib");

module.exports = {
  name: "Facebook Video",
  triggers: ["fb", "fbdl", "facebook"],
  code: async (sock, msg) => {
    try {
      // const url = await filterMsg.position(msg, "except first")
      await reply(sock, msg, "dalam pengembangan")
      // console.log(await downloader.facebook(url))
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
