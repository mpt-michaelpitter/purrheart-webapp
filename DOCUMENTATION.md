# Purrheart Donation Platform — Dokumentasi Lengkap

> Platform donasi digital untuk kampanye kemanusiaan dan adopsi. Dibangun dengan Next.js 15, Sanity CMS, dan Saweria sebagai payment gateway.

---

## Daftar Isi

1. [Tech Stack](#tech-stack)
2. [Struktur Proyek](#struktur-proyek)
3. [Arsitektur & Prinsip](#arsitektur--prinsip)
4. [Shared Library](#shared-library)
5. [Sanity Schema](#sanity-schema)
6. [API Endpoints](#api-endpoints)
7. [Payment Flow (Saweria)](#payment-flow-saweria)
8. [Komponen UI](#komponen-ui)
9. [Halaman (Routes)](#halaman-routes)
10. [Environment Variables](#environment-variables)
11. [Setup & Menjalankan Lokal](#setup--menjalankan-lokal)
12. [Cara Menambah Data](#cara-menambah-data)

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| CMS | Sanity v3 (dengan Studio terintegrasi di `/studio`) |
| Styling | Tailwind CSS v4 |
| Payment | Saweria (webhook-based) |
| Carousel | Embla Carousel |
| Icons | Lucide React |
| Image | next/image + Sanity `@sanity/image-url` |

---

## Struktur Proyek

```
donate/
├── src/
│   ├── types/
│   │   └── index.ts              # Semua TypeScript interfaces
│   ├── lib/
│   │   ├── queries.ts            # Semua GROQ queries (DRY)
│   │   ├── formatters.ts         # Pure formatter functions
│   │   ├── client.ts             # Sanity read client
│   │   ├── writeClient.ts        # Sanity write client (server-only)
│   │   └── utils.ts              # cn() utility
│   ├── app/
│   │   ├── page.tsx              # Home (/)
│   │   ├── donasi/
│   │   │   ├── page.tsx          # Daftar donasi (/donasi)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx      # Detail kampanye
│   │   │       └── payment/
│   │   │           └── page.tsx / PaymentPageClient.tsx
│   │   └── api/
│   │       ├── payment/
│   │       │   ├── pending/route.ts  # Buat donation pending
│   │       │   └── check/route.ts    # Poll status donation
│   │       └── webhooks/
│   │           └── saweria/route.ts  # Terima notif Saweria
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx    # Carousel banner utama
│   │   │   └── CategorySection.tsx # Section per kategori
│   │   ├── donation/
│   │   │   ├── DonationContent.tsx  # Story, DonationList
│   │   │   ├── DonationGallery.tsx  # Carousel galeri
│   │   │   ├── DonationSidebar.tsx  # Sidebar donasi
│   │   │   ├── DonationTabs.tsx     # Tab navigasi
│   │   │   └── DonationMobileHeader.tsx
│   │   └── ui/
│   │       └── DonationCard.tsx  # Card kampanye
│   └── sanity/
│       ├── schemaTypes/          # Definisi schema Sanity
│       └── lib/
│           ├── client.ts
│           ├── writeClient.ts
│           └── image.ts          # urlFor helper
├── DOCUMENTATION.md              # File ini
└── sanity.config.ts
```

---

## Arsitektur & Prinsip

### DRY (Don't Repeat Yourself)

**Sebelum refactoring:**
```ts
// Diduplikasi di app/page.tsx DAN donasi/page.tsx
const campaignFields = `_id, title, "slug": slug.current, ...`;
const formatCampaign = (c: any) => ({ id: c._id, slug: c.slug, ... });
```

**Sesudah refactoring:**
```ts
// Satu sumber kebenaran
import { CAMPAIGN_CARD_FIELDS } from "@/lib/queries";
import { formatCampaign } from "@/lib/formatters";
```

### Single Responsibility

Tiap file/fungsi punya satu tanggung jawab:

| File | Tanggung Jawab |
|------|----------------|
| `lib/queries.ts` | Definisi GROQ saja |
| `lib/formatters.ts` | Transformasi data saja |
| `types/index.ts` | Type definitions saja |
| `api/payment/pending/route.ts` | Membuat pending donation saja |
| `api/payment/check/route.ts` | Memeriksa status saja |
| `api/webhooks/saweria/route.ts` | Menerima & memproses webhook saja |

### TypeScript Typing

Discriminated union untuk page mode di `/donasi`:
```ts
type PageMode =
  | { mode: "grouped";  categories: Category[] }
  | { mode: "filtered"; categoryInfo: {...} | null; campaigns: SanityCampaign[] };
```

---

## Shared Library

### `src/types/index.ts` — Domain Types

```ts
interface Campaign {
    id: string;
    slug: string;
    imageSrc: string | null;
    title: string;
    organizer: string;
    currentAmount: number;
    targetAmount: number;
    donorCount: number;
    daysLeft: number;
    verified: boolean;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: any | null;
    campaigns: SanityCampaign[];
}

interface Banner {
    _id: string;
    title: string;
    imageUrl: any;
    redirectUrl: string;
}

interface Donor {
    name: string;
    amount: number;
    message: string | null;
    time: string;
    avatar: string;
}
```

### `src/lib/queries.ts` — GROQ Query Library

| Export | Deskripsi | Dipakai di |
|--------|-----------|-----------|
| `CAMPAIGN_CARD_FIELDS` | Projection field standar kampanye | Semua query kampanye |
| `latestCampaignsQuery(n)` | N kampanye terbaru | `app/page.tsx` |
| `categoriesWithCampaignsQuery(n)` | Semua kategori + kampanye | `app/page.tsx`, `donasi/page.tsx` |
| `campaignsByCategoryQuery` | Kampanye per kategori | `donasi/page.tsx` (filtered) |
| `categoryInfoQuery` | Info kategori by slug | `donasi/page.tsx` |
| `bannersQuery` | Semua banner slide | `app/page.tsx` |
| `campaignDetailQuery` | Detail lengkap kampanye + donors | `donasi/[slug]/page.tsx` |

### `src/lib/formatters.ts` — Data Formatters

| Fungsi | Input | Output | Deskripsi |
|--------|-------|--------|-----------|
| `formatCampaign(c)` | `SanityCampaign` | `Campaign` | Resolve image URL, hitung daysLeft |
| `categoryToBannerSlide(cat)` | `Category` | `Banner` | Kategori → slide HeroBanner |
| `computeDaysLeft(deadline)` | `string \| null` | `number` | Hitung hari tersisa |
| `formatRupiah(amount)` | `number` | `string` | `75000` → `"Rp 75.000"` |

---

## Sanity Schema

### `campaign` — Kampanye Donasi

| Field | Type | Keterangan |
|-------|------|-----------|
| `title` | string | Judul kampanye |
| `slug` | slug | URL identifier (`/donasi/[slug]`) |
| `mainImage` | image | Gambar utama kampanye |
| `galleryFotos` | reference[] | Referensi ke `banner` docs untuk galeri |
| `organizer` | string | Nama penyelenggara |
| `targetAmount` | number | Target donasi (Rupiah) |
| `deadline` | datetime | Batas waktu kampanye |
| `description` | Portable Text | Deskripsi kampanye |
| `category` | reference | Kategori kampanye |
| `verified` | boolean | Badge terverifikasi |

### `category` — Kategori Kampanye

| Field | Type | Keterangan |
|-------|------|-----------|
| `name` | string | Nama kategori |
| `slug` | slug | URL slug |
| `description` | text | Deskripsi kategori |
| `banner` | reference | Gambar banner kategori |

### `donation` — Donasi Masuk

| Field | Type | Keterangan |
|-------|------|-----------|
| `donorName` | string | Nama donatur |
| `amount` | number | Jumlah donasi (Rupiah) |
| `email` | string | Email donatur |
| `wish` | text | Pesan/doa donatur |
| `status` | `pending` \| `success` | Status pembayaran |
| `paymentType` | string | `saweria`, dll |
| `orderId` | string | ID dari payment gateway |
| `campaign` | reference | Kampanye tujuan |
| `createdAt` | datetime | Waktu donasi |
| `isAnonymous` | boolean | Sembunyikan nama |

### `banner` — Banner & Galeri

| Field | Type | Keterangan |
|-------|------|-----------|
| `title` | string | Judul banner |
| `imageUrl` | image | Gambar |
| `redirectUrl` | string | URL tujuan klik |

---

## API Endpoints

### `POST /api/payment/pending`

Membuat donation dengan status `pending` saat user akan membuka Saweria.

**Request Body:**
```json
{
  "donorName": "Satria",
  "campaignSlug": "vaccine",
  "message": "Semangat! #vaccine",
  "isAnonymous": false
}
```

**Response:**
```json
{
  "success": true,
  "_id": "abc123xyz"
}
```

---

### `GET /api/payment/check`

Poll status donation untuk deteksi pembayaran sukses.

**Query Params:**

| Param | Deskripsi |
|-------|-----------|
| `id` | Specific donation `_id` (primary) |
| `slug` | Campaign slug (fallback) |
| `after` | ISO timestamp (fallback, sejak kapan dicari) |

**Response (by `id`):**
```json
{
  "found": true,
  "status": "success",
  "donation": {
    "_id": "abc123xyz",
    "donorName": "Satria",
    "amount": 75000,
    "status": "success"
  }
}
```

---

### `POST /api/webhooks/saweria?campaign={slug}`

Menerima notifikasi pembayaran dari Saweria.

**Setup:** Daftarkan satu URL webhook per Saweria account:
```
https://yoursite.com/api/webhooks/saweria?campaign=vaccine
https://yoursite.com/api/webhooks/saweria?campaign=adopsi-kitten
```

**Saweria Payload:**
```json
{
  "id": "uuid",
  "type": "donation",
  "amount_raw": 75000,
  "donator_name": "Satria",
  "donator_email": "satria@example.com",
  "message": "Semangat! #vaccine",
  "created_at": "2026-02-21T16:00:00Z",
  "failure_code": null
}
```

**Logic:**
1. Jika `failure_code` !== null → abaikan
2. Cari campaign dari `?campaign=` query param (fallback: `#hashtag` dari message)
3. Cari donation `pending` terbaru untuk campaign tersebut (window: 60 menit)
4. Jika ada → PATCH ke `success` dengan data real dari Saweria
5. Jika tidak ada → CREATE dokumen donation baru dengan `success`

---

## Payment Flow (Saweria)

```
┌─────────────────────────────────────────────────────┐
│                   PAYMENT FLOW                      │
└─────────────────────────────────────────────────────┘

1. User buka /donasi/[slug]/payment
   └─ Isi nama dan pesan

2. Klik "Buka Saweria"
   └─ POST /api/payment/pending
      └─ Sanity: donation { status: "pending", amount: 0 }
      └─ Response: { _id: "abc123" }
   └─ Popup window Saweria terbuka

3. User bayar di window Saweria

4. Saweria → POST /api/webhooks/saweria?campaign=vaccine
   └─ Cari pending donation terbaru (< 60 menit)
   └─ PATCH → { status: "success", amount: 75000, donorName: "Satria" }

5. Frontend polling setiap 5 detik:
   GET /api/payment/check?id=abc123
   └─ status == "success" → tampil "Donasi Masuk! 🎉"
```

---

## Komponen UI

### `DonationCard`

Menampilkan satu kampanye sebagai card.

```tsx
<DonationCard
    id="..."
    slug="vaccine"
    imageSrc="https://..."     // string | null
    title="Vaccine Rabies"
    organizer="Purrheart"
    currentAmount={450000}
    targetAmount={3000000}
    donorCount={6}
    daysLeft={18}
    verified={true}
/>
```

**Fitur:** Progress bar, fallback "Belum ada gambar", badge verifikasi, hover effect.

---

### `CategorySection`

Menampilkan section horizontal scroll kampanye per kategori.

```tsx
<CategorySection
    title="Adopsi Kucing"
    donations={campaigns}         // Campaign[]
    linkHref="/donasi?category=adopsi"
    linkText="Lihat Semua Adopsi"
    categoryImage={sanityRef}     // Opsional
/>
```

**Fitur:** Horizontal scroll carousel, prev/next button, scroll position detection.

---

### `HeroBanner`

Carousel banner utama halaman home.

```tsx
<HeroBanner banners={[
    { _id: "1", title: "...", imageUrl: ref, redirectUrl: "/donasi/..." }
]} />
```

**Fitur:** Auto-play (5s), dot pagination, fallback ke `/images/banner/`.

---

### `DonationGallery`

Carousel galeri foto untuk halaman detail kampanye.

```tsx
<DonationGallery images={[
    { image: sanityRef, name: "Foto kucing 1" },
    { image: null, fallbackSrc: "https://..." }
]} />
```

**Fitur:** Auto-play (4.5s), prev/next, dot indicator, `object-contain` (gambar tidak terpotong).

---

## Halaman (Routes)

| Route | File | Deskripsi |
|-------|------|-----------|
| `/` | `app/page.tsx` | Home: HeroBanner + CategorySection per kategori |
| `/donasi` | `app/donasi/page.tsx` | List kampanye grouped by category |
| `/donasi?category=slug` | `app/donasi/page.tsx` | Filter kampanye satu kategori |
| `/donasi/[slug]` | `app/donasi/[slug]/page.tsx` | Detail kampanye |
| `/donasi/[slug]/payment` | `PaymentPageClient.tsx` | Halaman pembayaran Saweria |
| `/studio` | Sanity Studio | CMS admin (layout terisolasi) |

---

## Environment Variables

Buat file `.env.local` di root proyek:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token     # Diperlukan untuk webhook & pending

# (Opsional) Webhook security
SAWERIA_WEBHOOK_SECRET=your_secret
```

---

## Setup & Menjalankan Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server (localhost:3000)
npm run dev

# Jalankan Sanity Studio standalone (jika perlu)
npx sanity dev
```

Studio terintegrasi di `localhost:3000/studio` — tidak perlu server terpisah.

---

## Cara Menambah Data

### Kampanye Baru
1. Buka `localhost:3000/studio`
2. Buat dokumen **Campaign**
3. Isi: title, slug, mainImage, target, deadline, category
4. Publish → langsung tampil di `/donasi` dan home

### Kategori Baru
1. Buat dokumen **Category** (name + slug)
2. Buat atau pilih **Banner** untuk gambar kategori
3. Set field `banner` di Category
4. Assign campaign ke kategori
5. Banner kategori otomatis muncul di HeroBanner carousel

### Webhook Saweria per Kampanye
1. Login ke akun Saweria campaign tersebut
2. Masuk ke Pengaturan → Webhook
3. Set URL: `https://yourdomain.com/api/webhooks/saweria?campaign={slug}`
4. Setiap donasi masuk akan otomatis update status di Sanity

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Gambar tidak tampil | Pastikan `mainImage` diupload di Sanity dan campaign di-publish |
| Donation tidak terdeteksi | Cek webhook URL Saweria sudah benar `?campaign=slug` |
| Status stuck di pending | Cek Sanity Studio → donation masih pending berarti webhook belum masuk |
| Kategori tidak muncul | Pastikan campaign sudah di-assign ke kategori di Sanity |
| Studio tidak bisa akses | Pastikan `SANITY_API_TOKEN` ada di `.env.local` |
