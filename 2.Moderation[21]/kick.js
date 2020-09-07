const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "Moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send('Please mention a user or provide a valid user ID');
    if (member === message.member) 
      return message.channel.send('You cannot kick yourself'); 
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('You cannot kick someone with an equal or higher role');
    if (!member.kickable) 
      return message.channel.send('Provided member is not kickable');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    await member.kick(reason);

    const embed = new MessageEmbed()
      .setTitle('Kick Member')
      .setDescription(`${member} was successfully kicked.`)
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Reason', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
member.send(`you have been kicked from ${message.guild.name} for ${reason}`)    
    // Update modlog
  }
};
