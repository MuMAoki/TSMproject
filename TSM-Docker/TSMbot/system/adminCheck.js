module.exports = async function adminCheck(sock, m) {
    const from = m.key.remoteJid;
    const sender = m.key.participant || m.key.remoteJid;

    // Kalau bukan grup
    if (!from.endsWith("@g.us")) {
        return { isGroup: false, isSenderAdmin: false, isBotAdmin: true };
    }

    // Ambil metadata grup
    const metadata = await sock.groupMetadata(from);
    const participants = metadata.participants || [];

    // Normalisasi fungsi
    const normalize = jid => String(jid).split(":")[0];

    const senderJid = normalize(sender);

    // Ambil list admin grup (admin + superadmin)
    const admins = participants
        .filter(p => p.admin)
        .map(p => normalize(p.id || p.jid || p));

    const isSenderAdmin = admins.includes(senderJid);

    return {
        isGroup: true,
        isSenderAdmin,
        isBotAdmin: true // BYPASS BOT ADMIN
    };
};
