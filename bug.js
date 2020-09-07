const config = require("../../config.json");
const { MessageEmbed } = require ("discord.js")
module.exports = {
  name: "bug",
  description: "Get a custom clyde message!",
  usage: "clyde <what_to_say>",
  category: "General",
  run: async (client, message, args) => {
    if (!args[0])
      return message.reply(
        "Please specify the bug. Example:\n`/punch isn't working. It isn't mentioning the user I'm trying to punch`"
      );
    if (args[0] === "bug")
      return message.reply(
        "Please specify the bug. Example:\n`/punch isn't working. It isn't mentioning the user I'm trying to punch`"
      );
   args = args.join(" ");
    message.reply("Thanks for submitting a bug!");
        const bugchannel = message.client.channels.cache.get(config.bugchannelid);

    const feedbackEmbed = new MessageEmbed()
      .setTitle('Feedback')
          .setThumbnail(bugchannel.guild.iconURL({ dynamic: true }))

      .setDescription(args)
      .addField('User', message.member, true)
      .addField('Server', message.guild.name, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    client.channels.cache.get(config.bugchannelid).send(feedbackEmbed);
  }
};
