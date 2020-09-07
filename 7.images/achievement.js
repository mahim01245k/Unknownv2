const Discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "achievement",
  category: "Images",
  usage: "achievement <text>",
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text)
      return message.channel.send(
        "You need to provide text for the achievement"
      );
    if (text.length > 25)
      return message.reply("text must be under 25 characters.");
    const { body } = await superagent
      .get("https://www.minecraftskinstealer.com/achievement/a.php")
      .query({
        i: 1,
        h: "Achievement Get!",
        t: text
      });
    message.channel.send({
      files: [{ attachment: body, name: "achievement.png" }]
    });
  }
};
