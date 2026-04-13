
import Image from "next/image";

interface DonationHeroProps {
    imageSrc: string;
    title: string;
}

export function DonationHero({ imageSrc, title }: DonationHeroProps) {
    return (
        <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden md:rounded-2xl shadow-sm">
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}
