const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const axios = require("axios");
require("../../config");

module.exports = {
  name: "Tiktok Video",
  triggers: ["ttdl", "tt", "ttmp4", "tiktok"],
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
      .then(async (response) => {
        const data = await response.data;
        const vid = data.links.video[data.links.video.length - 1];

        let result = {
          desc: data.title,
          reso: vid.q_text,
          tiktokLink: data.keyword,
          url: vid.url,
        };

        await reply(sock, msg, {
          video: {
            url: result.url,
          },
          caption: `${textFormatter.bold("Deskripsi:")} ${
            result.desc
          } \n${textFormatter.bold("Resolusi:")} ${
            result.reso
          } \n${textFormatter.bold("Link:")} ${result.tiktokLink}`,
          gifPlayback: false,
          ptv: false,
        });
      })
      .catch((err) => {
        reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${err}`);
      });
  },
};
