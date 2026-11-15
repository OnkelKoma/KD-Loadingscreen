<div align="center">

# kd_loadingscreen

**A clean, cinematic loading screen for FiveM.**
Smooth transitions, a real progress bar, and one config file. Free and open source.

[Website](https://komadev.dk) · [Discord](https://discord.gg/komadev) · Made by **Koma Development**

![Preview](.github/preview.gif)

<sub>Full quality still: [preview.jpg](.github/preview.jpg)</sub>

</div>

---

## Features

- **Cinematic slideshow** with slow Ken Burns pan & zoom on every image
- **4 transitions:** fade, zoom, diagonal wipe with a light streak, and blur. Pick one or let `mix` shuffle them
- **Real loading progress** taken from the game's own loading events, smoothed so it never jumps or freezes
- **Live status line** that shows what the game is doing ("Loading the map", "Joining the session" …)
- **Personal welcome** with the player's name, plus the current player count
- **Rotating tips card** with a timer bar
- **Location captions** and clickable slide dots
- **Website / Discord buttons** that open in the player's browser
- **Optional background music** with a mute button (or press `Space`)
- **Smooth fade-out** into the game instead of a hard cut
- **Scales to any resolution**, from 1080p to 4K and ultrawide
- **Works with ESX, QBCore, Qbox and standalone.** No dependencies.
- Everything is configured in **one file**: `web/config.js`

## Installation

1. Download the latest release and put `kd_loadingscreen` in your `resources` folder.
2. **Remove or stop any other loading screen** (for example `esx_loadingscreen` or `qb-loading`). Only one loading screen can be active.
3. Add this to your `server.cfg`:
   ```cfg
   ensure kd_loadingscreen
   ```
4. Edit `web/config.js` with your server name, colours, images and links.
5. Restart the server. Loading screen changes only show up for players who connect *after* the restart.

> **Tip:** open `web/index.html` in your browser to preview your changes without joining the server. It runs a fake load so you can see everything move.

## Configuration

### `web/config.js` (the look)

| Option | What it does |
| --- | --- |
| `serverName`, `tagline` | Headline and subtitle |
| `logo` | Path to your logo, e.g. `img/logo.png`. Leave empty to use the `badge` text |
| `accent` | Main colour as hex, e.g. `#ff6a3d` |
| `slides` | Your background images, each with an optional `caption` and `sub` |
| `slideDuration`, `transitionDuration` | Timing in milliseconds |
| `transition` | `fade`, `zoom`, `wipe`, `blur` or `mix` |
| `kenBurns`, `shuffle` | Pan/zoom effect, random slide order |
| `tips`, `tipTitle`, `tipDuration` | Rotating tips. An empty list hides the card |
| `links` | Buttons top-right. Icons: `web`, `discord`, `tiktok`, `youtube`, `store` |
| `music` | Background music settings (see below) |
| `welcome`, `welcomeFallback` | Welcome text. `{name}` becomes the player's name |
| `showPlayerCount`, `showStatus`, `credit` | Toggle the online count, status line and credit |

### `config.lua` (the behaviour)

| Option | Default | What it does |
| --- | --- | --- |
| `Config.FadeOutTime` | `1200` | Length of the fade-out in ms |
| `Config.FallbackSeconds` | `20` | Closes the screen this many seconds after the player is active, in case `playerSpawned` never fires. `0` disables it |
| `Config.GameFadeIn` | `true` | Fades the game in from black afterwards |
| `Config.Handover` | `true` | Sends the player's name and online count to the screen |

### Adding your own images

Drop your images in `web/img/` and list them under `slides` in `web/config.js`:

```js
slides: [
    { src: 'img/my-shot.jpg', caption: 'Vinewood Hills', sub: 'Where the money lives' },
],
```

Keep them around **1920×1080 JPGs at 200–500 KB** each. Players download the loading screen before anything else, so huge PNGs make it load slower.

### Adding music

1. Put an `.mp3` in `web/music/`, e.g. `web/music/music.mp3`.
2. In `web/config.js`, set `music.enabled = true` and check that `music.file` matches the file name.

Only use music you have the rights to.

## How it closes

The screen fades out when the player spawns (`playerSpawned`, which ESX, QBCore and spawnmanager all fire). If you use a custom spawn or character selector, you can close it yourself:

```lua
-- client side
TriggerEvent('kd_loadingscreen:close')
-- or
exports.kd_loadingscreen:Close()
```

If nothing closes it, `Config.FallbackSeconds` takes over.

## FAQ

**The old loading screen still shows.** Another resource with `loadscreen` in its `fxmanifest.lua` is still running. Remove it from `server.cfg`.

**My changes don't show up.** Restart the server and reconnect. Clearing the FiveM cache (`%localappdata%/FiveM/FiveM.app/data/cache`) can help too.

**The player name says "Welcome to the city".** The name comes from the server during connect. Make sure `Config.Handover = true` and that the resource is started (`ensure`), not only present.

**Stuck on the loading screen after spawning.** Your spawn system probably doesn't fire `playerSpawned`. Call `TriggerEvent('kd_loadingscreen:close')` after your character has spawned, or lower `Config.FallbackSeconds`.

## Support

Questions, bugs or ideas? Join the [Discord](https://discord.gg/komadev) or open an issue.

## License

[MIT](LICENSE). Free to use, modify and share. Keeping the small credit on screen (`credit: true`) is appreciated but not required.

The included screenshots are from GTA V and are only meant as examples. Swap them for your own server's shots.

---

<div align="center">

Made with ❤️ by **[Koma Development](https://komadev.dk)**

</div>
