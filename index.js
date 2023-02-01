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

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`)
});

client.on("messageCreate", message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(!ids.includes(message.author.id) || !message.content.startsWith(prefix)) return;
  if(command == "say"){
    const arg = message.content.slice(prefix.length+4).trim();
    message.delete()
    message.channel.send(arg)
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

client.login(process.env.TOKEN)
