const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const errors = require("../../assets/json/errors");

module.exports = {
  name: "neko",
  aliases: ["catgirl", "nekomimi", "nekos"],

  category: "nsfw",
  run: async (client, message, args) => {
    if (!message.channel.nsfw) {
      return message.channel.send(
        "Sorry Please **Turn On NSFW In Channel Settings** To Use This Command!"
      );
    } else {
      const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`);
      const preview = res.body.neko;

      const embed = new Discord.MessageEmbed()
        .setImage(preview)
        .setColor("#A187E0")
        .setFooter(`requested by ${message.author.username}`)
      return message.channel.send({ embed });
    }
  }
};
