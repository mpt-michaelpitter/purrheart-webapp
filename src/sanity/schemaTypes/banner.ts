import { defineField, defineType } from 'sanity'

export const banner = defineType({
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image URL',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'redirectUrl',
            title: 'Redirect URL',
            type: 'url',
        }),
    ],
})
