const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

global.bot = {
  name: "",
  phoneNumber: "",
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