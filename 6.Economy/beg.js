const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "beg",
  description: "Beg to get money",
  category: "enonomy",
  run: async (client, message, args) => {
    let user = message.author;
    let name = [
      "Barack Obama",
      "Tom Hanks",
      "Will Smith",
      "Donald Trump",
      "Hillary Clinton",
      "Jennifer Lopez",
      "Tom Hanks",
      "Justin Bieber",
      "Vladimir Putin"
    ];
    let people = name[Math.floor(Math.random() * name.length)]
    let timeout = 60000;
    let amount = Math.floor(Math.random() * 100) + 0;

    let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:incident_unactioned:737256810658005042> You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:incident_actioned:737256810263871540> **${people}** gived you ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`beg_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
