const { ShardingManager } = require(`discord.js`)
const ayarlar = require(`./ayarlar.json`)

const shards = new ShardingManager(`./bot.js`, {
token : ayarlar.token,
totalShards : 2 })

shards.spawn()