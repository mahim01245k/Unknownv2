const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const errors = require("../../assets/json/errors");

module.exports = {
  name: "boobs",
  aliases: ["boobies", "bobs"],
  description: "Show a picture of boobs!",
  category: "nsfw",
  run: async (client, message, args) => {
    var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
    if (!message.channel.nsfw) {
      return message.channel.send(
        "Sorry Please **Turn On NSFW In Channel Settings** To Use This Command!"
      );
    } else {
      const id = [Math.floor(Math.random() * 10930)];
      const res = await snekfetch.get(`http://api.obutts.ru/boobs/${id}`);
      const preview = res.body[0]["PREVIEW".toLowerCase()];
      const image = `http://media.obutts.ru/${preview}`;

      const embed = new Discord.MessageEmbed()
        .setFooter(`requested by ${message.author.username}`)
        .setImage(image)
        .setColor("#CEA0A6");
      return message.channel.send({ embed });
    }
  }
};
