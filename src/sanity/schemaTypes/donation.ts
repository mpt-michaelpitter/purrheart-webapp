import { defineField, defineType } from 'sanity'

export const donation = defineType({
    name: 'donation',
    title: 'Donation',
    type: 'document',
    fields: [
        defineField({
            name: 'donorName',
            title: 'Donor Name',
            type: 'string',
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'number',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
        }),
        defineField({
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: { type: 'campaign' },
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Success', value: 'success' },
                    { title: 'Failed', value: 'failed' },
                ],
            },
            initialValue: 'pending',
        }),
        defineField({
            name: 'orderId',
            title: 'Order ID',
            type: 'string',
        }),
        defineField({
            name: 'paymentType',
            title: 'Payment Type',
            type: 'string',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
})
