 const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description:"Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "General",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided")
        .addField("Usage", "`" + command.usage + "`" || "Not Provided")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const general = new Discord.MessageEmbed()
        .setAuthor("General", client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())

        .setDescription(
          "`avatar`, `clyde`, `ping`, `emoji`, `invite`, `lmgtf`, `ticket`, `help`, `date`"
        )
        .setTimestamp();

      
      const fun = new Discord.MessageEmbed()
        .setAuthor("Fun", client.user.displayAvatarURL())
        .setDescription(
          "`meme`, `micesweeper`, `amazeme`, `slap`, `hug`, `pokemon`, `scrap`, `reverse`, `ascii`, `kiss`, `anime`, `sacrifice`"
        )
        .setThumbnail(client.user.displayAvatarURL())

        .setTimestamp();
      
      
      const info = new Discord.MessageEmbed()
        .setAuthor("Information", client.user.displayAvatarURL())
        .setDescription(
          "`spotify`, `github`, `corona`, `serverinfo`, `userinfo`, `weather`, `botinfo`, `channelinfo`, `imdb`,"
        )
        .setThumbnail(client.user.displayAvatarURL())

        .setTimestamp();
      
      

      const moderation = new Discord.MessageEmbed()
        .setAuthor("Moderation", client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())

        .setDescription(
          "`ban`, `softban`, `clear`, `kick`, `mute`, `tempmute`, `unmute`, `warn`, `reset-warns`, `warns`, `say`, `sayembed`, `slowmode`, `announce`, `setwel`, `setleave`, `dm`, `addemoji`"
        )
        .setTimestamp();

        
      const nsfw = new Discord.MessageEmbed()
        .setAuthor("Nsfw", client.user.displayAvatarURL())

        .setThumbnail(client.user.displayAvatarURL())

        .setDescription(
          "`hentai`, `hentaigif`, `neko`, `pussy`"
        )
        .setTimestamp();
          
      
      const owner = new Discord.MessageEmbed()
        .setAuthor("OWNER", client.user.displayAvatarURL())

        .setThumbnail(client.user.displayAvatarURL())

        .setDescription(
          "`restart`"
        )
        .setTimestamp();


      const pages = [general, moderation, info, fun, nsfw, owner];

      const emojiList = ["⏪", "⏩"];

      const timeout = "120000";

      pagination(message, pages, emojiList, timeout);
    }
  }
};
