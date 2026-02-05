import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import DonationDetailClient from "./DonationDetailClient";

async function getCampaign(slug: string) {
    const query = `*[_type == "campaign" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        "imageSrc": mainImage,
        organizer,
        "currentAmount": coalesce(math::sum(*[_type == "donation" && campaign._ref == ^._id && status == "success"].amount), 0),
        targetAmount,
        deadline,
        verified,
        description,
        "updates": [],
        "donors": *[_type == "donation" && references(^._id) && status == "success"] | order(_createdAt desc) {
            "name": donorName,
            amount,
            message,
            "time": coalesce(createdAt, _createdAt),
            "avatar": "" 
        }
    }`;
    return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export default async function DonationDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const campaign = await getCampaign(slug);

    if (!campaign) {
        return notFound();
    }

    // Transform data for the view
    const viewData = {
        ...campaign,
        id: campaign._id,
        imageSrc: campaign.imageSrc ? urlFor(campaign.imageSrc).width(1200).url() : "",
        daysLeft: campaign.deadline
            ? Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
            : 0
    };

    return <DonationDetailClient data={viewData} />;
}
