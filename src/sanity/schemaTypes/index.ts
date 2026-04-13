import { type SchemaTypeDefinition } from 'sanity'
import { campaign } from './campaign'
import { category } from './category'
import { donation } from './donation'
import { donationLog } from './donationLog'
import { campaignBalance } from './campaignBalance'
import { banner } from './banner'
import { company } from './company'
import { user } from './user'
import { update } from './update'
import { blockContent } from './blockContent'
import { campaignImage } from './campaignImage'
import { adopsiKucing } from './adopsiKucing'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // ── Content ───────────────────────────────
        campaign,
        category,
        banner,
        company,

        // ── Adopsi ────────────────────────────────
        adopsiKucing,

        // ── Donations ─────────────────────────────
        donation,
        donationLog,
        campaignBalance,

        // ── Supporting ────────────────────────────
        update,
        campaignImage,
        blockContent,
        user,
    ],
}
