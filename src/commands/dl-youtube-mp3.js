const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const mime = require("mime-types");
require("../../config");
const axios = require("axios");

module.exports = {
  name: "Youtube Audio",
  triggers: ["ytmp3"],
  code: async (sock, msg) => {
    const url = await filterMsg.position(msg, "except first");
    const payload = {
      k_query: url,
      k_page: "home",
      hl: "id",
      q_auto: 0,
    };
    axios
      .post(
        "https://id-y2mate.com/mates/analyzeV2/ajax",
        payload,
        global.headers.y2mate
      )
      .then(async (res) => {
        const data = await res.data;
        const reso = await data.links.mp3.mp3128;

        const convert = await y2mateConverter(data.vid, reso.k);

        let result = {
          title: convert.data.title,
          id: convert.data.vid,
          reso: convert.data.ftype,
          link: convert.data.dlink,
        };

        await reply(sock, msg, {
          audio: {
            url: result.link,
          },
          mimetype: mime.contentType("mp3"),
          caption: `${textFormatter.bold("Title:")} ${result.title}`,
        });
      })
      .catch((err) => {
        reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${err}`);
      });
  },
};
