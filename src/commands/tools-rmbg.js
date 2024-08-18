const mime = require("mime-types");
const axios = require("axios");
const { uploadByBuffer } = require("telegraph-uploader");
const {
  downloadMediaMessage,
  downloadContentFromMessage,
} = require("@whiskeysockets/baileys");
const { reply, check, textFormatter } = require("../lib");

module.exports = {
  name: "Remove Background",
  triggers: ["removebg", "removebackground", "rmbg"],
  code: async (sock, msg) => {
    let url;
    if (
      (await check.messageType(msg)) !== "imageMessage" &&
      !(await check.isQuotedMediaMsg(msg))
    ) {
      return await reply(
        sock,
        msg,
        "[ ! ] Sertakan gambar atau reply gambarnya!"
      );
    } else {
      let buffer;
      if (!(await check.isQuotedMediaMsg(msg))) {
        buffer = await downloadMediaMessage(msg.messages[0], "buffer");
        const urlBuffer = await uploadByBuffer(buffer, mime.contentType("png"));
        url = urlBuffer.link;
      } else {
        const quotedMessage = await msg.messages[0].message?.extendedTextMessage
          ?.contextInfo?.quotedMessage;

        const stream = await downloadContentFromMessage(
          quotedMessage["imageMessage"],
          "image"
        );
        buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        const urlBuffer = await uploadByBuffer(buffer, mime.contentType("png"));
        url = urlBuffer.link;
      }
    }

    axios
      .get("https://api.nyxs.pw/tools/removebg", {
        params: {
          url: url,
        },
      })
      .then(async (response) => {
        if (response.data.status == "false")
          await reply(sock, msg, `[ ! ] ${response.data.message}`);
        else {
          await reply(sock, msg, {
            image: {
              url: await response.data.result,
            },
            mimetype: mime.contentType("png"),
            caption: "Done.",
          });
        }
      })
      .catch((err) => {
        reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${err}`);
      });
  },
};
