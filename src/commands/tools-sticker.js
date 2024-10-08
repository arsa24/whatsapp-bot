require("../../config");
const { textFormatter, reply, check } = require("../lib");
const {createSticker} = require("sticker-maker-wa")
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "Sticker Maker",
  triggers: ["sticker", "s", "stiker"],
  code: async (sock, msg) => {
    try {
      if (
        (await check.messageType(msg)) !== "imageMessage" &&
        (await check.messageType(msg)) !== "videoMessage" &&
        !(await check.isQuotedMediaMsg(msg))
      ) {
        return await reply(
          sock,
          msg,
          textFormatter.bold("[ ! ] Sertakan gambar atau reply gambarnya!")
        );
      } else {
        let buffer;
        if (!(await check.isQuotedMediaMsg(msg))) {
          buffer = await downloadMediaMessage(msg.messages[0], "buffer");
        } else {
          const quotedMessage = await msg.messages[0].message
            ?.extendedTextMessage?.contextInfo?.quotedMessage;

          const typeMedia = (await msg.messages[0]?.message?.videoMessage)
            ? "video"
            : (await msg.messages[0]?.message?.imageMessage)
            ? "image"
            : (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                ?.quotedMessage?.imageMessage)
            ? "image"
            : (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                ?.quotedMessage?.videoMessage)
            ? "video"
            : "";

          const stream = await downloadContentFromMessage(
            quotedMessage[
              (await msg.messages[0].message?.extendedTextMessage?.contextInfo
                ?.quotedMessage?.imageMessage)
                ? "imageMessage"
                : (await msg.messages[0].message?.extendedTextMessage
                    ?.contextInfo?.quotedMessage?.videoMessage)
                ? "videoMessage"
                : null
            ],
            typeMedia
          );
          buffer = Buffer.from([]);
          for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
          }
        }

        const sticker = await createSticker(buffer, {
          metadata: {
            author: global.sticker.author,
            packname: global.sticker.packname,
          }
        })

        await reply(sock, msg, {sticker})
      }
    } catch (e) {
      console.error(e);
      return await reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
