const axios = require("axios")
const fs = require("fs")
const cheerio = require("cheerio")
const mime = require("mime-types")
require("../config")

exports.reply = async (sock, msg, content, options) => {
  if(typeof content == "string") content = { text: content}
  sock.sendMessage(msg.messages[0].key.remoteJid, content, {
    quoted: msg.messages[0],
    ...options
  })
}

exports.menu = () => {
  let text = `『 *Info Bot* 』\n\n> Owner: ${global.bot.owner}\n> Prefix: ${global.bot.prefix}\n\n`
  text += `『 *Menu Bot* 』\n\n`
  const path = "src/commands"
  let cmd = fs.readdirSync(path)
  cmd.forEach( c => {
      const commands = require(`${__dirname}/commands/${c}`)
      text += `┌[ ${this.textFormatter.bold(commands.name)} ]\n`
      let triggers = commands.triggers
      triggers.forEach(trigger => {
          text += `│⇨ .${trigger}\n`
      })
      text += `└\n\n`
  })
  text += `${this.textFormatter.italic("Serika Bot")}`
  return text
}

exports.filterMsg = {
  position: async (msg, p) => {
    const m = await this.getMessages(msg)
    if(p === "end"){
      let i = m.split(" ")
      return await m.split(" ")[i.length-1]
    }else if(p === "except first"){
      return await m.split(" ").slice(1).join(" ")
    }
  },
  index: async (msg, i) => {
    const m = await this.getMessages(msg)
    return await m.split(" ")[i]
  }
}

exports.check = {
  isGroup : async (msg) => {
    return await msg.messages[0].key.remoteJid?.endsWith("@g.us")
  },
  isFromMe: async (msg) => {
    return await msg.messages[0].key.fromMe
  },
  messageType: async (msg) => {
    return Object.keys(await msg.messages[0].message)[0]
  },
  isQuotedMediaMsg: async (msg) => {
    const messageType = await msg.messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage?.url ? true : await msg.messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.url ? true : false
    return messageType
  },
}

exports.textFormatter = {
  bold: (message) => {
    return `*${message}*`
  },
  italic: (message) => {
    return `_${message}_`
  },
  strikethrough: (message) => {
    return `~${message}~`
  },
  monospace: (message) => {
    return "```"+message+"```"
  },
  bulletedlist: (message) => {
    const msg = message
    const arLength = msg.length
    let res = ""
    let i = 0
    msg.forEach(list => {
      i++
      if(i === arLength){
        res+= `* ${list}`
      }else{
        res+= `* ${list}\n`
      }
    })
    return res
  },
  numberedlist: (message) => {
    const msg = message
    const arLength = msg.length
    let res = ""
    let i = 1
    message.forEach(list => {
      if(i === arLength){
        res += `${i++}. ${list}`
      }else{
        res += `${i++}. ${list}\n`
      }
    })
    return res
  },
  quote: (message) => {
    return `> ${message}`
  },
  code: (message) => {
    return "`"+message+"`"
  }
}

exports.getMessages = async (msg) => {
  const messageType = Object.keys(msg.messages[0].message)[0]
  return messageType == "conversation" ? await msg.messages[0].message.conversation : messageType == "extendedTextMessage" ? await msg.messages[0].message.extendedTextMessage.text : messageType == "imageMessage" ? await msg.messages[0].message.imageMessage.caption : messageType == "videoMessage" ? await msg.messages[0].message.videoMessage.caption : ""
}

exports.sendVN = async (sock, msg, url) => {
  return await sock.sendMessage(msg.messages[0].key.remoteJid, {
    audio: {
      url: url,
    },
    mimetype: mime.contentType("mp3"),
    ptt: true,
  });
}

exports.simulate = {
  typing: (sock, msg) => {
    sock.sendPresenceUpdate("composing", msg.messages[0].key.remoteJid)
  },
  recording: (sock, msg) => {
    sock.sendPresenceUpdate("recording", msg.messages[0].key.remoteJid)
  }
}

exports.tts = async (input) => {
  const urlAPI = "https://api.tts.quest/v1/voicevox/"
  try{
    const response = await axios.get(urlAPI, {
      params: {
        text: input,
        speaker: 1
      }
    })
    if(response.data.success === true){
      return response.data.mp3DownloadUrl
    }else return "Terjadi kesalahan dalam kode"
  }catch(e){return e}
}

exports.y2mateConverter = async (vidId, k) => {
  const options = {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",        
      }
  }
  const response = await axios.post("https://id-y2mate.com/mates/convertV2/index", {
      vid: vidId,
      k
  }, options)

  return await response
}

// otakudesu (download anime)

exports.getUpdatedUrl = async () => {
  try {
    const res = await axios.get("https://otakudesu.io/");
    const data = res.data;
    const $ = cheerio.load(data);

    let url;
    $("#skip", data).each((i, e) => {
      url = $(e).attr("href");
    });
    return url;
  } catch (e) {return e}
};

// Model:
// - gemma-7b-it
// - gemini-pro
// - mixtral-8x7b-32768

// curl 'https://api.acloudapp.com/v1/chat/completions' \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Bearer sk-9jL26pavtzAHk9mdF0A5AeAfFcE1480b9b06737d9eC62c1e' \
//   -d '{
//     "model": "gemini-pro",
//     "messages": [
//       {
//         "role": "user",
//         "content": "hi"
//       }
//     ],
//     "temperature": 0.7,
//     "max_tokens": 150,
//     "top_p": 1,
//     "frequency_penalty": 0,
//     "presence_penalty": 0,
//     "stop": ["\n"]
//   }'