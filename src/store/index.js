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
                dockVisible: null,
            },
            modes: {
                loggedIn: false,
                fullscreen: false,
            },
            display: {
                title: 'aldopolojr',
                time: null,
            },
            appModes: {
                finder: { open: false, show: false },
                siri: { open: false, show: false },
                appstore: { open: false, show: false },
                mail: { open: false, show: false },
                messages: { open: false, show: false },
                reminders: { open: false, show: false },
                linkedin: { open: false, show: false },
                facebook: { open: false, show: false },
                instagram: { open: false, show: false },
                music: { open: false, show: false },
                netflix: { open: false, show: false },
                settings: { open: false, show: false },
                bin: { open: false, show: false },
            },
        };
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
});

export default store;