const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require ("discord.js")

module.exports = {
  name: "daily",
  aliases: ["d", "Daily", "D"],
  category: "economy",
  usage: "daily",
  description: "Gives You Daily Credits!",
  run: async (client, message, args) => {
    let user = message.author;

    let timeout = 86400000;
    let amount = 1000;

    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:incident_unactioned:737256810658005042> You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(
          `<:incident_actioned:737256810263871540>  You've collected your daily reward of ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
    }
  }
};
