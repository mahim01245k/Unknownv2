const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "Moderation",
  usage: "announce <#channel> <message>",
  description: "announce a message in specified channel",
  run: (client, message, args) => {
    let channel = message.mentions.channels.first();
    let aMessage = args.slice(1).join(" ");
    if (!channel) {
      return message.channel.send("Please Mention the channel first");
    }
    if (!aMessage) {
      return message.channel.send(
        "Please put the message you want to Announce ;-;"
      );
    }

    let aembed = new Discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle("ANNOUNCEMENT!")
      .setDescription(aMessage);
    message.channel.send("Message Sended");

    channel.send(aembed);
  }
};
