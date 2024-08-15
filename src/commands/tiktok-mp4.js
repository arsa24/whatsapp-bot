const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const axios = require("axios");

module.exports = {
  name: "Tiktok MP4",
  triggers: ["ttdl", "tt", "ttmp4", "tiktok"],
  code: async (sock, msg) => {
    try {
      const urlYt = await filterMsg.position(msg, "except first");
      const payload = {
        k_query: urlYt,
        k_page: "home",
        hl: "",
        q_auto: "1",
      };

      const options = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      };
      const response = await axios.post(
        "https://id-y2mate.com/mates/analyzeV2/ajax",
        payload,
        options
      );
      const data = await response.data;
      if ((await data.status) == "ok") {
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
      }
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
