export const openSaweriaPopup = (username: string = 'halopeduli') => {
    const width = 480;
    const height = 720;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
        `https://saweria.co/${username}`,
        'SaweriaPayment',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );
};

export const handleDonationClick = async (slug?: string, username?: string) => {
    // 1. Open popup immediately to avoid popup blocker
    openSaweriaPopup(username || 'halopeduli');

    // 2. Create pending donation in background
    if (slug) {
        try {
            await fetch('/api/payment/pending', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    donorName: '',
                    campaignSlug: slug,
                    message: `Semangat! #${slug}`,
                    isAnonymous: false,
                }),
            });
        } catch (e) {
            console.error('[handleDonationClick] Could not create pending donation:', e);
        }
    }
};

