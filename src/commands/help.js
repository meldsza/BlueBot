const config = require('./../config'); //loads the stored config
const Discord = require('discord.js');
const bot = require('./../bot')
module.exports = {
    description: "Lists commands and their specifications",
    syntax: `${config.identifier}help`,
    execute: (params, message) => {
        const commands = require('./commands'); //loads the commands
        let embed = new Discord.RichEmbed();
        embed.setAuthor(bot.user.username, bot.user.avatarURL)
        if (params[0])
            params[0] = params[0].toLowerCase()
        if (params.length < 1 || !commands[params[0]]) {
            embed.setTitle("Help")
            Object.entries(commands).forEach(([key, value]) => {
                embed.addField(config.identifier + key, value.description)
            });
        }
        else {
            embed.setTitle(params[0])
            embed.setDescription(commands[params[0]].description + "\nSyntax: " + commands[params[0]].syntax)
        }
        //console.log(embed)
        message.author.send({ embed: embed })
    }
}