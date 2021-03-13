export default {
    updateSettings(state, payload) {
        state.settings[payload.key] = payload.val;
    },
    updateModes(state, payload) {
        state.modes[payload.key] = payload.val;
    },
    updateDisplay(state, payload) {
        state.display[payload.key] = payload.val;
    },
    updateApps(state, payload) {
        state.appModes[payload.appName][payload.key] = payload.val;
    },
}