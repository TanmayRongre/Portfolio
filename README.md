# 🚀 Tanmay Rongre — Portfolio

> A sleek, dark-themed personal portfolio website built with vanilla HTML, CSS & JavaScript. Deployed at **[tanmayrongre.qzz.io](https://tanmayrongre.qzz.io)**

---

## ✨ Features

- 🎨 **Dark glassmorphism UI** — premium dark theme with orange (`#FF4A1C`) accent glow
- 🖱️ **Custom animated cursor** — dot + trailing outline that reacts to hover states (desktop only)
- 📌 **Sticky sidebar** — profile card stays in view while scrolling through sections
- 📜 **Sections** — Hero, About Me, Certifications, Services, Contact Form
- 🏅 **Certifications grid** — asymmetric card layout showcasing real certificates with verify links
- 📬 **Contact form** — name, email, subject & message fields
- 📱 **Responsive design** — adapts to tablet and mobile viewports
- ⚡ **Zero dependencies** — pure HTML, CSS & JS, no frameworks

---

## 🗂️ Project Structure

```
Portfolio/
├── index.html       # Main HTML — all sections in one page
├── style.css        # All styles, design tokens & responsive breakpoints
├── script.js        # Custom cursor logic with touch-device detection
├── CNAME            # Custom domain config (tanmayrongre.qzz.io)
└── icons/
    ├── profile.png      # Profile photo
    ├── avatar.png       # Avatar asset
    ├── cert1.png        # Google Gemini Educator certificate
    ├── cert2.png        # HCL GUVI / GrowthSchool certificate
    ├── cert3.png        # Additional certificate
    ├── github.png       # GitHub social icon
    ├── linkedin.png     # LinkedIn social icon
    └── instagram.png    # Instagram social icon
```

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Structure  | HTML5 (semantic)    |
| Styling    | Vanilla CSS3        |
| Logic      | Vanilla JavaScript  |
| Fonts      | Google Fonts — Poppins |
| Hosting    | GitHub Pages + Custom Domain |

---

## 📸 Sections Overview

### 🏠 Hero
Large typographic heading (`MERN FULL STACK.`) with key stats — certificates, internships, and projects.

### 👤 About Me
Two-column grid with a headline, lead paragraph, supporting text, and an asymmetric certifications card grid with live verify links:
- **ChatGPT for Everyone** — HCL GUVI
- **Generative AI Workshop** — GrowthSchool
- **Gemini Certified Educator** — Google

### 💼 Services
Three service tiles — **Web Design**, **Web Dev**, **App Dev** — with glassmorphism styling and hover lift effects.

### 📬 Contact
Full-width contact form with name, email, subject, and message fields.

---

## 🖱️ Custom Cursor

The custom cursor is **desktop-only**. On touch / mobile devices it automatically falls back to the native browser cursor using:

```css
@media (hover: none) and (pointer: coarse) {
    *, *:before, *:after { cursor: auto !important; }
    .cursor-dot, .cursor-outline { display: none !important; }
}
```

---

## 🚀 Getting Started

No build step needed — just open in a browser:

```bash
# Clone the repo
git clone https://github.com/TanmayRongre/Portfolio.git

# Open locally
cd Portfolio
start index.html      # Windows
open index.html       # macOS
```

Or visit the live site: **[tanmayrongre.qzz.io](https://tanmayrongre.qzz.io)**

---

## 🔗 Links

- 🌐 **Live Site** — [tanmayrongre.qzz.io](https://tanmayrongre.qzz.io)
- 🔗 **Connect Hub** — [tanmayrongre.github.io/Connect-hub](https://tanmayrongre.github.io/Connect-hub)
- 💼 **LinkedIn** — [linkedin.com/in/tanmayrongre](https://linkedin.com/in/tanmayrongre)
- 🐙 **GitHub** — [github.com/TanmayRongre](https://github.com/TanmayRongre)

---

## 📄 License

This project is open source. Feel free to use it as inspiration for your own portfolio.

---

<p align="center">Designed & Built by <strong>Tanmay Rongre</strong></p>
