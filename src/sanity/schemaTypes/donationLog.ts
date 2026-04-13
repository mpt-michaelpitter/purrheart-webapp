import { defineField, defineType } from 'sanity'

/**
 * DonationLog schema — read-only table view of all donation records.
 *
 * Purpose: Provides an organised log table in Sanity Studio for auditing.
 * This is a virtual view — data comes from the `donation` document type.
 * The log is ordered by creation date descending (newest first).
 *
 * Note: This is a separate schema type that acts as an admin dashboard view.
 * Actual donation data is stored in the `donation` schema.
 */
export const donationLog = defineType({
    name: 'donationLog',
    title: '📊 Log Donasi',
    type: 'document',
    // Read-only — log entries are created automatically by the Saweria webhook
    fields: [
        defineField({
            name: 'donorName',
            title: 'Nama Donatur',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'amount',
            title: 'Jumlah (Rp)',
            type: 'number',
            readOnly: true,
        }),
        defineField({
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: { type: 'campaign' },
            readOnly: true,
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            readOnly: true,
            options: {
                list: [
                    { title: '⏳ Pending', value: 'pending' },
                    { title: '✅ Success', value: 'success' },
                    { title: '❌ Failed', value: 'failed' },
                ],
            },
        }),
        defineField({
            name: 'wish',
            title: 'Pesan',
            type: 'text',
            readOnly: true,
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'isAnonymous',
            title: 'Anonim',
            type: 'boolean',
            readOnly: true,
        }),
    ],
    orderings: [
        {
            title: 'Terbaru Dulu',
            name: 'createdAtDesc',
            by: [{ field: '_createdAt', direction: 'desc' }],
        },
        {
            title: 'Terbesar Dulu',
            name: 'amountDesc',
            by: [{ field: 'amount', direction: 'desc' }],
        },
        {
            title: 'Status',
            name: 'statusAsc',
            by: [{ field: 'status', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            donorName: 'donorName',
            amount: 'amount',
            campaign: 'campaign.title',
            status: 'status',
            isAnonymous: 'isAnonymous',
        },
        prepare({ donorName, amount, campaign, status, isAnonymous }) {
            const statusEmoji =
                status === 'success' ? '✅' :
                    status === 'failed' ? '❌' : '⏳';

            const name = isAnonymous ? 'Anonim' : (donorName || '-');
            const rp = amount ? `Rp ${Number(amount).toLocaleString('id-ID')}` : 'Rp -';

            return {
                title: `${statusEmoji} ${name} — ${rp}`,
                subtitle: campaign ?? 'Campaign tidak ditemukan',
            };
        },
    },
})
