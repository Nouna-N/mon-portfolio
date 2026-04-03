const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// ── Transporter Gmail ──────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Vérifier la connexion au démarrage ────────────────────────────────────────
transporter.verify((error) => {
  if (error) {
    console.error("❌ Erreur de connexion Gmail:", error.message);
  } else {
    console.log("✅ Connexion Gmail OK — prêt à envoyer des emails");
  }
});

// ── Route principale d'envoi ──────────────────────────────────────────────────
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Format d'email invalide." });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject} — ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0c0c12; border-radius: 12px; overflow: hidden; border: 1px solid #1f1f35;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0c1f18, #13131e); padding: 2rem 2.5rem; border-bottom: 1px solid #1f1f35;">
          <div style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; color: #6EE7B7; margin-bottom: 0.3rem;">
            Nouhaila Chahmi
          </div>
          <div style="font-family: monospace; font-size: 0.65rem; color: #6060a0; letter-spacing: 0.2em; text-transform: uppercase;">
            Nouveau message via le portfolio
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 2rem 2.5rem;">

          <!-- Infos expéditeur -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #1f1f35; width: 30%;">
                <span style="font-family: monospace; font-size: 0.65rem; color: #6060a0; letter-spacing: 0.1em; text-transform: uppercase;">Nom</span>
              </td>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #1f1f35;">
                <span style="color: #ffffff; font-size: 0.9rem;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #1f1f35;">
                <span style="font-family: monospace; font-size: 0.65rem; color: #6060a0; letter-spacing: 0.1em; text-transform: uppercase;">Email</span>
              </td>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #1f1f35;">
                <a href="mailto:${email}" style="color: #6EE7B7; font-size: 0.9rem; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0;">
                <span style="font-family: monospace; font-size: 0.65rem; color: #6060a0; letter-spacing: 0.1em; text-transform: uppercase;">Sujet</span>
              </td>
              <td style="padding: 0.6rem 0;">
                <span style="color: #93C5FD; font-size: 0.9rem;">${subject}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <div style="font-family: monospace; font-size: 0.65rem; color: #6060a0; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.8rem;">
            Message
          </div>
          <div style="background: #060608; border: 1px solid #1f1f35; border-left: 3px solid #6EE7B7; border-radius: 8px; padding: 1.2rem 1.5rem; color: #d0d0e8; font-size: 0.9rem; line-height: 1.8;">
            ${message.replace(/\n/g, "<br/>")}
          </div>

          <!-- Répondre -->
          <div style="margin-top: 1.5rem; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${subject}" 
               style="display: inline-block; padding: 0.75rem 2rem; background: #6EE7B7; color: #050a08; border-radius: 6px; font-family: monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; font-weight: 600;">
              ↩ Répondre à ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 1rem 2.5rem; background: #060608; border-top: 1px solid #1f1f35; text-align: center;">
          <span style="font-family: monospace; font-size: 0.6rem; color: #3a3a5c; letter-spacing: 0.1em;">
            Envoyé depuis le formulaire de contact · portfolio de Nouhaila Chahmi
          </span>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email envoyé — De: ${name} <${email}> | Sujet: ${subject}`);
    res.status(200).json({ success: true, message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("❌ Erreur envoi email:", error.message);
    res.status(500).json({ error: "Erreur lors de l'envoi. Veuillez réessayer." });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "✅ Backend portfolio Nouhaila — actif" });
});

// ── Démarrage ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📬 Route email : POST http://localhost:${PORT}/send-email\n`);
});