
export interface Donor {
    name: string;
    amount: number;
    time: string;
    avatar: string | null;
}

export interface Update {
    date: string;
    title: string;
    content: string;
    image?: string;
}

export interface Withdrawal {
    date: string;
    amount: number;
    description: string;
    status: string;
}

export interface Donation {
    id: string;
    slug: string;
    imageSrc: string;
    title: string;
    organizer: string;
    currentAmount: number;
    targetAmount: number;
    donorCount: number;
    daysLeft: number;
    verified: boolean;
    description: string;
    updates: Update[];
    withdrawals: Withdrawal[];
    donors: Donor[];
}

const generateDonors = (count: number, baseAmount: number): Donor[] => {
    const names = ["Budi Santoso", "Siti Aminah", "Ahmad Rizky", "Dewi Lestari", "Eko Prasetyo", "Rina Wati", "Hamba Allah", "Anonim", "Keluarga Besar H. Samsudin"];
    const times = ["Baru saja", "5 menit yang lalu", "1 jam yang lalu", "3 jam yang lalu", "Hari ini", "Kemarin"];

    return Array.from({ length: count }).map((_, i) => ({
        name: i % 3 === 0 ? "Anonim" : names[Math.floor(Math.random() * names.length)],
        amount: Math.floor(Math.random() * baseAmount) + 10000,
        time: times[Math.floor(Math.random() * times.length)],
        avatar: null
    }));
};

export const donations: Donation[] = [
    {
        id: "1",
        slug: "bantu-korban-banjir-sumatra",
        imageSrc: "/images/bencana/1.webp",
        title: "Bantu Korban Bencana Banjir dan Longsor di Sumatra",
        organizer: "purrhearth",
        currentAmount: 1364785,
        targetAmount: 5000000,
        donorCount: 65,
        daysLeft: 11,
        verified: true,
        description: `
        <p class="mb-4">Bencana banjir bandang dan tanah longsor telah meluluhlantakkan sebagian wilayah Sumatra. Ribuan warga kehilangan tempat tinggal, harta benda, dan sumber pencaharian mereka. Saat ini, mereka sangat membutuhkan uluran tangan kita.</p>
        <p class="mb-4">Tim purrhearth Foundation telah turun ke lapangan untuk menyalurkan bantuan darurat berupa makanan siap saji, obat-obatan, selimut, dan kebutuhan pokok lainnya. Namun, kebutuhan di lapangan masih sangat besar mengingat luasnya dampak bencana.</p>
        <p class="mb-4">Hingga saat ini, tercatat lebih dari 500 kepala keluarga mengungsi di tenda-tenda darurat dengan fasilitas sanitasi yang minim. Risiko penyakit menular mulai mengintai, terutama bagi anak-anak dan lansia.</p>
        <h3 class="font-bold text-lg mb-2">Kenapa mereka butuh bantuanmu?</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Akses air bersih terputus di 5 desa.</li>
            <li>Posko pengungsian kekurangan selimut dan alas tidur.</li>
            <li>Anak-anak membutuhkan perlengkapan sekolah yang hanyut terbawa banjir.</li>
        </ul>
        <p>Mari bersama kita ringankan beban saudara kita di Sumatra. Berapapun donasi yang kamu berikan akan sangat berarti bagi mereka yang sedang berjuang untuk bangkit.</p>
      `,
        updates: [
            {
                date: "28 Jan 2026",
                title: "Penyaluran Bantuan Tahap 1",
                content: "Alhamdulillah, bantuan tahap pertama berupa 500 paket sembako dan selimut telah disalurkan ke Desa Sukamaju. Terima kasih para donatur!",
                image: "/images/bencana/2.webp"
            },
            {
                date: "25 Jan 2026",
                title: "Kondisi Terkini di Lokasi",
                content: "Tim relawan melaporkan bahwa akses jalan utama masih terputus. Kami sedang berupaya mencari jalur alternatif untuk distribusi logistik.",
            }
        ],
        withdrawals: [
            {
                date: "27 Jan 2026",
                amount: 25000000,
                description: "Pembelian 500 paket sembako & selimut",
                status: "Berhasil"
            },
            {
                date: "30 Jan 2026",
                amount: 10000000,
                description: "Biaya operasional & sewa truk logistik",
                status: "Menunggu Verifikasi"
            }
        ],
        donors: generateDonors(10, 500000)
    },
    {
        id: "2",
        slug: "pendidikan-anak-penyintas",
        imageSrc: "/images/bencana/2.webp",
        title: "Bantu Pendidikan Anak Penyintas Bencana",
        organizer: "Laznas PPPA",
        currentAmount: 1046000,
        targetAmount: 200000000,
        donorCount: 34,
        daysLeft: 5,
        verified: true,
        description: `
        <p class="mb-4">Anak-anak korban bencana membutuhkan pendidikan yang layak. Sekolah mereka hancur, buku-buku hilang terbawa arus. Mari bantu mereka kembali bersekolah dengan senyuman.</p>
        <p class="mb-4">Donasi Anda akan digunakan untuk membangun sekolah darurat, membeli buku pelajaran, dan seragam sekolah baru.</p>
        `,
        updates: [],
        withdrawals: [],
        donors: generateDonors(8, 200000)
    },
    {
        id: "3",
        slug: "sumatra-berduka",
        imageSrc: "/images/bencana/3.webp",
        title: "Peduli Bencana Banjir dan Tanah Longsor Sumatra",
        organizer: "Aksi Cepat",
        currentAmount: 173000,
        targetAmount: 50000000,
        donorCount: 47,
        daysLeft: 132,
        verified: false,
        description: `
        <p class="mb-4">Sumatra berduka. Banjir bandang menyapu pemukiman warga. Mari kita bergandengan tangan membantu saudara-saudara kita yang tertimpa musibah.</p>
        `,
        updates: [],
        withdrawals: [],
        donors: generateDonors(5, 100000)
    },
    {
        id: "4",
        slug: "tanggap-darurat-gempa",
        imageSrc: "/images/bencana/4.webp",
        title: "Tanggap Darurat Gempa Bumi: Butuh Bantuan Segera",
        organizer: "Tim Reaksi Cepat",
        currentAmount: 5500000,
        targetAmount: 750000000,
        donorCount: 120,
        daysLeft: 7,
        verified: true,
        description: `
        <p class="mb-4">Gempa bumi mengguncang wilayah kita. Banyak bangunan runtuh dan warga terjebak. Tim SAR membutuhkan dukungan logistik untuk operasi penyelamatan.</p>
        `,
        updates: [],
        withdrawals: [],
        donors: generateDonors(15, 1000000)
    }
];

export const educationDonations: Donation[] = [
    {
        id: "5",
        slug: "beasiswa-yatim-piatu",
        imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
        title: "Beasiswa Pendidikan untuk 1000 Yatim Piatu",
        organizer: "Yayasan Cerdas",
        currentAmount: 50000000,
        targetAmount: 1000000000,
        donorCount: 1200,
        daysLeft: 45,
        verified: true,
        description: "Bantu 1000 yatim piatu mendapatkan pendidikan yang layak.",
        updates: [],
        withdrawals: [],
        donors: generateDonors(20, 150000)
    },
    {
        id: "6",
        slug: "renovasi-sekolah-pelosok",
        imageSrc: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
        title: "Bantu Renovasi Sekolah di Pelosok Negeri",
        organizer: "Bangun Negeri",
        currentAmount: 25000000,
        targetAmount: 150000000,
        donorCount: 500,
        daysLeft: 20,
        verified: true,
        description: "Sekolah di pelosok negeri ini hampir roboh. Mari bantu renovasi agar aman bagi siswa.",
        updates: [],
        withdrawals: [],
        donors: generateDonors(12, 3000000)
    },
    {
        id: "7",
        slug: "buku-untuk-papua",
        imageSrc: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
        title: "10.000 Buku untuk Anak Papua",
        organizer: "Literasi Nusantara",
        currentAmount: 7500000,
        targetAmount: 50000000,
        donorCount: 150,
        daysLeft: 60,
        verified: true,
        description: "Literasi adalah kunci. Mari kirimkan 10.000 buku untuk anak-anak Papua.",
        updates: [],
        withdrawals: [],
        donors: generateDonors(5, 50000)
    }
];

export const allDonations = [...donations, ...educationDonations];

// Kept for backward compatibility if needed, but components should use data.donors
export const donors = generateDonors(6, 50000); 
