import { defineField, defineType } from 'sanity'

export const activityLog = defineType({
    name: 'activityLog',
    title: 'Activity Log',
    type: 'document',
    fields: [
        defineField({
            name: 'action',
            title: 'Action',
            type: 'string',
            description: 'The type of action performed (e.g., Donation, Update, Login)',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Details about the activity',
        }),
        defineField({
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who performed the action (optional)',
        }),
        defineField({
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: [{ type: 'campaign' }],
            description: 'The campaign related to this activity (optional)',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'action',
            subtitle: 'description',
            date: 'createdAt',
        },
        prepare(selection) {
            const { title, subtitle, date } = selection
            return {
                title: title,
                subtitle: `${new Date(date).toLocaleDateString()} - ${subtitle}`,
            }
        },
    },
})
