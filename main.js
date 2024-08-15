const { makeWASocket, useMultiFileAuthState, proto, jidDecode, downloadContentFromMessage, downloadMediaMessage } = require("@whiskeysockets/baileys");
const { commandHandler } = require("./src/handler");
const { pino } = require("pino");
require("./config");

async function main() {
  const { state, saveCreds } = await useMultiFileAuthState("state");
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino({ level: "silent" }),
    // browser: ["", "", ""],
    auth: state,
    defaultQueryTimeoutMs: undefined,
    syncFullHistory: false,
  });

  sock.ev.on("connection.update", (m) => {
    const { connection, lastDisconnect } = m;
    if (connection === "close") {
      console.log(lastDisconnect);
      main();
    }
    if (connection === "open") {
      console.log(`Connected at ${sock.user.id}`);
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (msg) => {
    const key = {
      remoteJid: msg.messages[0].key.remoteJid,
      id: msg.messages[0].key.id,
      participant: msg.messages[0].key.participant,
    };

    await sock.readMessages([key]);
    
    commandHandler(sock, msg);
    
  });
}

main();
