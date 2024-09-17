'use client';

import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Switch, useMediaQuery, useTheme, Paper } from '@mui/material';

interface SocialMedia {
    name: string;
    iconUrl: string;
}

const SocialMediaSelector = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedSocials, setSelectedSocials] = useState<SocialMedia[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const theme = useTheme();
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddSocialMedia = async () => {
        const lowerCaseInput = inputValue.toLowerCase();

        try {
            const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${lowerCaseInput}.svg`;

            await axios.get(iconUrl);

            if (!selectedSocials.some((social) => social.name === lowerCaseInput)) {
                setSelectedSocials([...selectedSocials, { name: lowerCaseInput, iconUrl }]);
            }
            setInputValue('');
            setError(null);
        } catch (err) {
            setError(`Could not find an icon for "${lowerCaseInput}". Please try another social media.`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddSocialMedia();
        }
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: darkMode
                    ? 'radial-gradient(circle, #212121 0%, #000000 100%)'
                    : 'radial-gradient(circle, #FFFFFF 0%, #F0F0F0 100%)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Moving lines background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    background: `
            linear-gradient(135deg, rgba(0,0,0,0.1) 25%, transparent 25%) -50px 0,
            linear-gradient(225deg, rgba(0,0,0,0.1) 25%, transparent 25%) -50px 0,
            linear-gradient(315deg, rgba(0,0,0,0.1) 25%, transparent 25%),
            linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%)`,
                    backgroundSize: '100px 100px',
                    animation: 'moveBackground 10s linear infinite',
                }}
            />

            <Container maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'transparent' }}>
                {/* Dark/Light Mode Toggle */}
                <Box sx={{ textAlign: 'right', mb: 2 }}>
                    <Typography component="div" variant="body1">
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                        <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
                    </Typography>
                </Box>

                <Typography variant="h4" gutterBottom>
                    Social Media Icon Selector
                </Typography>

                {/* Input Box */}
                <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a social media name..."
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ input: { backgroundColor: '#ffffff' }, mb: 2 }}
                />
                <Button
                    onClick={handleAddSocialMedia}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    Add
                </Button>

                {/* Error Message */}
                {error && (
                    <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* List of Social Media Icons */}
                <Box>
                    {selectedSocials.map((social, index) => (
                        <Paper key={index} elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2 }}>
                            <img src={social.iconUrl} alt={social.name} width={24} height={24} style={{ marginRight: '10px' }} />
                            <Typography variant="body1">{social.name}</Typography>
                        </Paper>
                    ))}
                </Box>
            </Container>

            {/* CSS for Moving Lines Background */}
            <style jsx global>{`
        @keyframes moveBackground {
          0% {
            background-position: 0 0, 0 0, 0 0, 0 0;
          }
          100% {
            background-position: 100px 100px, 100px 100px, 100px 100px, 100px 100px;
          }
        }
      `}</style>
        </Box>
    );
};

export default SocialMediaSelector;
