const Discord = require("discord.js");
const AlexAPI = require("alexflipnote.js");
const AlexClient = new AlexAPI();

module.exports = {
  name: "amiajoke",
  category: "Images",
  usage: "amiajoke <user>",
  description: "Am I A Joke to You?",
  run: async (client, message, args) => {
    let avatar = message.mentions.users.size
      ? message.mentions.users
          .first()
          .avatarURL({ format: "png", dynamic: true, size: 2048 })
      : message.author.avatarURL({ format: "png", dynamic: true, size: 2048 });
    let link = await AlexClient.image.amiajoke({ image: avatar });
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setImage(link);
    message.channel.send({ embed });
  }
};
