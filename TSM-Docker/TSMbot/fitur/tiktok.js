const axios = require("axios");

module.exports = async (sock, msg, from, text) => {
    try {
        // Validasi
        if (!text) {
            return await sock.sendMessage(from, { text: "Masukkan link TikTok!\nContoh: .tiktok https://vt.tiktok.com/xxxx" });
        }

        // Fungsi downloader TikTok (langsung di dalam file)
        async function downloadTiktok(url) {
            const encoded = new URLSearchParams();
            encoded.set("url", url);
            encoded.set("hd", "1");

            const res = await axios({
                method: "POST",
                url: "https://tikwm.com/api/",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Cookie": "current_language=en",
                    "User-Agent":
                        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
                },
                data: encoded
            });

            const data = res.data.data;

            return {
                title: data.title,
                no_watermark: data.play,
                cover: data.cover,
                music: data.music
            };
        }

        // Ambil data TikTok
        const result = await downloadTiktok(text);

        // Download video buffer
        const videoBuffer = (await axios.get(result.no_watermark, { responseType: "arraybuffer" })).data;

        // Kirim video
        await sock.sendMessage(from, {
            video: videoBuffer,
            caption: `🎵 *TikTok Downloader*\n\n${result.title}`
        });

    } catch (e) {
        console.error(e);
        await sock.sendMessage(from, { text: "Gagal mendownload video TikTok!" });
    }
};
