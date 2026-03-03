import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'banner',
            title: 'Banner (Gambar)',
            type: 'reference',
            to: [{ type: 'banner' }],
            description: 'Pilih banner — gambar banner akan digunakan sebagai gambar kategori ini',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            description: 'description',
        },
        prepare({ title, description }) {
            return {
                title: title || 'Unnamed Category',
                subtitle: description || 'No description',
            }
        },
    },
})
