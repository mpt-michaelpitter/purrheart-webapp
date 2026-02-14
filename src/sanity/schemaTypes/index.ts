import { type SchemaTypeDefinition } from 'sanity'
import { campaign } from './campaign'
import { category } from './category'
import { donation } from './donation'
import { banner } from './banner'
import { user } from './user'
import { update } from './update'
import { activityLog } from './activityLog'
import { blockContent } from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [campaign, category, donation, banner, user, update, activityLog, blockContent],
}
