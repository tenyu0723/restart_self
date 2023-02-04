const {Client,Intents,MessageEmbed,MessageActionRow,MessageButton,} = require("discord.js-selfbot-v13");
const http = require("http");
const client = new Client({
  partials: ["CHANNEL"],
  intents: new Intents(32767),
  restTimeOffset: -1000,
  checkUpdate: false
});
const prefix = "";
const ids = ["945460382733058109"];

http.createServer(async function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end(`${client.user.tag} is ready!`)
  })
  .listen(3000)

if (process.env.TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`)
});

client.on("messageCreate", async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(!ids.includes(message.author.id) || !message.content.startsWith(prefix)) return;
  if(command == "say"){
    const arg = message.content.slice(prefix.length+4).trim();
    message.delete()
    message.channel.send(arg)
  }
  if(command == "click"){
    const row = Number(message.content.split(" ")[1])
    const col = Number(message.content.split(" ")[2])
    if(!message.reference){
      return message.reply("Please reply target message.")
    }
    const msg = await message.channel.messages.fetch(message.reference.messageId)
    if(!row || !col){
      return message.reply("Unknown args")
    }
    await msg.clickButton({ row: row, col: col })
  }
});

client.on("messageCreate", message => {
  if(!ids.includes(message.author.id)) return;
  if(message.content.startsWith("!say")){
    const arg = message.content.slice(5).trim();
    message.delete()
    message.channel.send(arg)
  }
});

client.on("messageCreate", async message => {
  if(message.author.id != "906452650822881321" || message.channel.id != "1071423202393333890") return;
  const embed = message.embeds[0]
  if(!embed || !embed.description){
    return;
  }
  if(embed.description.match(/120秒/)){
    let list = [];
    const length = message.components[0].components.length
    for(let i=0;i<length;i++){
      list.push(message.components[0].components[i].label)
    }
    const col = list.indexOf("No")
    await message.clickButton({ row: 0, col: col })
  }
});

client.login(process.env.TOKEN)
