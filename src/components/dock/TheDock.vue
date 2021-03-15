<template>
    <div class="dock-container" :class="dockVisibleClass">
        <div class="dock">
            <base-app v-for="app in apps" :key="app.name" :app="app"></base-app>
        </div>
    </div>
</template>

<script>
import BaseApp from './BaseApp.vue';

export default {
    components: { BaseApp },
    data() {
        return {
            apps: [
                { name: 'Finder', src: './img/apps/finder.png', order: 5 },
                { name: 'Siri', src: './img/apps/siri.png', order: 0 },
                { name: 'App\xa0Store', src: './img/apps/appstore.png', order: 3 },
                { name: 'Mail', src: './img/apps/mail.png', order: 2 },
                { name: 'Messages', src: './img/apps/messages.png', order: 1 },
                { name: 'Reminders', src: './img/apps/reminders.png', order: 6 },
                { name: 'LinkedIn', src: './img/apps/linkedin.png', order: 7 },
                { name: 'Facebook', src: './img/apps/facebook.png', order: 8 },
                { name: 'Instagram', src: './img/apps/instagram.png', order: 9 },
                { name: 'Music', src: './img/apps/music.png', order: 10 },
                { name: 'Netflix', src: './img/apps/netflix.png', order: 11 },
                { name: 'Settings', src: './img/apps/settings.png', order: 4 },
                { name: 'Bin', src: './img/apps/bin.png', order: 0 },
            ],
        };
    },
    computed: {
        dockVisibleClass() {
            return { 'dockVisible': !this.$store.getters.settings.dockVisible };
        },
    },
}
</script>

<style lang="scss" scoped>
// PHONE
.dock-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
}

.dock {
    padding: calcRem(25px) 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

// TABLET
@include tablet {
    .dock { grid-template-columns: repeat(6, 1fr); }
}

// DESKTOP
@include desktop {
    .dock-container {
        top: auto;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        overflow: visible;
    }

    .dock {
        margin-bottom: calcRem(8px);
        padding: calcRem(5px);
        display: flex;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
        border: 1px solid rgba(#fff, 0.25);
        border-radius: 8px;
        @include transition(transform 0.3s);
    }

    .dockVisible .dock { transform: translateY(150%); }
    .dockVisible.dock-container:hover .dock { transform: translateY(0); }

    .light .dock { background: rgba($secondary-bg-light, 0.5); }
    .dark .dock { background: rgba($secondary-bg-dark, 0.65); }
}
</style>