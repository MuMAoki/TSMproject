module.exports = async (sock , from) => {
    const text = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                 *》》 TSMbot V3《《*                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━[ *INFO BOT* ]━━━━━━■
┃ 》Author : Apip 12 TKJ
┃ 》Github : MuMAoki
┃ 》Module : Baileys 7.0.0
┃ 》Language : Java Script
│ 》Prefix : tsm
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌─[ *🛠️ UTILITIES* ]────□
│ *info* - Info grup                                         
│ *ping* - Cek respon bot                              
│ *wiki* [query] - Cari di Wikipedia                
│ *cuaca* [kota] - Info cuaca                        
└─────────────────────────┘

┌─[ *🎮 FUN & GAMES* ]─□
│ *quotes* - Quotes harian             
│ *joke* - Lelucon receh               
│ *fakta* - Fakta unik                 
│ *meme* - Buat meme                   
└─────────────────────────┘

┌─[ *📱 MEDIA* ]─────□
│ *sticker* - Buat stiker              
│ *yt*  - Download YouTube
│   
│           
│ *tt* [link] - Download video TikTok         
└─────────────────────────┘
    `
    await sock.sendMessage(from, {text})
}
