const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shop",
  description: "Shows the shop",
  category: "enonomy",
  run: async (client, message, args) => {
    let shop2 = args.join(" 2");

    if (args[0] === "2") {
      let embed2 = new Discord.MessageEmbed()
        .setDescription(
          "**VIP Ranks**\n\nBronze: 00 Coins [!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [!buy nikes]\nCar: 800 [!buy car]\nMansion: 1200 [!buy mansion]"
        )
        .setColor("#FFFFFF");
      message.channel.send(embed2);
    } else {
      let embed = new Discord.MessageEmbed()
        .setDescription(
          "**VIP Ranks**\n\nBronze: 3500 Coins [!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [!buy nikes]\nCar: 800 [!buy car]\nMansion: 1200 [!buy mansion]"
        )
        .setColor("#FFFFFF");
      message.channel.send(embed);
    }
  }
};
