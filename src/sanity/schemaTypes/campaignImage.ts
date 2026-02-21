import { defineField, defineType } from 'sanity'

export const campaignImage = defineType({
    name: 'campaignImage',
    title: 'Campaign Image',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name (Caption)',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'campaign',
            title: 'Campaign (Ref)',
            type: 'reference',
            to: [{ type: 'campaign' }],
            description: 'Campaign yang memiliki gambar ini',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            campaignTitle: 'campaign.title',
        },
        prepare(selection) {
            const { title, campaignTitle, media } = selection
            return {
                title: title || 'No Caption',
                subtitle: campaignTitle ? `For: ${campaignTitle}` : 'No Campaign Linked',
                media: media,
            }
        },
    },
})
