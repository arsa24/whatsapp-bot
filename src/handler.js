const fs = require("fs");
const path = require("path");
const { getMessages, simulate, reply, check } = require("./lib");
require("../config");

exports.commandHandler = async (sock, msg) => {
  try {
    const pathCmd = path.join(__dirname, "commands");
    const message = await getMessages(msg);
    const commands = fs.readdirSync(pathCmd);

    commands.forEach((cmd) => {
      const commandPath = path.join(pathCmd, cmd);
      const c = require(commandPath);
      c.triggers.forEach((alias) => {
        if (message.split(" ")[0].toLowerCase() === global.bot.prefix + alias) {
          simulate.typing(sock, msg);
          return c.code(sock, msg);
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
};
