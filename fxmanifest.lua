fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'kd_loadingscreen'
author 'Koma Development · komadev.dk'
description 'A clean, cinematic loading screen with smooth transitions'
version '1.0.0'
repository 'https://komadev.dk'

loadscreen 'web/index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

shared_script 'config.lua'
client_script 'client/main.lua'
server_script 'server/main.lua'

files {
    'web/index.html',
    'web/style.css',
    'web/app.js',
    'web/config.js',
    'web/img/*',
    'web/music/*',
}
