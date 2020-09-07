const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'hentai',
  description: 'Send A Hentai image Lol',
  usage: '[Prefix]hentai',
  category: 'nsfw',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/v2/img/hentai`
    );

   if (message.channel.nsfw == false) {
      let errMessage =
        "Sorry Please **Turn On NSFW In Channel Settings** To Use This Command!";
      return message.reply(errMessage).then(msg => {
        msg.delete({ timeout: 5000 });
      });
    }    let hentaiEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Hentai!')
      .setImage(body.url)
      .setFooter(`Requested by ${message.author.username}`);

    message.channel.send(hentaiEmbed);
  }
};
