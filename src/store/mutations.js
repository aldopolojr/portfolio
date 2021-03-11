export default {
    updateSettings(state, payload) {
        state.settings[payload.key] = payload.val;
    },
    updateModes(state, payload) {
        state.modes[payload.key] = payload.val;
    },
}