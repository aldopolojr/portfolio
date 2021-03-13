<template>
    <the-menubar></the-menubar>
    <the-dock></the-dock>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import TheMenubar from '../menubar/TheMenubar.vue'
import TheDock from '../dock/TheDock.vue'
;
export default {
    components: { TheMenubar, TheDock },
    provide() {
        return {
            clickApp: this.clickApp,
        };
    },
    computed: {
        ...mapGetters(['appModes']),
    },
    methods: {
        ...mapActions(['updateApps']),
        clickApp(app) {
            const appName = app.replace(/\s/g, "").toLowerCase();
            console.log(appName);
        },
        openApp() {},
        hideApp() {},
        closeApp() {},
    },
}
</script>