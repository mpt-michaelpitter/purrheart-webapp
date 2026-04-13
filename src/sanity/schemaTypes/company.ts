import { defineField, defineType } from 'sanity'

/**
 * Company schema — Purrheart organisation profile.
 *
 * Design decisions:
 *   - images: replaced single image with an ordered array of images (gallery)
 *   - removed currentAmount (computed from donations, not manually tracked)
 */
export const company = defineType({
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nama Organisasi',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi',
            type: 'text',
        }),

        // ── Multi-Image Gallery (replaces single image) ────────────────────────
        defineField({
            name: 'images',
            title: 'Gambar Organisasi',
            type: 'array',
            description: 'Urutan gambar menentukan tampilan di website',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Gambar',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Keterangan',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { media: 'image', title: 'caption' },
                        prepare({ media, title }) {
                            return { media, title: title || 'Gambar tanpa keterangan' };
                        },
                    },
                },
            ],
        }),

        // ── Contact ────────────────────────────────────────────────────────────
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Nomor Telepon / WhatsApp',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram',
            type: 'string',
            description: '@username tanpa @',
        }),
        defineField({
            name: 'address',
            title: 'Alamat',
            type: 'text',
        }),
    ],
    preview: {
        select: { title: 'name' },
    },
})
