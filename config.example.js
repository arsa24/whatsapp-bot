const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

global.bot = {
  name: "",
  ownerNumber: "62xxxxx",
  phoneNumber: "62xxxxx",
  prefix: ".",
};

global.ai = {
  APIKEY: "",
  instruction: "",
  safetySettings: [
    // {
    //   category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //   threshold: HarmBlockThreshold.BLOCK_NONE,
    // },
    // {
    //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    //   threshold: HarmBlockThreshold.BLOCK_NONE,
    // },
    // {
    //   category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    //   threshold: HarmBlockThreshold.BLOCK_NONE,
    // },
    // {
    //   category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    //   threshold: HarmBlockThreshold.BLOCK_NONE,
    // },
  ],
};

global.sticker = {
  author: "",
  packname: "",
};

global.headers = {
  y2mate: {
    // headers: {
    //   Accept: "*/*",
    //   "Accept-Encoding": "gzip, deflate, br, zstd",
    //   "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    //   "Sec-Ch-Ua":
    //     '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
    //   "Sec-Ch-Ua-Mobile": "?0",
    //   "Sec-Fetch-Dest": "empty",
    //   "Sec-Fetch-Mode": "cors",
    //   "Sec-Fetch-Site": "same-origin",
    //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //   Cookie:
    //     "_ga=GA1.1.1785880904.1723306133; _ga_79G1567X4W=GS1.1.1723949738.7.0.1723949738.0.0.0",
    //   Origin: "https://id-y2mate.com",
    //   "User-Agent":
    //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    // },
  }
}