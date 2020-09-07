const Discord = module.require("discord.js");
const ms = require("ms");

module.exports = {
  name: "lock",
  description: "Locks a Channel",
  category: "Moderation",
  run: async (client, message, args) => {
    let channel = message.mentions.channels.first();
    const time = args[1];

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have enough Permissions");
    }
    if (!channel) {
      message.channel.overwritePermissions([
        {
          id: message.guild.id,
          deny: ["SEND_MESSAGES"]
        }
      ]);

      const embed = new Discord.MessageEmbed()
        .setTitle("Channel Updates")
        .setDescription(`🔒 ${message.channel} has been Locked`)
        .setColor("RANDOM");
      await message.channel.send(embed);
      message.delete();
    }
    channel.overwritePermissions([
      {
        id: message.guild.id,
        deny: ["SEND_MESSAGES"]
      }
    ]);
    const reason = args.splice(2).join(" ");

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔒 ${message.channel} has been Locked`)
      .addField("Time", `${time || "Not given"}`)
      .addField("Reason", `${reason || "Not given"}`)
      .setColor("RANDOM");
    await channel.send(embed);
    message.channel.send("Done!");
    if (!time) {
      setTimeout(function() {
        channel.overwritePermissions([
          {
            id: message.guild.id,
            allow: ["SEND_MESSAGES"]
          }
        ]);
        channel.send(`This channel is unlocked now!`);
      }, ms(time));
    }
  }
};
