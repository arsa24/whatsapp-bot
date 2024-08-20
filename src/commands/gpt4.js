const { reply, check, filterMsg } = require("../lib");
const axios = require("axios");

module.exports = {
  name: "GPT 4",
  triggers: ["gpt"],
  code: async (sock, msg) => {

    async function gipiti4(
      messages,
      prompt = "kamu adalah asisten bahasa indonesia!"
    ) {
      try {
        return await new Promise(async (resolve, reject) => {
          if (!messages) return reject("undefined reading messages input");
          if (!Array.isArray(messages))
            return reject("invalid array input at messages!");

          axios
            .post("https://chatbot-gpt4.vercel.app/api/chat", {
              model: {
                id: "gpt-4",
                name: "GPT-4",
                maxLength: 24000,
                tokenLimit: 8000,
              },
              messages: messages,
              prompt: prompt,
              temperature: 0.7,
              top_p: 0.9,
              top_k: 60,
            })
            .then((res) => {
              const data = res.data;
              if (data === "Error") return reject("internal server error!");
              resolve({
                status: true,
                data: {
                  answer: data,
                },
              });
            })
            .catch(reject);
        });
      } catch (e) {
        return { status: false, message: e };
      }
    }

    const messagePrompt = await filterMsg.position(msg, "except first")

    let prompt =
      "sekarang lu berperan sebagai Kuromi Serika, temen gaul bahasa Indonesia, gaya bicara nya loe atau gue dan sedikit pamalu";
    gipiti4(
      [{ role: "user", content: messagePrompt }],
      prompt
    ).then(async (result) => {
        await reply(sock, msg, `AI: ${await result.data.answer}`)
    }).catch((err) => {
        
    });
  },
};
