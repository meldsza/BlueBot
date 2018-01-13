const Discord = require('discord.js')
module.exports = (user, moderator, action, reason, guild) => {
    const channel = guild.channels.find(ch => ch.name.toLowerCase().includes("log"))
    if (config.log && channel) {
        let embed = new Discord.RichEmbed();
        embed.setTitle(action)
        embed.setAuthor(moderator.username, moderator.avatarURL)
        embed.setDescription(`${user} was **${action}** for: *${reason}*`)
        channel.send({ embed: embed })
    }

}