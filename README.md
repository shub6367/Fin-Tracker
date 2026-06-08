# 📈 Fin-Tracker — Real-Time Stock Portfolio Dashboard

> A real-time stock portfolio tracker built with Next.js, TypeScript, and shadcn/ui — helping users monitor their investments and get live stock overviews.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🌐 Live Demo

> 🔗 [Add your deployed link here]

---

## 📌 Overview

Fin-Tracker is a full-stack stock portfolio management app that gives users a real-time view of their investments. Built with a modern Next.js App Router architecture and a clean UI powered by shadcn/ui components.

---

## ✨ Features

- 📊 **Real-time stock data** — live price updates via polling (`stockData_poll.js`)
- 💼 **Portfolio overview** — track your investments in one place
- 📉 **Stock overview dashboard** — visual breakdown of holdings
- 🔐 **Middleware-based route protection** — secure pages with Next.js middleware
- 🗄️ **Database integration** — persistent portfolio data via MongoDB
- 🎨 **Clean, responsive UI** — built with shadcn/ui + Tailwind CSS
- 🪝 **Custom React hooks** — reusable logic for data fetching and state
- 📦 **TypeScript throughout** — fully typed codebase (89.6% TypeScript)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **UI Components** | shadcn/ui |
| **Styling** | Tailwind CSS |
| **Database** | MongoDB |
| **Real-time** | Stock data polling |
| **Auth/Security** | Next.js Middleware |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shub6367/Fin-Tracker.git
cd Fin-Tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your MongoDB URI and API keys
```

### Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_STOCK_API_KEY=your_stock_api_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
Fin-Tracker/
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
│   └── ui/               # shadcn/ui base components
├── contexts/             # React Context providers
├── database/             # DB connection & queries
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── middleware/           # Route protection middleware
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── stockData_poll.js     # Real-time stock polling logic
└── next.config.ts        # Next.js configuration
```

---

## 📸 Screenshots

> *(Add screenshots of your dashboard here)*

---

## 🔮 Future Improvements

- [ ] Add stock search & watchlist
- [ ] Price alerts via email/notification
- [ ] Historical performance charts
- [ ] Support for multiple currencies

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Built with ❤️ using Next.js + TypeScript + shadcn/ui</p>
