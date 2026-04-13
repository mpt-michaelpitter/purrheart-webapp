import { defineField, defineType } from 'sanity'

/**
 * Donation schema — records incoming donations.
 *
 * Read-only in Studio (via readOnly: true on all fields).
 * Data is written programmatically by the Saweria webhook.
 *
 * Removed fields (per product decision):
 *   - createdAt    (use _createdAt from Sanity system field instead)
 *   - paymentType  (always Saweria now)
 *   - orderId      (Saweria ID stored in external system)
 *
 * Preview: shows donorName + campaign title + formatted amount + status emoji
 */
export const donation = defineType({
    name: 'donation',
    title: 'Donation',
    type: 'document',
    // Read-only: all fields have readOnly:true — created via Saweria webhook only
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
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'wish',
            title: 'Pesan / Doa',
            type: 'text',
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
            initialValue: 'pending',
        }),
        defineField({
            name: 'phone',
            title: 'Nomor Telepon',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'createdAt',
            title: 'Tanggal Donasi',
            type: 'datetime',
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'isAnonymous',
            title: 'Anonim',
            type: 'boolean',
            readOnly: true,
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            donorName: 'donorName',
            campaignTitle: 'campaign.title',
            amount: 'amount',
            status: 'status',
            isAnonymous: 'isAnonymous',
        },
        prepare({ donorName, campaignTitle, amount, status, isAnonymous }) {
            const statusEmoji =
                status === 'success' ? '✅' :
                    status === 'failed' ? '❌' : '⏳';

            const displayName = isAnonymous ? 'Anonim 🎭' : (donorName || '-');

            const formattedAmount = amount
                ? `Rp ${Number(amount).toLocaleString('id-ID')}`
                : 'Rp -';

            return {
                title: `${statusEmoji} ${displayName} — ${formattedAmount}`,
                subtitle: campaignTitle ?? 'Campaign tidak ditemukan',
            };
        },
    },
})
