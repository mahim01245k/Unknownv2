const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const discord = require("discord.js");


module.exports = {
	name: "tempmute",
	category: "Moderation",
	description: "Returns latency and API ping",
	run: async (client, message, args) => {
		const user = message.mentions.members.first();
		if(!message.member.hasPermission("MANAGE_ROLES")) {
			return message.channel.send("You dont have perms to use that commands");
		}

		const incidentsCH = message.guild.channels.cache.find(channel => channel.name === 'logs');
		if(!incidentsCH) {
			return message.channel.send("Cant find the ``logs`` channel create one ||remember no special emojis, text etc||");
		}
		const role = message.guild.roles.cache.find(ro => ro.name === "Muted");
		if(!role) {
			message.guild.roles.create({
				data:{
					name: "muted",
					color: "GRAY",
				},
			});
		}
		if(!user) {
			return message.channel.send("you need to specify the user");
		}
		const time = args[1];
		if(!time) {
			return message.channel.send("How many are you going to mute that person ()");
		}
		const reason = args.splice(2).join(" ");
		if(!reason) {
			return message.channel.send("With what reason are you going to tempmute?:");
		}
		const mtembde = new MessageEmbed()
			.setTitle("Action: Tempmute")
			.addField("User:", user)
			.addField("Reason", reason)
			.addField("Moderator:", message.member.displayName)
			.addField("Time", time, true);
		const mtuembde = new MessageEmbed()
			.setTitle("YOU HAVE BEEN MUTED!!")
			.addField("Reason", reason)
			.addField("Moderator:", message.member.displayName)
			.addField("Time", time, true);
		incidentsCH.send(mtembde);
		user.send(mtuembde);
		user.roles.add(role);
		setTimeout(function() {
			user.roles.remove(role);
			user.send(`You are now unmuted! Just no make other time your bad action: ${reason}`);
		}, ms(time));
	},
};