import { createStore } from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
    state() {
        return {
            settings: {
                mode: null,
                desktop: null,
                language: null,
            },
            modes: {
                loggedIn: true,
                fullscreen: false,
            },
        };
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
});

export default store;