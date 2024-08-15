const { reply, check } = require("../lib");

module.exports = {
  name: "Tag All (Group Only)",
  triggers: ["tag", "everyone", "tagall"],
  code: async (sock, msg) => {
    try {
      if (await check.isGroup(msg)) {
        const groupData = await sock.groupMetadata(
          msg.messages[0].key.remoteJid
        );
        let mentions = [];

        groupData.participants.forEach(async (participant) => {
          if (sock.user.id.includes(participant.id.split("@")[0])) return;
          mentions.push(participant.id);
        });

        await reply(sock, msg, {
          text: "@everyone",
          mentions: mentions,
          quoted: msg.messages[0],
        })
      } else {
        reply(sock, msg, "error");
      }
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
