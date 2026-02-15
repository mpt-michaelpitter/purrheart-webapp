import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import PaymentPageClient from "./PaymentPageClient";

async function getCampaign(slug: string) {
    const query = `*[_type == "campaign" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        saweriaUsername
    }`;
    return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export default async function PaymentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const campaign = await getCampaign(slug);

    if (!campaign) {
        return notFound();
    }

    return <PaymentPageClient data={campaign} />;
}
