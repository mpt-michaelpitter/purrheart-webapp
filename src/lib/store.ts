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
    return null;
};

// Pending Donations Store (in-memory)
interface PendingDonation {
    slug: string;
    donor: Donor;
    orderId: string;
}

const globalForPending = global as unknown as { pendingStore: Record<string, PendingDonation> };

if (!globalForPending.pendingStore) {
    globalForPending.pendingStore = {};
}

export const addPendingDonation = (orderId: string, slug: string, donor: Donor) => {
    globalForPending.pendingStore[orderId] = { slug, donor, orderId };
};

export const verifyDonation = (orderId: string) => {
    const pending = globalForPending.pendingStore[orderId];
    if (pending) {
        // Move from pending to actual store
        const updated = addDonation(pending.slug, () => pending.donor);

        // Remove from pending
        delete globalForPending.pendingStore[orderId];

        return updated;
    }
    return null;
};
