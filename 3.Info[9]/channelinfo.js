const Discord = require("discord.js");
const channelTypes = {
  dm: "DM",
  group: "Group DM",
  text: "Text Channel",
  voice: "Voice Channel",
  category: "Information",
};
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelinfo",
  description: "Give Your Channel Information!",
  category: "Information",

  aliases: [""],
  usage: "Channelinfo <Mention Channel>",
  example: "<prefix>Channelinfo #meme",
  run: async (client, message, args) => {
    const channel = message.channel || message.guild.channels.get(args[0]);

    if (!channel) {
      return message.reply("please enter a valid channel.");
    }

    let channelEmbed = new MessageEmbed()
      .setColor(0x00ae86)
      .setThumbnail(message.guild.iconURL)
      .setTitle("Channel Info")
      .addField(
        "❯ Name",
        channel.type === "dm"
          ? `<@${channel.recipient.username}>`
          : channel.name,
        true
      )
      .addField("❯ ID", channel.id, true)
      .addField(
        "❯ Creation Date",
        channel.createdAt.toDateString(),
        true
      )
      .addField("❯ NSFW", channel.nsfw ? "Yes" : "No", true)
      .addField(
        "❯ Category",
        channel.parent ? channel.parent.name : "None",
        true
      )
      .addField("❯ Type", channelTypes[channel.type], true)
      .addField("❯ Topic", channel.topic || "None", true);

    message.channel.send(channelEmbed);
  }
};
