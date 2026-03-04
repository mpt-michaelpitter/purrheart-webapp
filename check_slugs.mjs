import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

// Read .env.local manually
const env = {};
readFileSync('.env.local', 'utf-8').split('\n').forEach(line => {
    const [key, ...vals] = line.trim().split('=');
    if (key && !key.startsWith('#')) env[key] = vals.join('=');
});

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

const campaigns = await client.fetch('*[_type == "campaign"]{title, "slug": slug.current}');
console.log("=== Campaign Slugs ===");
campaigns.forEach(c => console.log(`  slug: "${c.slug}" | title: "${c.title}"`));

const categories = await client.fetch('*[_type == "category"]{"slug": slug.current, name}');
console.log("\n=== Category Slugs ===");
categories.forEach(c => console.log(`  slug: "${c.slug}" | name: "${c.name}"`));
