const Discord = require("discord.js");
const client = new Discord.Client();
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const db = require('quick.db')
const discord = require('discord.js')
const { getInfo } = require("../../handlers/xp.js")

module.exports = {
  name: "rank",
  description: "Get the level of author or mentioned",
  usage: "rank <user>",
  category: "General",
  run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    const {level, remxp, levelxp} = getInfo(xp);

    let data = await canva.rankcard({
      link:
        "https://i.pinimg.com/originals/76/0e/d7/760ed7f52c90870503762ac92db92adc.jpg",
      name: user,
      discriminator: message.author.discriminator,
      level: level,
      rank: 6,
      currentXP: remxp,
      fullXP: levelxp,
      avatar: user.displayAvatarURL({ format: "png" })
    });

    const attachment = new Discord.MessageAttachment(data, "welcome-image.png");

    message.channel.send(``, attachment);
  }
};
