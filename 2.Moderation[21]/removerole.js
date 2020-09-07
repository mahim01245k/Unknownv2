const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "removerole",
  aliases: ["remover", "rr"],
  usage: "removerole <user mention/ID> <role mention/ID> [reason]",
  description: "Removes the specified role from the provided user.",
  category: "Moderation",
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send(
        "Please mention a user or provide a valid user ID"
      );
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send(
        "You cannot remove a role from someone with an equal or higher role"
      );

    const role = message.guild.roles.cache.find(val => val.name === args[1]);

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "`None`";
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    if (!role)
      return message.channel.send(
        "Please mention a role or provide a valid role ID"
      );
    else if (!member.roles.cache.has(role.id))
      // If member doesn't have role
      return message.channel.send("User does not have the provided role");
    else {
      try {
        // Add role
        await member.roles.remove(role);
        const embed = new MessageEmbed()
          .setTitle("Remove Role")
          .setDescription(`${role} was successfully removed from ${member}.`)
          .addField("Moderator", message.member, true)
          .addField("Member", member, true)
          .addField("Role", role, true)
          .addField("Reason", reason)
          .setFooter(
            message.member.displayName,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);

      } catch (err) {
        message.channel.send("Please check the role hierarchy");
      }
    }
  }
};
