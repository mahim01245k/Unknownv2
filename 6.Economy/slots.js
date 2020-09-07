const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");
const slotItems = ["<:Grape:745656371688636447>", "<:Watermelon:745656456904310834>", "<:Orange:745656371046908036>", "<:Apple:745656317166878771>", "<:7_:745656371361349682>", "<:Strawberry:745656371273269259>", "<:Cherry:745656370618957917>"];
module.exports = {
  name: "slots",
  description: "slots is for gamble money",
  category: "enonomy",
  run: async (bot, message, args) => {
    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You are betting more than you have`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}
}