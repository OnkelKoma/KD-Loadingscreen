Config = {}

-- How long the screen takes to fade out once the player has spawned (ms).
Config.FadeOutTime = 1200

-- Safety net: if nothing triggers 'playerSpawned' (custom spawn systems),
-- close the loading screen this many seconds after the player is active.
-- Set to 0 to disable and close it yourself with:
--   TriggerEvent('kd_loadingscreen:close')
Config.FallbackSeconds = 20

-- Fade the game screen in from black after the loading screen closes.
Config.GameFadeIn = true

-- Send the player's name and the online count to the loading screen.
-- ("Welcome back, Name" + "12 / 64 online")
Config.Handover = true
