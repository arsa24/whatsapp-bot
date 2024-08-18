const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const axios = require("axios");
require("../../config");

module.exports = {
  name: "Youtube Video",
  triggers: ["ytmp4", "yt"],
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
        const reso = await data.links.mp4.auto;
        const convert = await y2mateConverter(data.vid, reso.k);
        let result = {
          title: convert.data.title,
          id: convert.data.vid,
          reso: convert.data.fquality,
          link: convert.data.dlink,
        };

        await reply(sock, msg, {
          video: {
            url: result.link,
          },
          caption: `${textFormatter.bold("Judul:")} ${
            result.title
          } \n${textFormatter.bold("Resolusi:")} ${result.reso}`,
          gifPlayback: false,
          ptv: false,
        });
      })
      .catch((err) => {
        reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${err}`);
      });
  },
};
