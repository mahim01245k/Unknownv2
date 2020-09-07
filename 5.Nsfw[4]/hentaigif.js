const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: 'hentaigif',
  description: 'Send A Hentai Gif Lol',
  usage: '[Prefix]hentaigif',
  category: 'nsfw',
  run: async (client, message, args) => {
    let { body } = await superagent.get(
      `https://nekos.life/api/v2/img/Random_hentai_gif`
    );

   if (message.channel.nsfw == false) {
      let errMessage =
        "Sorry Please **Turn On NSFW In Channel Settings** To Use This Command!";
      return message.reply(errMessage).then(msg => {
        msg.delete({ timeout: 5000 });
      });
    }    let hentaiEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Hentai Gif!')
      .setImage(body.url)
      .setFooter(`Requested by ${message.author.username}`);

    message.channel.send(hentaiEmbed);
  }
};
