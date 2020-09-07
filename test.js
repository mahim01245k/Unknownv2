const Discord = require("discord.js");
const Canvas = require("canvas");

const client = new Discord.Client();

module.exports = {
  name: "test",
  description: "Invite the bot",
  category: "Other's",
  usage: "test",
  run: async (bot, message, args) => {
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 300);

      // Return the result to use in the actual canvas
      return ctx.font;
    };

    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://ethicsalarms.files.wordpress.com/2017/10/batman-slap-meme.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    // Slightly smaller text placed above the member's display name

    // Add an exclamation point here and below

    ctx.arc(125, 125, 3000, 0, Math.PI * 2, true);
    //           down
    const member =
      message.mentions.members.last() ||
      message.guild.members.cache.get() ||
      message.member;

    const avatar = await Canvas.loadImage(
      message.member.user.displayAvatarURL({ format: "png" })
    );
    const slapped = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png" })
    );
    ctx.drawImage(avatar, 250, 54, 140, 140);
    //                   left up
    ctx.drawImage(slapped, 405, 175, 160, 160);


    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "slap-image.png"
    );

    message.channel.send(attachment);
  }
};
