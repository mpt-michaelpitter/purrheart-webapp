import { type SchemaTypeDefinition } from 'sanity'
import { campaign } from './campaign'
import { category } from './category'
import { donation } from './donation'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [campaign, category, donation],
}
