const { MessageEmbed } = require("discord.js");
const { OWNER_ID } = require("../../config.json");

module.exports = {
  name: "servers",
  aliases: ["servs"],
  description: "Displays a list of servers the bot is joined",
  category: "moderation",
  run: async (client, message, args) => {
    if (message.author.id === OWNER_ID) {
      const servers = message.client.guilds.cache.array().map(guild => {
        return `\`${guild.id}\` - **${guild.name}** - \`${guild.members.cache.size}\` members, \`${guild.channels.cache.size}\` channels`;
      });
      const embed = new MessageEmbed()
        .setTitle("List of Servers the bot is in")
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

      if (servers.length <= 10) {
        const range = servers.length == 1 ? "[1]" : `[1 - ${servers.length}]`;
        message.author.send(
          embed
            .setTitle(`Server List ${range}`)
            .setDescription(servers.join("\n"))
        );
        message.channel.send("Check your DM")
      }
    }
  }
};
