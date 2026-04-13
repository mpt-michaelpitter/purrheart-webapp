const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error("Missing Sanity environment variables. Try running with: node --env-file=.env.local scripts/backfill_ledger.mjs");
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

async function backfillLedger() {
    console.log("Starting ledger backfill...");

    // 1. Fetch all successful donations
    const donations = await runQuery(`
        *[_type == "donation" && status == "success" && defined(campaign)] | order(createdAt asc) {
            _id,
            amount,
            createdAt,
            "campaignId": campaign._ref
        }
    `);

    console.log(`Found ${donations.length} successful donations to process.`);

    // 2. Group by campaign
    const campaignTally = {};
    const ledgerEntries = [];

    for (const d of donations) {
        const cid = d.campaignId;
        if (!campaignTally[cid]) campaignTally[cid] = 0;

        campaignTally[cid] += d.amount;

        ledgerEntries.push({
            _id: `ledger-${d._id}`, // Predictable ID to avoid duplicates if run multiple times
            _type: 'campaignBalance',
            campaign: { _type: 'reference', _ref: cid },
            amount: d.amount,
            balance: campaignTally[cid],
            donation: { _type: 'reference', _ref: d._id },
            createdAt: d.createdAt,
        });
    }

    // 3. Create ledger entries
    console.log("Writing to Sanity...");
    let successCount = 0;

    // Batch mutations in groups of 10
    for (let i = 0; i < ledgerEntries.length; i += 10) {
        const batch = ledgerEntries.slice(i, i + 10);
        const mutations = batch.map(entry => ({
            createIfNotExists: entry
        }));

        try {
            const res = await runMutations(mutations);
            if (res.results) {
                successCount += res.results.length;
                process.stdout.write('.'.repeat(res.results.length));
            } else {
                console.error("\nMutation failed:", res.message);
            }
        } catch (error) {
            console.error(`\nFailed to create batch:`, error.message);
        }
    }

    console.log(`\n\nBackfill complete! Processed ${successCount} ledger entries across ${Object.keys(campaignTally).length} campaigns.`);

    for (const [cid, total] of Object.entries(campaignTally)) {
        console.log(`- Campaign ${cid}: Total Balance = Rp ${total.toLocaleString('id-ID')}`);
    }
}

backfillLedger().catch(console.error);
