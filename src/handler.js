const {exec} = require("child_process")
const fs = require("fs");
const path = require("path");
const { getMessages, simulate, reply, check, filterMsg } = require("./lib");
require("../config");

exports.commandHandler = async (sock, msg) => {
  try {
    const pathCmd = path.join(__dirname, "commands");
    const message = await getMessages(msg);
    const commands = fs.readdirSync(pathCmd);

    if(check.isOwner(msg) && await message.startsWith("$ ")){
      const cmd = await filterMsg.position(msg, "except first");
      try {
        const output = await new Promise((resolve, reject) => {
            exec(cmd, async (err, stdout, stderr) => {
                if(err){reject(new Error(`[ ! ] ${err.message}`))}
                else if(stderr){reject(new Error(stderr))}
                else resolve(stdout)
            });
        })
        await reply(sock, msg, output)
      } catch (e) {
        await reply(sock, msg, `[ ! ] ${e}`);
      }
    }

    commands?.forEach((cmd) => {
      const commandPath = path.join(pathCmd, cmd);
      const c = require(commandPath);
      c?.triggers?.forEach((alias) => {
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
