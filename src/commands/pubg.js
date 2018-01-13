const config = require('./../config'); //loads the stored config
const log = require('./../lib/log'); //loads the action log utility
const rp = require('request-promise-native')
module.exports = {
    description: "Gives stats of a player on pubg",
    syntax: `${config.identifier}pubg <player name> (<mode> <season> <region>)`,
    execute: (params, message) => {
        let url = "https://api.pubgtracker.com/v2/profile/pc/" + params[0];
        if (params[1]) {
            url = url + "?mode=" + params[1]
        }
        if (params[2]) {
            url = url + "?season=" + params[2]
        }
        if (params[3]) {
            url = url + "?region=" + params[3]
        }
        rp({
            uri: url,
            headers: {
                'TRN-Api-Key': config.pubg_key || process.env.PUBG_KEY
            },
            json: true
        }).then(res => {
            if (res.error)
                message.reply(res.error)
            else {

            }
        }).catch(err => {
            console.log(err)
            message.reply("This feature is currently unavailable.")
        })
    },
    min_params: 1
}