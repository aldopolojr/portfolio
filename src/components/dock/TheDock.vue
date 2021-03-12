<template>
    <div class="dock-container">
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
                { name: 'Finder', src: './img/apps/finder.png' },
                { name: 'Siri', src: './img/apps/siri.png' },
                { name: 'App\xa0Store', src: './img/apps/appstore.png' },
                { name: 'Mail', src: './img/apps/mail.png' },
                { name: 'Messages', src: './img/apps/messages.png' },
                { name: 'Reminders', src: './img/apps/reminders.png' },
                { name: 'LinkedIn', src: './img/apps/linkedin.png' },
                { name: 'Facebook', src: './img/apps/facebook.png' },
                { name: 'Instagram', src: './img/apps/instagram.png' },
                { name: 'Music', src: './img/apps/music.png' },
                { name: 'Netflix', src: './img/apps/netflix.png' },
                { name: 'Settings', src: './img/apps/settings.png' },
                { name: 'Bin', src: './img/apps/bin.png' },
            ],
        };
    },
}
</script>

<style lang="scss" scoped>
.dock-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;

    @include desktop {
        top: auto;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        overflow: auto;
        height: 120px;
    }
}

.dock {
    padding: calcRem(25px) 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @include tablet { grid-template-columns: repeat(6, 1fr); }

    @include desktop {
        margin-bottom: calcRem(8px);
        padding: calcRem(5px);
        display: flex;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
        border: 1px solid rgba(#fff, 0.25);
        border-radius: 8px;
    }
}

.light .dock {
    @include desktop {
        background: rgba($secondary-bg-light, 0.5);
    }
}

.dark .dock {
    @include desktop {
        background: rgba($secondary-bg-dark, 0.5);
    }
}
</style>