# Purrhearth - Donation & Fundraising Platform ❤️

Purrhearth is a modern, transparent, and secure donation platform built with **Next.js 15**, **Sanity CMS**, and **Midtrans Payment Gateway**. It connects donors with campaigns for social causes, disasters, education, and animal welfare.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS for Content)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Payment Gateway**: [Midtrans](https://midtrans.com/) (core api)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks & Context

## ✨ Key Features

### 1. Dynamic Homepage
- **Category-Based Display**: Campaigns are automatically grouped by category (e.g., "Bencana", "Kesehatan") fetched dynamically from Sanity.
- **Carousel Layout**: Horizontal scrolling cards with smart navigation buttons and touch support.
- **Top & Urgent Campaigns**: Logic to display "Latest" and "Urgent" (ending soon) campaigns.

### 2. Donation System
- **Real-Time Progress**: Campaign cards show live `currentAmount` and `donorCount` aggregated from successful transactions.
- **Seamless Payment**: Integrated with **Midtrans Snap** for secure and easy payments (QRIS, GoPay, Bank Transfer).
- **Anonymous Option**: Donors can choose to hide their names.

### 3. CMS Integration (Sanity Studio)
- Managed at `/studio`.
- **Schemas**:
  - `campaign`: Manage fundraising titles, targets, deadlines, and stories.
  - `donation`: Tracks every transaction, donor info, and payment status.
  - `category`: Organize campaigns dynamically.

### 4. UI/UX Excellence
- **Mobile-First**: Fully responsive design with a dedicated Mobile Bottom Navigation.
- **Accordion Footer**: Smart footer that collapses sections on mobile to save space.
- **Dark Mode**: Built-in support for light and dark themes.

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/donate.git
cd donate
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# Midtrans Payment
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_IS_PRODUCTION=false
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Admin Dashboard (CMS)
Access the Content Studio at:
[http://localhost:3000/studio](http://localhost:3000/studio)

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (main)/           # Main layout routes
│   ├── donasi/           # Donation listing & detail pages
│   ├── studio/           # Sanity CMS Studio route
│   ├── api/              # API Routes (Midtrans callbacks, etc.)
│   └── globals.css       # Global styles (Tailwind)
├── components/
│   ├── home/             # Homepage sections (Hero, CategorySection)
│   ├── donation/         # Donation-specific components (Form, Card, etc.)
│   ├── layout/           # Navbar, Footer, MobileNav
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities, Midtrans config, Data helpers
└── sanity/               # Sanity config and schemas
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
