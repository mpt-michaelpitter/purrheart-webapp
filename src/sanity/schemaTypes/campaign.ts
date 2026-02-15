import { defineField, defineType } from 'sanity'

export const campaign = defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'organizer',
            title: 'Organizer',
            type: 'string',
            initialValue: 'purrhearth',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'imageName',
            title: 'Image Name (Alt Text)',
            type: 'string',
            description: 'Fallback text for the image',
        }),
        defineField({
            name: 'targetAmount',
            title: 'Target Amount (Rp)',
            type: 'number',
            validation: (Rule) => Rule.required().min(10000),
        }),
        defineField({
            name: 'currentAmount',
            title: 'Current Amount (Rp)',
            type: 'number',
            initialValue: 0,
            description: 'Manually update or sync with payment gateway',
        }),
        defineField({
            name: 'deadline',
            title: 'Deadline',
            type: 'datetime',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'category' },
        }),
        defineField({
            name: 'verified',
            title: 'Verified Campaign',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'saweriaUsername',
            title: 'Saweria Username',
            type: 'string',
            description: 'Username Saweria khusus campaign ini (tanpa @). Jika kosong, pakai default (halopeduli).',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'organizer',
            media: 'mainImage',
        },
    },
})
