const { reply, check, filterMsg, downloader} = require("../lib");

module.exports = {
  name: "Facebook MP4",
  triggers: ["fb", "fbdl", "facebook"],
  code: async (sock, msg) => {
    try {
      const url = await filterMsg.position(msg, "except first")
      console.log(await downloader.facebook(url))
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
