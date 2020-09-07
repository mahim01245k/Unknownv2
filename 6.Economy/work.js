const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");
const { MessageEmbed } = require ("discord.js")


module.exports = {
  name: "work",
  aliases: ["job"],
  category: "economy",
  usage: "work",
  description: "Work A Job To Get Money!",
  run: async (client, message, args) => {

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 3600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:incident_unactioned:737256810658005042> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:incident_actioned:737256810263871540> You worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}


}