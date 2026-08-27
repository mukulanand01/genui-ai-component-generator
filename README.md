# ⚡ GenUI — AI Component Generator

An AI-powered tool that generates clean, responsive UI components from a simple text description. Pick a framework, describe what you want, and let AI write the code for you — complete with a live code editor and instant preview.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Gemini API](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat&logo=google-gemini&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-0078D4?style=flat&logo=visual-studio-code&logoColor=white)

## 🔗 Live Links

| | URL |
|---|---|
| 🖥️ Live Demo | https://genui-ai-component-generator.vercel.app |
| 📦 Repository | https://github.com/mukulanand01/genui-ai-component-generator |

![GenUI Screenshot](./screenshot.png)

## 📖 Overview

GenUI turns a plain-English description into ready-to-use frontend code. It calls the Google Gemini API with the user's prompt plus framework/formatting instructions, then renders the result in a Monaco-powered code editor with an instant live preview — so you can go from idea to a working component in seconds.

## ✨ Features

- 🧠 **Prompt-based UI generation** — describe a component in plain English and get production-ready code
- 🧩 **Multiple framework support** — HTML + CSS, HTML + Tailwind CSS, HTML + Bootstrap, HTML + CSS + JS, and combinations
- 💻 **Live code editor** — syntax-highlighted output powered by Monaco Editor (the same editor used in VS Code)
- 👁️ **Instant live preview** — see the generated component rendered in real time
- 🔍 **Full-screen preview mode** — inspect the component in a dedicated full-page view
- 📋 **Copy & download** — copy code to clipboard or download it as an HTML file with one click
- 🔔 **Toast notifications** — clear feedback for success, errors, and rate-limit issues
- 📱 **Responsive layout** — works smoothly across desktop and mobile screens

## 🏗️ Architecture

```
┌──────────────┐      Prompt +      ┌──────────────────┐
│    Browser   │ ─────────────────► │   Google Gemini  │
│  (React+Vite)│                    │        API       │
│              │ ◄───────────────── │                  │
└──────┬───────┘   Generated code   └──────────────────┘
       │
       ▼
┌──────────────┐
│ Monaco Editor│  →  Live Preview (iframe)  →  Copy / Download
└──────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS |
| AI | Google Gemini API (`@google/genai`) |
| Code Editor | Monaco Editor |
| UI Utilities | react-select, react-spinners, react-toastify, react-icons |
| Routing | React Router DOM |
| Deployment | Vercel |

## 📂 Project Structure

```
genui-ai-component-generator/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx       # Main app logic — prompt, framework selection, code generation
│   │   └── NoPage.jsx     # 404 fallback
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
└── package.json
```

## ⚙️ How It Works

1. Select a framework from the dropdown (e.g. HTML + Tailwind CSS)
2. Describe the component you want in the text area
3. Click **Generate** — the app sends your prompt to the Gemini API along with framework and formatting instructions
4. The generated code appears in the Monaco editor, and can be previewed live in an iframe
5. Copy the code or download it as a standalone HTML file

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API key — get one for free at [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mukulanand01/genui-ai-component-generator.git
   cd genui-ai-component-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔒 Environment Variables

```
VITE_GEMINI_API_KEY=
```

## ☁️ Deployment

This project is deployed on [Vercel](https://vercel.com). If you fork this repo and deploy your own instance, remember to add `VITE_GEMINI_API_KEY` under your Vercel project's **Settings → Environment Variables**, since `.env` files are not committed to GitHub for security reasons.

## ⚠️ Known Limitations

- Free-tier Gemini API keys have a daily request limit (varies by model)
- Very new or high-demand models may occasionally return a "model busy" (503) error — the app surfaces this via a toast notification

## 🚧 Future Improvements

- Save/export generated components to a personal library
- Support for React/Vue component output, not just static HTML
- Prompt history and re-generation with tweaks

## 📄 License

This project is open source and available for learning purposes.

## 👤 Author

**Mukul Anand**
- GitHub: [@mukulanand01](https://github.com/mukulanand01)
