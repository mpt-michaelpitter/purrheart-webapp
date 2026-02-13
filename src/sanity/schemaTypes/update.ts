import { defineField, defineType } from 'sanity'

export const update = defineType({
    name: 'update',
    title: 'Campaign Update',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: [{ type: 'campaign' }],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
})
