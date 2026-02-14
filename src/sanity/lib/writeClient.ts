import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Don't use CDN for write operations
    token: process.env.SANITY_API_TOKEN, // Requires a token with write permissions
    perspective: 'published',
})
