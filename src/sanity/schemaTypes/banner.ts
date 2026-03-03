import { defineField, defineType } from 'sanity'

/**
 * Banner schema — carousel slides for the HeroBanner component.
 * Supports a Sanity image asset (hotspot-enabled) and a redirect URL.
 * Title is used as alt-text and accessible label.
 */
export const banner = defineType({
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Banner',
            type: 'string',
            description: 'Dipakai sebagai label aksesibel dan alt text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'imageUrl',
            title: 'Gambar Banner',
            type: 'image',
            options: { hotspot: true },
            description: 'Gunakan rasio 16:9 untuk tampilan terbaik',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategori Tujuan',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Pilih kategori yang akan dibuka saat banner ini diklik',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif',
            type: 'boolean',
            description: 'Centang untuk menampilkan banner ini di halaman utama',
            initialValue: true,
        }),
    ],
    orderings: [
        {
            title: 'Terbaru Dulu',
            name: 'createdAtDesc',
            by: [{ field: '_createdAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'imageUrl',
            isActive: 'isActive',
            categorySlug: 'category->slug.current', // Select category slug
        },
        prepare({ title, media, isActive, categorySlug }) {
            return {
                title,
                subtitle: `${isActive ? '✅ Aktif' : '⏸ Nonaktif'} ${categorySlug ? `(${categorySlug})` : ''}`, // Include categorySlug in subtitle
                media,
            };
        },
    },
})
