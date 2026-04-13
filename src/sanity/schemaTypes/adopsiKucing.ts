import { defineField, defineType } from 'sanity'

/**
 * adopsiKucing schema — represents an individual cat available for adoption.
 *
 * Fields cover:
 *   - Identity     : name, slug, gender, age, color
 *   - Media        : mainPhoto, gallery
 *   - Health       : healthStatus, isVaccinated, isSterilized, specialNeeds
 *   - Personality  : tags, bio (rich text)
 *   - Adoption     : adoptionStatus, isUrgent
 *   - Timestamps   : rescuedAt, publishedAt
 */

export const adopsiKucing = defineType({
    name: 'adopsiKucing',
    title: 'Adopsi Kucing',
    type: 'document',
    icon: () => '🐱',

    groups: [
        { name: 'identity', title: '🐱 Identitas' },
        { name: 'health', title: '💊 Kesehatan' },
        { name: 'personality', title: '✨ Kepribadian & Cerita' },
        { name: 'adoption', title: '🏠 Status Adopsi' },
        { name: 'media', title: '📷 Foto' },
    ],

    fields: [
        // ── Identity ───────────────────────────────────────────────────────────
        defineField({
            name: 'name',
            title: 'Nama Kucing',
            type: 'string',
            group: 'identity',
            validation: (Rule) => Rule.required(),
            placeholder: 'contoh: Mochi',
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            group: 'identity',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gender',
            title: 'Jenis Kelamin',
            type: 'string',
            group: 'identity',
            options: {
                list: [
                    { title: '♂ Jantan', value: 'jantan' },
                    { title: '♀ Betina', value: 'betina' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ageText',
            title: 'Usia',
            type: 'string',
            group: 'identity',
            description: 'Tulis dalam format mudah dibaca, misal: "4 bulan", "1 tahun 2 bulan"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'colorPattern',
            title: 'Warna / Corak',
            type: 'string',
            group: 'identity',
            description: 'misal: Oranye Tabby, Hitam Legam, Calico (3 Warna)',
            validation: (Rule) => Rule.required(),
        }),

        // ── Media ──────────────────────────────────────────────────────────────
        defineField({
            name: 'mainPhoto',
            title: 'Foto Utama',
            type: 'image',
            group: 'media',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'misal: Foto Mochi kucing oranye lucu',
                }),
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Galeri Foto Tambahan',
            type: 'array',
            group: 'media',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),

        // ── Health ─────────────────────────────────────────────────────────────
        defineField({
            name: 'healthStatus',
            title: 'Kondisi Kesehatan',
            type: 'string',
            group: 'health',
            options: {
                list: [
                    { title: '✅ Sehat', value: 'sehat' },
                    { title: '⚠️ Dalam Pemulihan', value: 'pemulihan' },
                    { title: '🔴 Kondisi Khusus / Kronis', value: 'khusus' },
                ],
                layout: 'radio',
            },
            initialValue: 'sehat',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'healthNote',
            title: 'Catatan Kesehatan',
            type: 'string',
            group: 'health',
            description: 'Ringkasan singkat kondisi kesehatan. misal: "Sehat, sudah steril" atau "Dalam pemulihan patah kaki kanan depan"',
        }),
        defineField({
            name: 'isVaccinated',
            title: 'Sudah Divaksin?',
            type: 'boolean',
            group: 'health',
            initialValue: false,
        }),
        defineField({
            name: 'isSterilized',
            title: 'Sudah Disterilisasi?',
            type: 'boolean',
            group: 'health',
            initialValue: false,
        }),
        defineField({
            name: 'specialNeeds',
            title: 'Kebutuhan Khusus',
            type: 'text',
            group: 'health',
            rows: 3,
            description: 'Isi jika kucing membutuhkan perhatian atau penanganan khusus. Kosongkan jika tidak ada.',
        }),

        // ── Personality ────────────────────────────────────────────────────────
        defineField({
            name: 'personalityTags',
            title: 'Tag Kepribadian',
            type: 'array',
            group: 'personality',
            of: [{ type: 'string' }],
            options: {
                list: [
                    'Aktif', 'Manja', 'Kalem', 'Lembut', 'Penasaran',
                    'Cerdas', 'Mandiri', 'Sosial', 'Pemalu',
                    'Suka Diangkat', 'Suka Eksplorasi', 'Suka Bermain',
                    'Cocok untuk Pemula', 'Butuh Kesabaran', 'Suka Kucing Lain',
                    'Cocok dengan Anak', 'Tenang', 'Berwibawa', 'Setia',
                ],
                layout: 'tags',
            },
            validation: (Rule) => Rule.required().min(1).max(5),
        }),
        defineField({
            name: 'bio',
            title: 'Cerita / Bio Kucing',
            type: 'blockContent',
            group: 'personality',
            description: 'Ceritakan asal-usul dan kepribadian kucing ini. Mendukung teks kaya dan gambar.',
        }),
        defineField({
            name: 'rescuedAt',
            title: 'Tanggal Diselamatkan / Masuk Shelter',
            type: 'date',
            group: 'personality',
        }),

        // ── Adoption Status ────────────────────────────────────────────────────
        defineField({
            name: 'adoptionStatus',
            title: 'Status Adopsi',
            type: 'string',
            group: 'adoption',
            options: {
                list: [
                    { title: '✅ Siap Diadopsi', value: 'siap' },
                    { title: '⚡ Butuh Perhatian Ekstra', value: 'khusus' },
                    { title: '⏳ Sedang Diproses', value: 'proses' },
                    { title: '🏠 Sudah Diadopsi', value: 'diadopsi' },
                    { title: '🚫 Tidak Tersedia', value: 'tidak_tersedia' },
                ],
                layout: 'radio',
            },
            initialValue: 'siap',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isUrgent',
            title: 'Tandai sebagai Mendesak?',
            type: 'boolean',
            group: 'adoption',
            description: 'Aktifkan jika kucing ini membutuhkan rumah sesegera mungkin (akan ada label ⚡ di tampilan)',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Tanggal Dipublikasikan',
            type: 'datetime',
            group: 'adoption',
            initialValue: () => new Date().toISOString(),
        }),
    ],

    // ── Preview ────────────────────────────────────────────────────────────────
    orderings: [
        {
            title: 'Terbaru',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Nama (A–Z)',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],

    preview: {
        select: {
            title: 'name',
            media: 'mainPhoto',
            status: 'adoptionStatus',
            gender: 'gender',
            age: 'ageText',
            urgent: 'isUrgent',
        },
        prepare({ title, media, status, gender, age, urgent }) {
            const statusLabel: Record<string, string> = {
                siap: '✅ Siap Diadopsi',
                khusus: '⚡ Butuh Perhatian',
                proses: '⏳ Sedang Diproses',
                diadopsi: '🏠 Sudah Diadopsi',
                tidak_tersedia: '🚫 Tidak Tersedia',
            };
            const genderLabel = gender === 'jantan' ? '♂' : gender === 'betina' ? '♀' : '';
            return {
                title: `${urgent ? '⚡ ' : ''}${title}`,
                subtitle: `${genderLabel} · ${age} · ${statusLabel[status] ?? status}`,
                media,
            };
        },
    },
})
