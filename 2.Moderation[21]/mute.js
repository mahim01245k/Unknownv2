const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "Moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to mute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      let helpmute = new Discord.MessageEmbed()
        .setTitle("Command: !mute")
        .addField("**Description**:", `Mute anyone who break rules`, true)
        .addField("usage", "`mute <@mention> <reason>`", true)
        .addField("Example", `!mute @randomkid spamming`)
        .setColor("#000000");
      message.channel.send(helpmute);

      return;
    }

    if (user.id === message.author.id) {
      return message.channel.send("I can't mute you");
    }

    if (user.id === client.user.id) {
      return message.channel.send("You can't mute me!");
    }

    let reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send("Please Give the reason to mute the member");
    }

    let muterole = message.guild.roles.cache.find(
      muterole => muterole.name === "Muted"
    );

    if (!muterole) {
      muterole = await message.guild.roles.create({
        data: {
          name: "Muted",
          color: "GRAY",
          permissions: []
        }
      });
    }

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted");
    }

    user.roles.add(muterole);

    await message.channel.send(
      `You muted **${
        message.mentions.users.first().username
      }** For \`${reason}\``
    );

    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``);
  }
};
