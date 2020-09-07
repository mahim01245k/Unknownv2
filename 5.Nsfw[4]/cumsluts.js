const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();

module.exports = {
  name: "cumsluts",
  category: "NSFW",
  description: "gives a cumsluts image!",

  run: async (client, message, args) => {
    if (message.channel.nsfw == false) {
      let errMessage =
        "Sorry Please **Turn On NSFW In Channel Settings** To Use This Command!";
      return message.reply(errMessage).then(msg => {
        msg.delete({ timeout: 5000 });
      });
    }
    async function work() {
      let owo = await neko.nsfw.cumsluts();

      const cumslut = new Discord.MessageEmbed()
        .setTitle("Cumsluts")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url)
        .setFooter(`requested by ${message.author.username}`);

      message.channel.send(cumslut);
    }

    work();
  }
};
