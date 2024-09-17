'use client';

import { useState } from 'react';
import axios from 'axios';

interface SocialMedia {
    name: string;
    iconUrl: string;
}

const SocialMediaSelector = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedSocials, setSelectedSocials] = useState<SocialMedia[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddSocialMedia = async () => {
        const lowerCaseInput = inputValue.toLowerCase();

        try {
            // Fetch icon from the internet using a free icon API (example: simpleicons.org via jsdelivr)
            const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${lowerCaseInput}.svg`;

            // Test if the icon exists by trying to fetch it
            await axios.get(iconUrl);

            // If icon exists and it's not already in the list, add it to the list
            if (!selectedSocials.some((social) => social.name === lowerCaseInput)) {
                setSelectedSocials([...selectedSocials, { name: lowerCaseInput, iconUrl }]);
            }
            setInputValue(''); // Clear the input after adding
            setError(null); // Reset error if successful
        } catch (err) {
            setError(`Could not find an icon for "${lowerCaseInput}". Please try another social media.`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddSocialMedia();
        }
    };

    return (
        <div>
            <h2>Add Social Media</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a social media name..."
            />
            <button onClick={handleAddSocialMedia}>Add</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {selectedSocials.map((social, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <img src={social.iconUrl} alt={social.name} width={24} height={24} style={{ marginRight: '10px' }} />
                        {social.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialMediaSelector;
