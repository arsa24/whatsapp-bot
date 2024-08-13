const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const axios = require("axios");

module.exports = {
  triggers: ["ig", "igmp4", "instagram"],
  code: async (sock, msg) => {
    const ig = await filterMsg.position(msg, "except first")
    try {
      const payload = {
        k_query: ig,
        k_page: "Instagram",
        hl: "en",
        q_auto: 0,
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
          caption: `${textFormatter.bold("username:")} ${result.username}\n${textFormatter.bold("Deskripsi:")} ${result.deskripsi}\n${textFormatter.bold("Resolusi:")} ${result.resolusi}`,
          gifPlayback: false,
          ptv: false,
        });
      }
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
