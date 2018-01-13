const config = require('./../config'); //loads the stored config
const log = require('./../lib/log'); //loads the action log utility
module.exports = {
    description: "Mutes a person",
    syntax: `${config.identifier}mute <user mention> <time in minutes> <reason>`,
    execute: (params, message) => {
        let role = message.guild.roles.find(r => r.name.toLowerCase().includes("muted"));
        let member = message.mentions.members.first();
        member.addRole(role)
        params.shift();
        let time = parseInt(params.shift())
        if (time) {
            setTimeout(() => member.removeRole(role), time) //remove mute after time is up
            message.reply(`Muted ${member.user} for ${time} minutes for the following reason:\n\`${params.join(" ")}\``);
            log(member.user, message.author, "Muted for ${time} minutes", params.join(" "), message.guild)
        }
        else {
            message.reply(`Muted ${member.user} forever for the following reason:\n\`${params.join(" ")}\``);
            log(member.user, message.author, "Muted forever", params.join(" "), message.guild);
        }
    },
    min_params: 3,
    permission: "KICK_MEMBERS"
}