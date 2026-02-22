import { defineField, defineType } from 'sanity'

/**
 * Campaign schema — represents a donation fundraising campaign.
 *
 * Removed fields (per product decision):
 *   - organizer (always Purrheart)
 *   - imageName / alt text field
 *   - verified badge
 *   - currentAmount (computed from donations, not stored)
 *
 * Added fields:
 *   - updates: inline array of campaign news/updates (rich text)
 */
export const campaign = defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    fields: [
        // ── Core Info ──────────────────────────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Judul Campaign',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        // ── Images ─────────────────────────────────────────────────────────────
        defineField({
            name: 'mainImage',
            title: 'Gambar Utama',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'galleryFotos',
            title: 'Gallery Foto',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'campaignImage' }] }],
            description: 'Pilih foto-foto untuk galeri kampanye ini',
        }),

        // ── Financial ──────────────────────────────────────────────────────────
        defineField({
            name: 'targetAmount',
            title: 'Target Dana (Rp)',
            type: 'number',
            validation: (Rule) => Rule.required().min(10000),
        }),
        defineField({
            name: 'deadline',
            title: 'Batas Waktu',
            type: 'datetime',
        }),

        // ── Classification ─────────────────────────────────────────────────────
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'reference',
            to: { type: 'category' },
        }),

        // ── Content ────────────────────────────────────────────────────────────
        defineField({
            name: 'description',
            title: 'Kisah / Deskripsi',
            type: 'blockContent',
            description: 'Mendukung teks kaya: H1-H4, bold, italic, link, dan gambar',
        }),

        // ── Payment ────────────────────────────────────────────────────────────
        defineField({
            name: 'saweriaUsername',
            title: 'Saweria Username',
            type: 'string',
            description: 'Username Saweria khusus campaign ini (tanpa @)',
        }),

        // ── Updates / Kabar Terbaru ────────────────────────────────────────────
        defineField({
            name: 'updates',
            title: 'Update / Kabar Terbaru',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'updateTitle',
                            title: 'Judul Update',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'publishedAt',
                            title: 'Tanggal Publish',
                            type: 'datetime',
                            initialValue: () => new Date().toISOString(),
                        }),
                        defineField({
                            name: 'content',
                            title: 'Isi Update',
                            type: 'blockContent',
                            description: 'Mendukung teks kaya dan gambar',
                        }),
                    ],
                    preview: {
                        select: { title: 'updateTitle', date: 'publishedAt' },
                        prepare({ title, date }) {
                            return {
                                title: title || 'Update tanpa judul',
                                subtitle: date
                                    ? new Date(date).toLocaleDateString('id-ID', { dateStyle: 'medium' })
                                    : '',
                            };
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            deadline: 'deadline',
        },
        prepare({ title, media, deadline }) {
            const daysLabel = deadline
                ? `Deadline: ${new Date(deadline).toLocaleDateString('id-ID', { dateStyle: 'medium' })}`
                : 'Deadline: -';
            return { title, subtitle: daysLabel, media };
        },
    },
})
