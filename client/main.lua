local closed = false

local function close()
    if closed then return end
    closed = true

    -- Let the web page play its own fade-out first.
    SendLoadingScreenMessage(json.encode({ action = 'kd:fadeOut', duration = Config.FadeOutTime }))
    Wait(Config.FadeOutTime)

    if Config.GameFadeIn then DoScreenFadeOut(0) end

    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()

    if Config.GameFadeIn then
        Wait(250)
        DoScreenFadeIn(1500)
    end
end

AddEventHandler('playerSpawned', function()
    CreateThread(close)
end)

AddEventHandler('kd_loadingscreen:close', function()
    CreateThread(close)
end)

exports('Close', function()
    CreateThread(close)
end)

CreateThread(function()
    if Config.FallbackSeconds <= 0 then return end

    while not NetworkIsPlayerActive(PlayerId()) do
        Wait(250)
    end

    Wait(Config.FallbackSeconds * 1000)
    close()
end)
