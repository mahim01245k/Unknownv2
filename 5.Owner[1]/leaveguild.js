const { MessageEmbed } = require("discord.js");
const { OWNER_ID } = require("../../config.json");

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "leaveguild",
  aliases: ["servs"],
  description: "leaves the guide",
  category: "owner",
  run: async (client, message, args) => {
        if (message.author.id === OWNER_ID) {

    const guildId = args[0];
    if (!rgx.test(guildId))
      return this.sendErrorMessage(
        message,
        "Invalid argument. Please provide a valid server ID."
      );
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild)
      return this.sendErrorMessage(
        message,
        "Unable to find server. Please check the provided ID."
      );
    const defaultChannel = guild.channels.cache.find(c =>
      c.permissionsFor(guild.me).has("SEND_MESSAGES")
    );

    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle("Leave Guild")
      .setDescription(`I have sucessfully left **${guild.name}**.`)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
        }
  }
};
