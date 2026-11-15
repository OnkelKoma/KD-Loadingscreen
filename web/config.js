/*
 * kd_loadingscreen · Koma Development · https://komadev.dk
 * Everything you need to change lives in this file.
 */
window.KD_CONFIG = {
    // Shown top-left and as the big headline.
    serverName: 'Koma Development',
    tagline: 'Pack your bags. Los Santos is waiting.',

    // Optional logo image (e.g. 'img/logo.png'). Leave empty to use a text badge.
    logo: '',
    // Letters in the text badge when no logo is set.
    badge: 'KD',

    // Main accent colour (progress bar, highlights, buttons).
    accent: '#ff6a3d',

    // Background slides. Add or remove as many as you like.
    // caption/sub are optional and shown bottom-right.
    slides: [
        { src: 'img/1.jpg', caption: 'El Burro Heights', sub: 'Refinery district' },
        { src: 'img/2.jpg', caption: 'Strawberry', sub: 'Community courts' },
        { src: 'img/3.jpg', caption: 'Davis', sub: 'Skyline view' },
        { src: 'img/4.jpg', caption: 'Vespucci Canals', sub: 'Storm drains' },
        { src: 'img/5.jpg', caption: 'Del Perro Pier', sub: 'Beachfront' },
        { src: 'img/6.jpg', caption: 'Murrieta Oil Field', sub: 'East Los Santos' },
    ],

    // Time each slide stays on screen (ms) and how long a transition takes (ms).
    slideDuration: 7000,
    transitionDuration: 1600,

    // 'fade' | 'zoom' | 'wipe' | 'blur' | 'mix' (mix = random every time)
    transition: 'mix',

    // Slow cinematic pan & zoom on each slide.
    kenBurns: true,

    // Shuffle slide order on every load.
    shuffle: false,

    // Rotating tips. Leave the list empty to hide the card.
    tipTitle: 'Did you know?',
    tips: [
        'Read the rules on our Discord before you jump in. It saves everyone a headache.',
        'Need help? Open a ticket on Discord and staff will get back to you.',
        'Roleplay first. Fear for your life and keep your character believable.',
        'Report bugs on Discord. Screenshots and steps to reproduce help a lot.',
        'Respect other players. Everyone is here to have a good time.',
    ],
    tipDuration: 8000,

    // Buttons top-right. icon: 'web' | 'discord' | 'tiktok' | 'youtube' | 'store'
    links: [
        { label: 'komadev.dk', url: 'https://komadev.dk', icon: 'web' },
        { label: 'Discord', url: 'https://discord.gg/komadev', icon: 'discord' },
    ],

    // Background music. Drop an .mp3 in web/music/ and point "file" at it.
    music: {
        enabled: false,
        file: 'music/music.mp3',
        volume: 0.2,          // 0.0 - 1.0
        startMuted: false,
    },

    // Text for the welcome line. {name} is replaced with the player's name.
    welcome: 'Welcome, {name}',
    welcomeFallback: 'Welcome to the city',

    // Show "12 / 64 online" (needs Config.Handover = true in config.lua).
    showPlayerCount: true,

    // Show what the game is currently loading under the progress bar.
    showStatus: true,

    // Small "made by" credit bottom-left. Appreciated, but feel free to turn it off.
    credit: true,
};
