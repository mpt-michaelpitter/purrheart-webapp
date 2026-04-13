import { defineField, defineType } from 'sanity';

/**
 * Campaign Balance Ledger Schema
 * 
 * Records the running balance of a campaign after each successful donation.
 * This acts as an immutable ledger. 
 * The current total for a campaign is simply the 'balance' of the most recent entry.
 */
export const campaignBalance = defineType({
    name: 'campaignBalance',
    title: 'Campaign Balance ',
    type: 'document',
    readOnly: true, // Only written programmatically
    fields: [
        defineField({
            name: 'campaign',
            title: 'Campaign',
            type: 'reference',
            to: [{ type: 'campaign' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'amount',
            title: 'Donation Amount (+)',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'balance',
            title: 'Running Balance (=)',
            type: 'number',
            description: 'Total collected for the campaign after this donation.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'donation',
            title: 'Source Donation',
            type: 'reference',
            to: [{ type: 'donation' }],
            description: 'The donation that triggered this balance update.',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'campaign.title',
            amount: 'amount',
            balance: 'balance',
            date: 'createdAt',
        },
        prepare({ title, amount, balance, date }) {
            const dateStr = date ? new Date(date).toLocaleDateString('id-ID') : '';
            return {
                title: `${title || 'Unknown Campaign'}`,
                subtitle: `+Rp${amount?.toLocaleString('id-ID')} = Rp${balance?.toLocaleString('id-ID')} (${dateStr})`,
            };
        },
    },
});
