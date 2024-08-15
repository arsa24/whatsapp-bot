const { reply, filterMsg, textFormatter, y2mateConverter } = require("../lib");
const mime = require("mime-types");
const axios = require("axios");

module.exports = {
  name: "Youtube Audio",
  triggers: ["ytmp3"],
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
        })
      }
    } catch (e) {
      reply(sock, msg, `${textFormatter.bold("[ ! ]")} ${e}`);
    }
  },
};
