const { MessageEmbed } = require("discord.js");
const { utc } = require("moment");
const ms = require("ms");
const { version } = require("../../package.json");
const os = require("os");

module.exports = {
  name: "botinfo",
  usage: "botinfo",
  category: "Information",

  run: async (client, message, args) => {
    const core = os.cpus()[0];

    let embed = new MessageEmbed()

      .setColor(`RANDOM`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())

      .setTitle("❯ Botinfo!")
      .addField("General", [
        `**❯ Client:** ${client.user.tag} (${client.user.id})`,
        `**❯ Commands:** ${client.commands.size}`,
        `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
        `**❯ Users:** ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`,
        `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
        `**❯ Owner:** mahim#4371`,
        `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )}`,
        `**❯ Node.js:** ${process.version}`,
        `**❯ Version:** v${version}`,

        "\u200b"
      ])
      .addField("System", [
        `**❯ Platform:** ${process.platform}`,
        `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Speed: ${core.speed}MHz`
      ])

      .setFooter(
        message.member.user.username.toUpperCase(),
        message.member.user.displayAvatarURL()
      )
      .setTimestamp();

    message.channel.send(embed);
  }
};
