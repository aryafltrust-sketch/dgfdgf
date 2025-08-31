import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ======= QUICK CONFIG =======
// 1) Background image (replace with your hosted URL if needed)
const BACKGROUND_URL = "/mnt/data/1344002.jpeg"; // fallback: put an https url here if preview doesn't load
// 2) Owner contacts
const OWNER_EMAIL = "Aryafltrust@gmail.com";
const OWNER_PHONE_INTL = "6281222134950"; // for wa.me link
const OWNER_PHONE_HUMAN = "081222134950"; // shown as text
// 3) EmailJS (optional, for live email form):
// Replace with your actual keys → https://www.emailjs.com/
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";

// Tiny star/particle generator for anime vibe
function useParticles(count = 60) {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const s = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      dur: Math.random() * 6 + 4,
      delay: Math.random() * 4,
      blur: Math.random() * 2,
    }));
    setStars(s);
  }, [count]);
  return stars;
}

// Simple carousel for Projects/Events section
const projects = [
  {
    title: "Crescent Isles Trailer",
    desc: "Cinematic Minecraft short with anime color-grade.",
    img: "https://images.unsplash.com/photo-1606117333329-2b4f4e3d8b2c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Frostmoon Scions",
    desc: "Character reel featuring Nebularium founders.",
    img: "https://images.unsplash.com/photo-1612036781124-847f8939e525?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Hoarfrost Groves",
    desc: "Map showcase with dynamic lighting & particles.",
    img: "https://images.unsplash.com/photo-1520975922323-27bpa?ixlib=rb-4.0.3&q=80&w=1600&auto=format&fit=crop",
  },
];

const founders = [
  {
    name: "Aryafltrust",
    role: "Founder & Visionary",
    badge: "★★★★★",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Nebula",
    role: "Creative Director",
    badge: "★★★★☆",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Satria",
    role: "Lead Animator",
    badge: "★★★★☆",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function NebulariumSite() {
  const stars = useParticles(70);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState("");
  const formRef = useRef(null);

  // Lazy EmailJS init (only if user configured keys)
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
      // @ts-ignore
      if (!window.emailjs) {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js";
        s.onload = () => {
          // @ts-ignore
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
        };
        document.body.appendChild(s);
      } else {
        // @ts-ignore
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    // If EmailJS NOT configured, fallback: mailto with prefilled body
    const notConfigured =
      EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY" ||
      EMAILJS_SERVICE_ID === "YOUR_EMAILJS_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_EMAILJS_TEMPLATE_ID";

    if (notConfigured) {
      const fd = new FormData(formRef.current);
      const body = encodeURIComponent(
        `Nama: ${fd.get("nama")}\nEmail: ${fd.get("email")}\nRole: ${fd.get("role")}\nKelas: ${fd.get("kelas")}\nUmur: ${fd.get("umur")}`
      );
      window.location.href = `mailto:${OWNER_EMAIL}?subject=Join Nebularium&body=${body}`;
      setSent("Form dialihkan ke email client kamu (silakan kirim). Untuk auto-send, isi kunci EmailJS di bagian config.");
      return;
    }

    // Use EmailJS
    try {
      setSending(true);
      // @ts-ignore
      await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current
      );
      setSent("✅ Form berhasil dikirim ke Gmail owner!");
      // @ts-ignore
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setSent("❌ Gagal mengirim. Cek konfigurasi EmailJS kamu.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white overflow-x-hidden">
      {/* ====== GLOBAL STYLES ====== */}
      <style>{`
        :root { --brand: 223 84% 66%; --brand2: 311 100% 77%; }
        .glass { background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); }
        .btn-shine { box-shadow: 0 0 0.75rem rgba(98, 171, 255, .6), inset 0 0 .4rem rgba(255,255,255,.2); }
        .stroke-title { -webkit-text-stroke: 1px rgba(255,255,255,.35); text-shadow: 0 0 20px rgba(157, 206, 255, .45); }
        .hero-bg { background-image: url('${BACKGROUND_URL}'); background-size: cover; background-position: center; }
        .hero-overlay { background: radial-gradient(1200px 600px at 60% 40%, rgba(70,120,255,0.25), transparent 60%), linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.65)); }
        @keyframes floaty { 0% {transform: translateY(0px)} 50% {transform: translateY(-8px)} 100% {transform: translateY(0px)} }
        .floaty { animation: floaty 6s ease-in-out infinite; }
        .twinkle { animation: twinkle 3.4s ease-in-out infinite; }
        @keyframes twinkle { 0%{opacity:.2} 50%{opacity:1} 100%{opacity:.2} }
      `}</style>

      {/* ====== NAVBAR ====== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-wide text-white">Nebularium</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-sky-300">Home</a>
            <a href="#characters" className="hover:text-sky-300">Characters</a>
            <a href="#projects" className="hover:text-sky-300">Projects</a>
            <a href="#join" className="hover:text-sky-300">Join</a>
            <a href="#support" className="hover:text-sky-300">Support</a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${OWNER_PHONE_INTL}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-sky-500/90 hover:bg-sky-400 btn-shine"
            >
              Chat Owner
            </a>
          </div>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section id="home" className="relative h-[110vh] w-full">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 hero-overlay" />

        {/* particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stars.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white/90 twinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                filter: `blur(${s.blur}px)`,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold stroke-title leading-[1.1]">
                A Dance of Blocks &\n                Stardust Stories
              </h1>
              <p className="text-white/90 max-w-xl">
                Nebularium Production — studio Minecraft berbalut nuansa anime. Kami membangun dunia, menulis kisah, dan membuat animasi sinematik.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#join" className="px-5 py-3 rounded-2xl bg-fuchsia-400/90 hover:bg-fuchsia-300 btn-shine">Join Nebularium</a>
                <a href={`mailto:${OWNER_EMAIL}`} className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25">Email Owner</a>
              </div>
            </motion.div>

            {/* big floating badge */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="justify-self-center">
              <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full glass floaty flex items-center justify-center">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400 btn-shine flex items-center justify-center text-2xl"
                >▶</button>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-sky-400/20 to-fuchsia-400/20 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 inset-x-0 text-center text-white/80 text-sm">Scroll down to explore benefits</div>
      </section>

      {/* ====== CHARACTERS / FOUNDERS ====== */}
      <section id="characters" className="relative py-20 bg-gradient-to-b from-black to-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold">Characters • Team</h2>
            <span className="text-white/60 text-sm">New players get 20 pulls ✦</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {founders.map((f, idx) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass"
              >
                <img src={f.avatar} alt={f.name} className="w-full h-64 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <div className="text-fuchsia-300 text-sm mb-1">{f.badge}</div>
                  <div className="text-2xl font-extrabold">{f.name}</div>
                  <div className="text-white/80">{f.role}</div>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/10 text-xs">Nebularium</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PROJECTS / EVENTS (Carousel-ish) ====== */}
      <section id="projects" className="py-20 bg-black/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-5xl font-extrabold">Version Content • Events</h2>
            <div className="text-xs text-white/60">Swipe →</div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x">
            {projects.map((p, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[420px] snap-start">
                <div className="rounded-2xl overflow-hidden glass">
                  <img src={p.img} className="h-56 w-full object-cover" />
                  <div className="p-5">
                    <div className="font-bold text-xl mb-1">{p.title}</div>
                    <p className="text-white/80 text-sm mb-4">{p.desc}</p>
                    <button className="px-4 py-2 rounded-xl bg-sky-500/80 hover:bg-sky-400 btn-shine">View More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== JOIN FORM ====== */}
      <section id="join" className="py-20 bg-gradient-to-b from-black/80 to-black">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Join Nebularium</h2>
            <p className="text-white/80">Isi formulir ini untuk bergabung. Submit akan terkirim ke Gmail owner. Jika EmailJS belum dikonfigurasi, klik akan membuka email client kamu.</p>
            <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc list-inside">
              <li>Role: Animator, Builder, Story Writer, Voice Actor, Editor</li>
              <li>Respon biasanya 2–3 hari kerja</li>
            </ul>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4">
            <div>
              <label className="text-sm text-white/70">Nama</label>
              <input name="nama" required className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 focus:outline-none" placeholder="Nama Anda" />
            </div>
            <div>
              <label className="text-sm text-white/70">Alamat Gmail</label>
              <input name="email" type="email" required className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 focus:outline-none" placeholder="email@gmail.com" />
            </div>
            <div>
              <label className="text-sm text-white/70">Role</label>
              <select name="role" required className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 focus:outline-none">
                <option value="">-- Pilih Role --</option>
                <option>Animator</option>
                <option>Builder</option>
                <option>Story Writer</option>
                <option>Voice Actor</option>
                <option>Editor</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Kelas</label>
                <input name="kelas" required className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 focus:outline-none" placeholder="Contoh: X IPA 2" />
              </div>
              <div>
                <label className="text-sm text-white/70">Umur</label>
                <input name="umur" type="number" min={7} required className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 focus:outline-none" placeholder="14" />
              </div>
            </div>
            <button disabled={sending} className="w-full mt-2 px-4 py-3 rounded-2xl bg-fuchsia-400/90 hover:bg-fuchsia-300 btn-shine">
              {sending ? "Mengirim..." : "Submit"}
            </button>
            {sent && <div className="text-sm text-white/80">{sent}</div>}
          </form>
        </div>
      </section>

      {/* ====== SUPPORT ====== */}
      <section id="support" className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Support & Chat Owner</h2>
            <p className="text-white/80">Butuh bantuan? Kamu bisa chat langsung atau kirim email ke owner.</p>
          </div>
          <div className="flex md:justify-end gap-3">
            <a href={`https://wa.me/${OWNER_PHONE_INTL}`} target="_blank" className="px-5 py-3 rounded-2xl bg-sky-500/90 hover:bg-sky-400 btn-shine">WhatsApp</a>
            <a href={`mailto:${OWNER_EMAIL}`} className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25">Email</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-4 text-white/70 text-sm">📞 Nomor: {OWNER_PHONE_HUMAN} • 📧 {OWNER_EMAIL}</div>
      </section>

      <footer className="py-6 text-center text-white/60 bg-black">© {new Date().getFullYear()} Nebularium Production. All Rights Reserved.</footer>
    </div>
  );
}
