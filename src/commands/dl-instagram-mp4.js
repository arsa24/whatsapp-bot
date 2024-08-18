const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const axios = require("axios");
require("../../config");

module.exports = {
  name: "Instagram Video",
  triggers: ["ig", "igmp4", "instagram"],
  code: async (sock, msg) => {
    const ig = await filterMsg.position(msg, "except first");
    const payload = {
      k_query: ig,
      k_page: "Instagram",
      hl: "en",
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
        let result = {
          username: data.author.username,
          deskripsi: data.title,
          resolusi: data.links.video[0].q_text,
          link: data.links.video[0].url,
        };

        await reply(sock, msg, {
          video: {
            url: result.link,
          },
          caption: `${textFormatter.bold("username:")} ${
            result.username
          }\n${textFormatter.bold("Deskripsi:")} ${
            result.deskripsi
          }\n${textFormatter.bold("Resolusi:")} ${result.resolusi}`,
          gifPlayback: false,
          ptv: false,
        });
      })
      .catch((err) => {});
  },
};
