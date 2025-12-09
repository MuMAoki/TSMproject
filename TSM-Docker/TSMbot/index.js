
console.log(`
████████╗███████╗███╗   ███╗██████╗  ██████╗ ████████╗
╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██╔═══██╗╚══██╔══╝
   ██║   ███████╗██╔████╔██║██████╔╝██║   ██║   ██║   
   ██║   ╚════██║██║╚██╔╝██║██╔══██╗██║   ██║   ██║   
   ██║   ███████║██║ ╚═╝ ██║██████╔╝╚██████╔╝   ██║   
   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═════╝  ╚═════╝    ╚═╝

                 TSM BOT — Version 3
`)
console.log("Initializing bot...\n")

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys")
const pino = require("pino")
const qrcode = require("qrcode-terminal")
const config = require("./config")
const prefix = config.prefix
const admin = config.admin
const author = config.author
const menu = require('./fitur/menu')
const sticker = require("./fitur/sticker")
const tiktok = require("./fitur/tiktok")
const delay = ms => new Promise(res => setTimeout(res, ms));
//const view = require ("./fitur/view")
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./TSMauth')

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    })

    // Update kredensial
    sock.ev.on('creds.update', saveCreds)

    // Tampilkan QR
    sock.ev.on('connection.update', (update) => {
        const { qr } = update
        if (qr) {
            console.log("SCAN QR INI!")
            qrcode.generate(qr, { small: true })
        }
    })

    // Handle pesan masuk
    sock.ev.on("messages.upsert", async ({ messages }) => {
        try {
            const msg = messages[0]
            if (!msg.message) return

        const from = msg.key.remoteJid

            // Ambil teks dari berbagai format pesan
        let teks =
            msg.message.conversation ||
            msg.message?.extendedTextMessage?.text ||
            msg.message?.imageMessage?.caption ||
            msg.message?.videoMessage?.caption ||
            ""



        // prefix dalam config.js: prefix: [".", ","]
        const { prefix } = require("./config")

        // Cek prefix yang digunakan
        let usedPrefix = null

        for (let pf of prefix) {
            if (teks.startsWith(pf)) {
                usedPrefix = pf
                break
            }
        }

        // Jika tidak ada prefix yg cocok
        if (!usedPrefix) return

        // Hilangkan prefix dari pesan
        const potongan = teks.slice(usedPrefix.length).trim()

        // Pecah command & argumen
        const args = potongan.split(" ")
        const cmd = args.shift().toLowerCase()
        const query = args.join(" ").trim()

        // Debug
        console.log("Prefix:", usedPrefix)
        console.log("CMD:", cmd)
        console.log("ARG:", query)


            //======================================
            //=====PERINTAH TSMbot V3 BY Maspip=====
            //====================================== 
            switch (cmd) {

                case "ping":
                case "p":
                    await delay(2000);
                    await sock.sendPresenceUpdate("available", from);
		    await sock.readMessages([ msg.key ]);
		    await sock.sendPresenceUpdate("composing", from);    
		    await delay(3000);   
	            await sock.sendPresenceUpdate("paused", from);
                    await sock.sendMessage(from, {text: "ping"})
		    await sock.sendPresenceUpdate("unavailable", from)
                    break

                case "owner":
		    await delay(2000);
                    await sock.sendPresenceUpdate("available", from);
	            await sock.readMessages([ msg.key ]);
                    await sock.sendPresenceUpdate("composing", from);
		    await delay(3000);
                    await sock.sendPresenceUpdate("paused", from);
                    await sock.sendMessage(from, {text: `Owner: ${author}`})
		    await sock.sendPresenceUpdate("unavailable", from)
                    break

                case "menu":
                case "m":
		    //SOP status and delay
                    await delay(2000);
                    await sock.sendPresenceUpdate("available", from);
		    await sock.readMessages([ msg.key ]);
	            await sock.sendPresenceUpdate("composing", from);
		    await delay(10000);
                    await sock.sendPresenceUpdate("paused", from);	    
                    await menu(sock, from)
	            await sock.sendPresenceUpdate("unavailable", from);
                    break

                case "sticker":
                case "stiker":
                case "s":
                case "$":
                    await sticker(sock, msg, from)
		    await sock.sendPresenceUpdate("unavailable", from);
                    break

                case "tiktok":
                case "tt":

                default:
		    await delay(2000);	    
                    await sock.sendPresenceUpdate("available", from);
	            await sock.readMessages([ msg.key ]);
	            await sock.sendPresenceUpdate("composing", from);
	            await delay(4000)
		    await sock.sendPresenceUpdate("paused", from);	    
                    await sock.sendMessage(from, {text: "Perintah tidak dikenali ketik *.menu*" })
	            await sock.sendPresenceUpdate("unavailable", from);

            }
        } catch (err) {
            console.log("Error handling message:", err)
        }
    })

    // Reconnect otomatis
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update

        if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log("Reconnecting...")
                startBot()
            } else {
                console.log("Koneksi terputus, scan ulang...")
            }
        }

        if (connection === "open") {
            console.log("Bot siap digunakan!")
        }
    })
}

startBot()
