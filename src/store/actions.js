export default {
    updateSettings(context, payload) {
        context.commit('updateSettings', payload);
    },
    updateModes(context, payload) {
        context.commit('updateModes', payload);
    },
}