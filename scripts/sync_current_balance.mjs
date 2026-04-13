const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error("Missing env vars");
    process.exit(1);
}

const apiUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;
const mutateUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

async function runQuery(query) {
    const res = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    return json.result;
}

async function runMutations(mutations) {
    const res = await fetch(mutateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mutations })
    });
    return res.json();
}

async function syncBalances() {
    console.log("Syncing currentBalance for all campaigns based on ledger...");

    // Find the latest ledger balance for each campaign
    const campaignsWithBalances = await runQuery(`
        *[_type == "campaign"] {
            _id,
            "latestBalance": coalesce(*[_type == "campaignBalance" && campaign._ref == ^._id] | order(createdAt desc)[0].balance, 0)
        }
    `);

    console.log(`Found ${campaignsWithBalances.length} campaigns to sync.`);

    const mutations = campaignsWithBalances.map(c => ({
        patch: {
            id: c._id,
            set: { currentBalance: c.latestBalance }
        }
    }));

    if (mutations.length > 0) {
        const res = await runMutations(mutations);
        if (res.results) {
            console.log(`✅ Successfully synced ${res.results.length} campaigns.`);
        } else {
            console.error("Mutation failed:", res.message);
        }
    }
}

syncBalances().catch(console.error);
