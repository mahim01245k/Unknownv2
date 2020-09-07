const request = require("superagent");
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "advice",
  category: "General",
  usage: "advice",
  description: "gives a random life advice",
  run: async (client, message, args) => {
    request.get("http://api.adviceslip.com/advice").end((err, res) => {
      if (!err && res.status === 200) {
        try {
          JSON.parse(res.text);
        } catch (e) {
          return message.reply(", an api error occurred.");
        }
        const advice = JSON.parse(res.text);
        const adviceembed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Life Advice!")
          .setDescription(advice.slip.advice);

        message.channel.send(adviceembed);

      } else {
        console.error(`REST call failed: ${err}, status code: ${res.status}`);
      }
    });
  }
};
