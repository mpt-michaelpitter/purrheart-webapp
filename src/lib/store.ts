import { allDonations, Donation, Donor } from "./data";

// Use global declaration to persist data across hot-reloads in development
const globalForDonations = global as unknown as { donationStore: Donation[] };

// Initialize store with data from data.ts if not already initialized
if (!globalForDonations.donationStore) {
    globalForDonations.donationStore = [...allDonations];
}

export const getDonations = () => {
    return globalForDonations.donationStore;
};

export const getDonationBySlug = (slug: string) => {
    return globalForDonations.donationStore.find((d) => d.slug === slug);
};

export const addDonation = (slug: string, donorFn: (currentDonation: Donation) => Donor) => {
    const donationIndex = globalForDonations.donationStore.findIndex((d) => d.slug === slug);

    if (donationIndex > -1) {
        const donation = globalForDonations.donationStore[donationIndex];
        const newDonor = donorFn(donation);

        // Create a new donation object to ensure immutability/reactivity if needed
        const updatedDonation = {
            ...donation,
            currentAmount: donation.currentAmount + newDonor.amount,
            donorCount: donation.donorCount + 1,
            donors: [newDonor, ...donation.donors]
        };

        globalForDonations.donationStore[donationIndex] = updatedDonation;
        return updatedDonation;
    }
    return null;
};
