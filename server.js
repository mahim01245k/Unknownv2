const { GiveawaysManager } = require("discord-giveaways");
const { token, default_prefix } = require("./config.json");
const { prefix } = require("./config.json");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");
const { Client, MessageEmbed } = require("discord.js");
const { badwords } = require("./data.json");
const Canvas = require("canvas");
const path = require("path");
const { utc } = require("moment");
const discord = require("discord.js");
const fs = require("fs");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const Default_Prefix = "!";
const { createCanvas, loadImage, registerFont } = require("canvas");
const request = require("node-superfetch");
const eco = require("economy-for-discord");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const config = require("./config.json");
const guildInvites = new Map();
const search = require("youtube-search");
const opts = {
  maxResults: 25,
  key: config.YOUTUBE_API,
  type: "video"
};

const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});
const db = require("quick.db"); //WE WILL BE USING QUICK.DB
const { addexp } = require("./handlers/xp.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//IS URL FUNCTION - START

function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file =>
  file.endsWith(".js")
);
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file));
  client.commands.set(command.name, command);
} //LOADING DONE

//FINISH
//STOP
client.on("message", async message => {
  if (message.author.bot) return;
  //START
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    if (is_url(message.content) === true) {
      message.delete();
      return message.channel.send("You can not send link here").then(msg => {
        msg.delete({ timeout: 10000 });
      });
    }

    let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      message.delete();
      return message.channel
        .send("You are not allowed to send badwords here")
        .then(msg => {
          msg.delete({ timeout: 10000 });
        });
    }
  }

  //END
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);

  return addexp(message);
});
//prefix


//GONNA USE EVENT HERE

client.on("ready", function() {
  var clientonmessage = `
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.cache.size} servers!
${client.channels.cache.size} channels and ${client.users.cache.size} users cached!
I am logged in and ready to roll!
LET'S GO!
------------------------------------------------------
--------------Bot created by mahim#4371---------------
------------------------------------------------------
-----------------Bot's commands logs------------------`;

  console.log(clientonmessage);
  //The default game.
  //client.user.setActivity(`${client.guilds.size} servers | ${settings.botPREFIX}help`, { type: settings.statusTYPE });

  // Cool interval loop for the bot's game.
  let statusArray = [
    `${config.default_prefix}help | ${client.guilds.cache.size} servers!`,
    `${config.default_prefix}help | ${client.channels.cache.size} channels!`,
    `${config.default_prefix}help | ${client.users.cache.size} users!`
  ];

  setInterval(function() {
    client.user.setActivity(
      `${statusArray[~~(Math.random() * statusArray.length)]}`,
      { type: config.statusTYPE }
    );
  }, 50000);
});

//status end here


//welcome or leave start here

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let data = await canva.welcome(member, {
    link:
      "https://media.discordapp.net/attachments/735587754746052631/742768482311078048/wp2724187.jpg?width=864&height=359"
  });

  const attachment = new discord.MessageAttachment(data, "welcome-image.png");

  client.channels.cache
    .get(chx)
    .send("Welcome to our server " + member.user.tag, attachment);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let CurrentServerPrefix = db.get(`Prefix_${message.guild.id}`);
  if (CurrentServerPrefix === null) CurrentServerPrefix = Default_Prefix;

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
    return message.channel.send(
      `My Current Prefix Is : ${CurrentServerPrefix}`
    );
});

client.on("guildCreate", async guild => {
  const channel = guild.SystemChannel;
  channel.send(`Hello there! My original name is \`unknown\`!\n\
This bot created by **mahim#4371**\n\
For more info type \`${config.Default_Prefix}help`);

  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.login(token);
// T H I C C
