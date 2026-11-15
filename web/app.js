/* kd_loadingscreen · Koma Development · https://komadev.dk */
(() => {
    'use strict';

    const defaults = {
        serverName: 'My Server', tagline: '', logo: '', badge: 'KD', accent: '#ff6a3d',
        slides: [], slideDuration: 7000, transitionDuration: 1600, transition: 'mix',
        kenBurns: true, shuffle: false, tipTitle: 'Did you know?', tips: [], tipDuration: 8000,
        links: [], music: { enabled: false, file: '', volume: 0.2, startMuted: false },
        welcome: 'Welcome, {name}', welcomeFallback: 'Welcome', showPlayerCount: true,
        showStatus: true, credit: true,
    };
    const cfg = Object.assign({}, defaults, window.KD_CONFIG || {});
    cfg.music = Object.assign({}, defaults.music, cfg.music || {});

    const $ = (id) => document.getElementById(id);
    const app = $('app');
    const handover = window.nuiHandoverData || {};
    const inGame = typeof window.invokeNative === 'function' || !!window.nuiHandoverData;

    /* ---------- Helpers ---------- */

    const ICONS = {
        web: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>',
        discord: '<svg viewBox="0 0 24 24"><path d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3l-.6 1.3a18.2 18.2 0 0 0-5.5 0L8.6 3a19.5 19.5 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.7 19.7 0 0 0 6 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14 14 0 0 0 12.1 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.6 19.6 0 0 0 6-3c.5-5.2-.8-9.7-3.5-13.7zM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/></svg>',
        tiktok: '<svg viewBox="0 0 24 24"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6z"/></svg>',
        youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></svg>',
        store: '<svg viewBox="0 0 24 24"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.5a2 2 0 0 0 1.7-1l3.6-6.5A1 1 0 0 0 20.4 4H5.2l-.9-2H1z"/></svg>',
        volOn: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
        volOff: '<svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.2l2.5 2.5V12zM19 12c0 .9-.2 1.8-.5 2.6l1.5 1.5A9 9 0 0 0 14 3.2v2.1a7 7 0 0 1 5 6.7zM4.3 3 3 4.3 7.7 9H3v6h4l5 5v-6.7l4.3 4.3c-.7.5-1.4.9-2.3 1.2v2a9 9 0 0 0 3.7-1.8l2 2 1.3-1.3L4.3 3zM12 4 9.9 6.1 12 8.2V4z"/></svg>',
    };

    const openUrl = (url) => {
        if (!url) return;
        if (typeof window.invokeNative === 'function') window.invokeNative('openUrl', url);
        else window.open(url, '_blank');
    };

    const pad = (n) => String(n).padStart(2, '0');

    const hexToRgb = (hex) => {
        const m = String(hex).replace('#', '').match(/^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        return m ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}` : null;
    };

    /* ---------- Branding & text ---------- */

    const rgb = hexToRgb(cfg.accent);
    if (rgb) {
        document.documentElement.style.setProperty('--accent', cfg.accent);
        document.documentElement.style.setProperty('--accent-rgb', rgb);
    }

    const badge = $('badge');
    if (cfg.logo) {
        const img = new Image();
        img.src = cfg.logo;
        img.alt = '';
        badge.classList.add('has-logo');
        badge.appendChild(img);
    } else {
        badge.textContent = cfg.badge;
    }

    $('brandName').textContent = cfg.serverName;
    $('title').textContent = cfg.serverName;
    $('tagline').textContent = cfg.tagline;
    if (!cfg.tagline) $('tagline').hidden = true;

    const playerName = handover.kd_name || (inGame ? '' : 'Player');
    $('welcome').textContent = playerName
        ? cfg.welcome.replace('{name}', playerName)
        : cfg.welcomeFallback;

    if (cfg.showPlayerCount && handover.kd_maxPlayers) {
        // +1 because the joining player is not counted yet.
        const online = Math.min((handover.kd_players || 0) + 1, handover.kd_maxPlayers);
        $('onlineText').textContent = `${online} / ${handover.kd_maxPlayers} online`;
        $('online').hidden = false;
    } else if (cfg.showPlayerCount && !inGame) {
        $('onlineText').textContent = '42 / 64 online';
        $('online').hidden = false;
    }

    $('credit').hidden = !cfg.credit;
    document.querySelectorAll('[data-url]').forEach((a) => {
        a.addEventListener('click', () => openUrl(a.dataset.url));
    });

    /* ---------- Links & music ---------- */

    const actions = $('actions');
    cfg.links.forEach((link) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerHTML = ICONS[link.icon] || ICONS.web;
        const label = document.createElement('span');
        label.textContent = link.label;
        btn.appendChild(label);
        btn.addEventListener('click', () => openUrl(link.url));
        actions.appendChild(btn);
    });

    const audio = $('music');
    let musicBtn = null;
    let musicOn = false;

    const renderMusicBtn = () => {
        if (!musicBtn) return;
        musicBtn.classList.toggle('is-playing', musicOn);
        musicBtn.innerHTML = (musicOn ? ICONS.volOn : ICONS.volOff)
            + '<span class="eq"><i></i><i></i><i></i><i></i></span>';
    };

    const setMusic = (on) => {
        musicOn = on;
        if (on) audio.play().catch(() => { musicOn = false; renderMusicBtn(); });
        else audio.pause();
        renderMusicBtn();
    };

    if (cfg.music.enabled && cfg.music.file) {
        audio.src = cfg.music.file;
        audio.volume = Math.max(0, Math.min(1, cfg.music.volume));
        musicBtn = document.createElement('button');
        musicBtn.className = 'btn btn--music';
        musicBtn.title = 'Music (Space)';
        musicBtn.addEventListener('click', () => setMusic(!musicOn));
        actions.appendChild(musicBtn);
        setMusic(!cfg.music.startMuted);
    }

    /* ---------- Slideshow ---------- */

    const stage = $('stage');
    const dotsEl = $('dots');
    const caption = document.querySelector('.caption');
    let slides = cfg.slides.slice();
    if (cfg.shuffle) slides.sort(() => Math.random() - 0.5);

    const TYPES = ['fade', 'zoom', 'wipe', 'blur'];
    const EASE = 'cubic-bezier(.65, 0, .35, 1)';
    let current = -1;
    let timer = null;
    let lastType = null;

    const KEN_BURNS = [
        [{ transform: 'scale(1.14) translate(-1.5%, 1%)' }, { transform: 'scale(1.02) translate(1%, -.5%)' }],
        [{ transform: 'scale(1.02) translate(1%, .5%)' }, { transform: 'scale(1.14) translate(-1%, -1%)' }],
        [{ transform: 'scale(1.12) translate(1.5%, -1%)' }, { transform: 'scale(1.03) translate(-1%, 1%)' }],
        [{ transform: 'scale(1.04) translate(-1%, -1%)' }, { transform: 'scale(1.15) translate(1.5%, 1%)' }],
    ];

    const ENTER = {
        fade: [{ opacity: 0 }, { opacity: 1 }],
        zoom: [{ opacity: 0, transform: 'scale(1.18)' }, { opacity: 1, transform: 'scale(1)' }],
        wipe: [
            { clipPath: 'polygon(0 0, 0 0, -25% 100%, 0 100%)' },
            { clipPath: 'polygon(0 0, 125% 0, 100% 100%, 0 100%)' },
        ],
        blur: [
            { opacity: 0, filter: 'blur(24px) brightness(1.6)' },
            { opacity: 1, filter: 'blur(0px) brightness(1)' },
        ],
    };

    const EXIT = {
        fade: null,
        zoom: [{ transform: 'scale(1)' }, { transform: 'scale(.94)', opacity: .6 }],
        wipe: [{ transform: 'translateX(0)' }, { transform: 'translateX(-8%)', filter: 'brightness(.6)' }],
        blur: [{ filter: 'blur(0px)' }, { filter: 'blur(16px)', opacity: .4 }],
    };

    const pickType = () => {
        if (cfg.transition !== 'mix' && ENTER[cfg.transition]) return cfg.transition;
        const pool = TYPES.filter((t) => t !== lastType);
        return pool[Math.floor(Math.random() * pool.length)];
    };

    // Preload every image so transitions never pop.
    slides.forEach((s) => { const i = new Image(); i.src = s.src; });

    slides.forEach((_, i) => {
        const d = document.createElement('span');
        d.className = 'dot';
        d.innerHTML = '<i></i>';
        d.addEventListener('click', () => go(i));
        dotsEl.appendChild(d);
    });
    $('capTotal').textContent = pad(slides.length);

    const setCaption = (i, instant) => {
        const s = slides[i];
        const apply = () => {
            $('capIndex').textContent = pad(i + 1);
            $('capTitle').textContent = s.caption || '';
            $('capSub').textContent = s.sub || '';
            caption.classList.remove('is-swapping');
        };
        if (instant) return apply();
        caption.classList.add('is-swapping');
        setTimeout(apply, 450);
    };

    const setDots = (i) => {
        [...dotsEl.children].forEach((d, idx) => {
            const bar = d.firstChild;
            bar.getAnimations().forEach((a) => a.cancel());
            d.classList.toggle('is-active', idx === i);
            if (idx === i) {
                bar.animate([{ width: '0%' }, { width: '100%' }], {
                    duration: cfg.slideDuration, easing: 'linear', fill: 'forwards',
                });
            }
        });
    };

    function go(i) {
        if (!slides.length) return;
        i = ((i % slides.length) + slides.length) % slides.length;
        if (i === current) return;

        const first = current === -1;
        current = i;

        const el = document.createElement('div');
        el.className = 'slide';
        const img = document.createElement('div');
        img.className = 'slide__img';
        img.style.backgroundImage = `url("${slides[i].src}")`;
        el.appendChild(img);
        const streak = document.createElement('div');
        streak.className = 'slide__streak';
        el.appendChild(streak);

        const prev = [...stage.children];
        stage.appendChild(el);

        if (cfg.kenBurns) {
            const kb = KEN_BURNS[Math.floor(Math.random() * KEN_BURNS.length)];
            img.animate(kb, {
                duration: cfg.slideDuration + cfg.transitionDuration * 2,
                easing: 'ease-out',
                fill: 'forwards',
            });
        }

        const cleanup = () => prev.forEach((p) => p.remove());

        if (first) {
            el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1400, easing: 'ease-out', fill: 'both' });
        } else {
            const type = pickType();
            lastType = type;
            const opts = { duration: cfg.transitionDuration, easing: EASE, fill: 'both' };
            const anim = el.animate(ENTER[type], opts);
            anim.onfinish = cleanup;
            anim.oncancel = cleanup;

            const top = prev[prev.length - 1];
            if (top && EXIT[type]) top.animate(EXIT[type], opts);

            if (type === 'wipe') {
                streak.animate(
                    [
                        { opacity: 0, transform: 'translateX(-60%)' },
                        { opacity: 1, offset: 0.4 },
                        { opacity: 0, transform: 'translateX(60%)' },
                    ],
                    { duration: cfg.transitionDuration * 1.1, easing: EASE }
                );
            }
        }

        setCaption(i, first);
        setDots(i);

        clearTimeout(timer);
        timer = setTimeout(() => go(current + 1), cfg.slideDuration);
    }

    /* ---------- Tips ---------- */

    const tips = cfg.tips.slice();
    let tipIdx = -1;

    const nextTip = () => {
        tipIdx = (tipIdx + 1) % tips.length;
        const text = $('tipText');
        text.classList.add('is-out');
        setTimeout(() => {
            text.textContent = tips[tipIdx];
            $('tipCount').textContent = `${tipIdx + 1} / ${tips.length}`;
            text.classList.remove('is-out');
        }, tipIdx === 0 && !text.textContent ? 0 : 450);

        const bar = $('tipTimer');
        bar.getAnimations().forEach((a) => a.cancel());
        bar.animate([{ width: '0%' }, { width: '100%' }], {
            duration: cfg.tipDuration, easing: 'linear', fill: 'forwards',
        });
    };

    if (tips.length) {
        $('tipTitle').textContent = cfg.tipTitle;
        nextTip();
        setInterval(nextTip, cfg.tipDuration);
    } else {
        $('tip').hidden = true;
    }

    /* ---------- Progress ---------- */

    const fill = $('fill');
    const pctEl = $('pct');
    const statusEl = $('status');
    let target = 0;
    let shown = 0;
    let gotProgress = false;

    if (!cfg.showStatus) statusEl.style.visibility = 'hidden';

    const setStatus = (text) => {
        if (!text) return;
        statusEl.textContent = String(text).replace(/[.…\s]+$/, '');
    };

    const STAGES = {
        INIT_CORE: 'Starting up',
        INIT_BEFORE_MAP_LOADED: 'Preparing the game',
        MAP: 'Loading the map',
        INIT_AFTER_MAP_LOADED: 'Finishing the map',
        INIT_SESSION: 'Joining the session',
    };

    const tick = () => {
        // Creep a little before real numbers arrive so the bar never looks frozen.
        if (!gotProgress && target < 0.08) target += 0.00012;
        shown += (target - shown) * 0.06;
        if (Math.abs(target - shown) < 0.0005) shown = target;
        fill.style.width = `${(shown * 100).toFixed(2)}%`;
        pctEl.textContent = Math.floor(shown * 100);
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const setProgress = (fraction) => {
        gotProgress = true;
        target = Math.max(target, Math.min(1, fraction));
    };

    const leave = (duration) => {
        setProgress(1);
        setStatus('Ready');
        if (musicOn) {
            const start = audio.volume;
            const steps = 20;
            let n = 0;
            const fadeInt = setInterval(() => {
                n++;
                audio.volume = Math.max(0, start * (1 - n / steps));
                if (n >= steps) clearInterval(fadeInt);
            }, (duration || 1200) / steps);
        }
        setTimeout(() => app.classList.add('is-leaving'), 250);
    };

    const handlers = {
        loadProgress: (d) => setProgress(d.loadFraction),
        startInitFunctionOrder: (d) => setStatus(STAGES[d.type] || 'Loading'),
        startDataFileEntries: () => setStatus('Loading game data'),
        performMapLoadFunction: () => setStatus('Loading the map'),
        onLogLine: (d) => setStatus(d.message),
    };

    window.addEventListener('message', (e) => {
        let d = e.data;
        if (typeof d === 'string') { try { d = JSON.parse(d); } catch (_) { return; } }
        if (!d) return;
        if (d.action === 'kd:fadeOut') return leave(d.duration);
        const fn = handlers[d.eventName];
        if (fn) fn(d);
    });

    /* ---------- Keyboard ---------- */

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && musicBtn) { e.preventDefault(); setMusic(!musicOn); }
        if (e.code === 'ArrowRight') go(current + 1);
        if (e.code === 'ArrowLeft') go(current - 1);
    });

    /* ---------- Browser preview ---------- */
    // Open web/index.html in a browser to see a simulated load.

    if (!inGame) {
        const fake = [
            'Requesting server variables', 'Downloading resources', 'Preparing the game',
            'Loading game data', 'Loading the map', 'Joining the session', 'Almost there',
        ];
        let p = 0;
        const sim = setInterval(() => {
            p += Math.random() * 0.025;
            setProgress(p);
            setStatus(fake[Math.min(fake.length - 1, Math.floor(p * fake.length))]);
            if (p >= 1) {
                clearInterval(sim);
                if (/[?&]leave/.test(location.search)) leave(1200);
            }
        }, 400);
    }

    /* ---------- Go ---------- */

    go(0);
    requestAnimationFrame(() => requestAnimationFrame(() => app.classList.add('is-ready')));
})();
