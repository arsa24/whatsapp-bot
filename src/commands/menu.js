const { reply, menu } = require("../lib");

module.exports = {
  name: "Menu",
  triggers: ["menu", "info"],
  code: async (sock, msg) => {
    // const urlImage = await sock.profilePictureUrl(sock.user.id, "image")
    let text = `Hai ${msg.messages[0].pushName}, berikut adalah beberapa fitur yang tersedia!\n\n${await menu()}`
    // reply(sock, msg, {
    //   image: {
    //     url: urlImage
    //   },
    //   caption: 
    // })

    await reply(sock, msg, text)
  },
};
