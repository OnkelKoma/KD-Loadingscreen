if not Config.Handover then return end

-- Passes a little data to the loading screen (read as window.nuiHandoverData).
AddEventHandler('playerConnecting', function(name, _, deferrals)
    deferrals.handover({
        kd_name = name,
        kd_players = #GetPlayers(),
        kd_maxPlayers = GetConvarInt('sv_maxclients', 48),
    })
end)
