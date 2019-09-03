export const actions = {
    // Game actions
    startGame: 'game/START_GAME',
    startNewRound: 'game/START_NEW_ROUND',
    prepareRound: 'game/PREPARE_ROUND',
    play: 'game/PLAY',
    showInterlude: 'game/SHOW_INTERLUDE',
    endGame: 'game/END_GAME',
    showResult: 'game/SHOW_RESULT',
    swipe: 'game/SWIPE',
    timerTick: 'game/TIMER_TICK',

    // Navigation-actions
    navigateToPlayground: 'router/NAVIGATE_TO_PLAYGROUND',
    navigateToMenu: 'router/NAVIGATE_TO_MENU',

    // Other generic actions
    rehydrate: 'app/REHYDRATE_REQUEST',
    rehydrateSuccess: 'app/REHYDRATE_SUCCESS'
};
