import { client } from "@/sanity/lib/client";
import { DonationCard } from "@/components/ui/DonationCard";
import { urlFor } from "@/sanity/lib/image";

async function getCampaigns() {
    const query = `*[_type == "campaign"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        "imageSrc": mainImage,
        organizer,
        "currentAmount": coalesce(math::sum(*[_type == "donation" && references(^._id) && status == "success"].amount), 0),
        "donorCount": count(*[_type == "donation" && references(^._id) && status == "success"]),
        targetAmount,
        deadline,
        verified
    }`;
    return await client.fetch(query, {}, { cache: 'no-store' }); // Disable cache for dev
}

export default async function DonasiPage() {
    const campaigns = await getCampaigns();

    // Map Sanity data to DonationCard props
    const mappedCampaigns = campaigns.map((c: any) => ({
        id: c._id,
        slug: c.slug,
        imageSrc: c.imageSrc ? urlFor(c.imageSrc).width(800).url() : "",
        title: c.title,
        organizer: c.organizer || "Bantu Warga",
        currentAmount: c.currentAmount || 0,
        targetAmount: c.targetAmount || 10000000,
        donorCount: c.donorCount || 0, // Using real data now
        daysLeft: c.deadline ? Math.ceil((new Date(c.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
        verified: c.verified
    }));

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* Page Header */}
            <div className="pt-24 pb-12 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Bantu Mereka yang Membutuhkan
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Pilih program donasi yang ingin Anda bantu. Kepedulian Anda adalah harapan bagi mereka.
                    </p>
                </div>
            </div>

            {/* Donation Grid */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                {mappedCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mappedCampaigns.map((donation: any) => (
                            <DonationCard
                                key={donation.id}
                                {...donation}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500">Belum ada kampanye donasi saat ini.</p>
                        <p className="text-xs text-slate-400 mt-2">Masuk ke /studio untuk menambah data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
