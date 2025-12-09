const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = async (sock, msg, from) => {
  try {

    const isImage = msg.message?.imageMessage;
    const isQuotedImage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

    const isVideo = msg.message?.videoMessage;
    const isQuotedVideo = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;

    // Cek apakah pesan berupa media
    if (!isImage && !isQuotedImage && !isVideo && !isQuotedVideo) {
      return sock.sendMessage(from, { text: "Kirim gambar/video atau reply dengan .sticker" }, { quoted: msg });
    }

    // Ambil media yang benar
    const mediaMsg =
      isImage
        ? msg.message.imageMessage
        : isQuotedImage
        ? msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage
        : isVideo
        ? msg.message.videoMessage
        : msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;

    const mediaType = isImage || isQuotedImage ? "image" : "video";

    //SOP delay 2 detik dan status online
    await delay(2000);
    await sock.sendPresenceUpdate("available", from);
    await sock.readMessages([ msg.key ]);

    // === 1. BOT KETIK 3 DETIK ===
    await sock.sendPresenceUpdate("composing", from);
    await delay(3000);
    await sock.sendPresenceUpdate("paused", from);

    // === 2. BOT REPLY PESAN ===
    await sock.sendMessage(from, { text: "bentar bro gw buat dulu stikernya..." }, { quoted: msg });

    // === 3. SLEEP 5 DETIK TANPA ADA TYPING ===
    await delay(5000);

    // === 4. DOWNLOAD MEDIA ===
    const stream = await downloadContentFromMessage(mediaMsg, mediaType);
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    // === 5. BUAT STIKER ===
    const sticker = new Sticker(buffer, {
      pack: "Sticker TSM",
      author: "TSM BOT",
      type: StickerTypes.FULL,
      quality: 50,
      loop: true
    });

    const stickerBuffer = await sticker.toBuffer();

    // === 6. KIRIM STIKER ===
    await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });

  } catch (err) {
    console.log("ERROR STICKER:", err);
    await sock.sendMessage(from, { text: "Gagal membuat stiker." }, { quoted: msg });
  }
};
