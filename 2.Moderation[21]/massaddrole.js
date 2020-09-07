const Discord = require("discord.js");
module.exports = {
  name: "massaddrole",
  description: "Adds a role to everyone on the server!",
  usage: "massaddrole <rolename>",
  category: "Moderation",
  run: async (client, message, args) => {
    const role = message.guild.roles.cache.find(val => val.name === args[0]);
    if(!role) {
      return message.channel.send("Pleasr give a role to give")
    }
    const members = await message.guild.members.fetch();
    const msg = await message.channel.send(
      `🔄 | Adding role to **${members.size}** members...this might take a while...`
    );
    await members.forEach(m => m.roles.add(role));
  }
};
