const Discord = require("discord.js");
const db = require("quick.db")
const jimp = require("jimp")
const client = new Discord.Client();
const express = require("express");
const app = express();

const fs = require("fs");

//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Bot Başarıyla Uptime Ediliyor . . .");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});

client.login(process.env.TOKEN);

client.on('guildMemberAdd', member => {
    let rol = db.fetch(`autoRole_${member.guild.id}`) 
    if(!rol) return;
    let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`) 
    if(!kanal) return;

 member.roles.add(member.guild.roles.cache.get(rol))
    let embed = new Discord.MessageEmbed()
    .setDescription('> :white_check_mark: **Sunucuya yeni katılan** **' + member.user.username+  '** **Kullanıcısına** <@&' + rol + '> **Rolü verildi** :white_check_mark:')
    .setColor('RANDOM')    //.setFooter(`<@member.id>`)
    member.guild.channels.cache.get(kanal).send(embed)

})
   client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`Bu sunucuda **QUİCK** Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          
        msg.reply('**Aleyküm Selam Hoşgeldin Sefalar Getirdin Sunucumuza ;)** ');    
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'hi'){
          
        msg.reply('**Hi welcome**');    
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sea'){
          
        msg.reply('**Aleyküm Selam Hoşgeldin Sefalar Getirdin Sunucumuza ;) :blue_book:** ');    
      }
      }
    });

//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engell-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\

client.on('message', async message => {
let aktif = await db.fetch(`reklamEngelcodeshare_${message.channel.id}`)
if (!aktif) return 
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
message.delete()
message.channel.send('```Reklamları Engelliyorum! Birdaha Yapma !!!```').then(msg => msg.delete(7000)) 
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
let aktif = await db.fetch(`reklamEngelcodeshare_${oldMsg.channel.id}`)
if(!aktif) return
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
newMsg.delete()
oldMsg.reply('```Reklamları Engelliyorum! Birdaha Yapma !!!```').then(msg => msg.delete(7000)) 
}
});


//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "yavşak",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "oç",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("#01CFFE")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }
  
  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim! <a:unlem:724733762541453384>`
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
    
      }
    }
  }
});

//-------------------KÜFÜR ENGEL SON-----------------------\\


//------------------OTOTAG SİSTEMİ--------------------\\

client.on("guildMemberAdd", async member => {
let frenzy_ibrahim = await db.fetch(`Frenzy?Code?Ototag_${member.guild.id}`) 
let frenzykanal = await db.fetch(`Frenzy?Code?OtotagKanal_${member.guild.id}`)
if(!frenzy_ibrahim || !frenzykanal) return
  
  var embed2 = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor("Ototag Sistemi")
    .setDescription(
      `**${member.user.username}** Adlı Kullanıcıya Başarıyla **${frenzy_ibrahim}** Tagı'nı Verdim <a:syes6:724744149693235213>`
          );
      
 
 member.setNickname(`${frenzy_ibrahim} ${member.user.username}`)
client.channels.cache.get(frenzykanal).send(embed2)
 
});


//------------OTOTAG SİSTEMİ SON-----------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\


client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
  skanal31.send(`:white_check_mark: \`${ member.user.tag }\` Adlı Kullanıcı Sunucuya Katıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac - member.guild.members.cache.size}\` Kullanıcı Kaldı. Tam Tamına \`${member.guild.members.cache.size}\` Kişiyiz ! :white_check_mark:  ` );
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
  skanal31.send(`:x: \`${  member.user.tag }\`Adlı Kullanıcı Sunucudan Ayrıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac - member.guild.members.cache.size}\` Kullanıcı Kaldı. Tam Tamına \`${member.guild.members.cache.size}\` Kişiyiz !:x: `);
});

//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\
client.on("channelCreate", async (channel, member, guild) => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanal == "acik") {
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Sunucunuzda yeni bir kanal oluşturuludu! fakat geri silindi! (Kanal Koruma Sistemi) "
      )
      .setColor("BLUE");
    channel.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("channelDelete", async channel => {
  if(!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
  let member = guild.members.cache.get(logs.entries.first().executor.id);
  if(!member) return;
  if(member.hasPermission("ADMINISTRATOR")) return;
  channel.clone(channel.name, true, true, "Kanal silme koruması sistemi").then(async klon => {
    if(!db.has(`korumalog_${guild.id}`)) return;
    let logs = guild.channels.cache.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
    if(!logs) return db.delete(`korumalog_${guild.id}`); else {
      const embed = new Discord.MessageEmbed()
 .setDescription(`Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`)
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.displayAvatarURL());
      client.channels.cache.get(logs).send(embed)
    }
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})
///////////////////////OtoCevap////////////////////////////
///////////////////////OtoCevap////////////////////////////
///////////////////////OtoCevap////////////////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "AggSy") {
    const oto = new Discord.MessageEmbed()
    .setColor(0xF001FA)
    .setTitle("▬▬▬▬▬▬[:gear: Yardım Mesajım :gear:]▬▬▬▬▬▬\n ")
    .addField("\n**Galiba Benden Yardım İstiyorsun ? O zaman Sana Yardım Edeyim.**\n", "**\n-yardım Yazarak Benim Tüm Komutlarımı Görebilirsin ve Aşşağıdaki Destek Sunucusuna Gelerek Botun Sahibinden Yardım Alabilirsin.**")
    .addField("**➥ Link**", "[:white_check_mark: Destek Sunucu](https://discord.gg/5yQTkNh)")
    .setFooter(`${msg.author.username} Yardım Edebildiysem Çok Mutluyum.`, msg.author.avatarURL())
        
    msg.channel.send(oto)
    }
});

///////////////////////OtoCevap Bitiş////////////////////////////
///////////////////////OtoCevap Bitiş////////////////////////////
///////////////////////OtoCevap Bitiş////////////////////////////
client.on("message", async message => {
  const ms = require('parse-ms');

  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`-afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    let zamans = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = ms(Date.now() - zamans);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
      const muah = new Discord.MessageEmbed()
    .addField(`\`${message.author.username}\` -->  **AFK modundan çıktın.**`,  `\`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniye**  süredir,  AFK modundaydın`)
    .setColor("#00ff88")
    .setFooter(`AggSy | AFK Sistemi. `,client.user.avatarURL());
      message.channel.send(muah);
  }
  
  var zamanu = message.mentions.users.first();
  if(!zamanu) return;
  var REASON = await db.fetch(`afk_${zamanu.id}`);
  
  if(REASON) {
    let zamant = await db.fetch(`afk_süre_${zamanu.id}`);
    let sa = ms(Date.now() - zamanu);
    const muah2  = new Discord.MessageEmbed()
    .addField(`\`${sa.author.username}\` adlı kullanıcı \`${REASON}\` sebebiyle;`,` \`${sa.hours}\` **saat**  \`${sa.minutes}\` **dakika** \`${sa.seconds}\` **saniye** den beri **AFK**`)
    .setColor("#00ff88")
    .setFooter(`AFK Sistemi.`, client.user.avatarURL());
    message.reply(muah2)
  }
});
client.on('guildCreate', guild => {
let porno = guild.channels.cache.filter(sex => sex.type === "text").random()
    porno.send("**AggSy Adlı Bot** Sunucunuza Eklendi.. \n -yardım yazarak işlem başlatılabilir \n Eğer Herşey zorsa `https://discord.gg/5yQTkNh` Adresine gelerek yardım alabilirsin");

});
client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL())
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **-bot-izni kaldır botun_id**.`);
    cod.send(are);
     } else {
       let izinverilmemişbot = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL())
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve Kickledim. Eğer izin vermek istiyorsanız ** **-bot-izni ver botun_id**")//NWA
       member.kick();// Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
       cod.send(izinverilmemişbot)
}
  }//NWA
});//NWA
client.on("guildMemberAdd", member =>  {
  let kayıtmesaj = db.get(`kayıtmesaj_${member.guild.id}`)
if(kayıtmesaj == "açık") {
let mesaj = db.get(`girişmesaj_${member.guild.id}`,)
let kanal = db.get(`kayıtkanal_${member.guild.id}`)


if(!mesaj) {
client.channels.get(kanal).send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Sunucuya Hoşgeldin.')
.setDescription(`${member} Aramıza hoşgeldin! -kayıt-ol yazarak kayıt olabilirsin.`))
return
}

if(mesaj) {
var mesajs = db.get(`girişmesaj_${member.guild.id}`).replace("-uye-", member)
client.channels.cache.get(kanal).send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Sunucuya Hoşgeldin.')
.setDescription(mesajs))
}
}
})


client.on("emojiDelete", async (emoji, message) => {
  
  let kanal = await db.fetch(`emotek_${emoji.guild.id}`);
  if (!kanal) return;
  
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == emoji.guild.owner.id) return;
  if (!emoji.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
    
  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
    
   let embbed = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTitle(`Bir Emoji Silindi`)///AggSy code
   .setDescription(`Silinen Emoji: ${emoji.name}, Emoji Koruma Sistemi Açık Olduğundan Tekrar Eklendi!`)
   message.client.channels.cache.get(kanal).send(embbed)
  
  }

});






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

