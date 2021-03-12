<template>
    <div :class="frameClass">
        <login-screen v-if="!modes.loggedIn"></login-screen>
        <home-screen v-else></home-screen>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import HomeScreen from './components/homescreen/HomeScreen.vue';
import LoginScreen from './components/login/LoginScreen.vue';

export default {
    components: { LoginScreen, HomeScreen },
    computed: {
        ...mapGetters(['settings', 'modes']),
        frameClass() {
            return ['frame', this.settings.mode, this.settings.desktop, { 'loginscreen': !this.modes.loggedIn }];
        },
    },
    methods: {
        ...mapActions(['updateSettings', 'UpdateModes']),
    },
    beforeCreate() {
        this.$store.dispatch('updateSettings', { key: 'mode', val: localStorage.getItem("mode") || 'light' });
        this.$store.dispatch('updateSettings', { key: 'desktop', val: localStorage.getItem("desktop") || 'sierra' });
        this.$store.dispatch('updateSettings', { key: 'language', val: localStorage.getItem("language") || 'eng' });
    },
}
</script>

<style lang="scss">
@import "@/assets/sass/typography.scss";
@import "@/assets/sass/reset.scss";
@import "@/assets/sass/base.scss";

.frame {
    position: relative;
    width: 100%;
    height: 100%;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $grey-bg center/cover no-repeat;
        z-index: -1;
    }

    &.light.bigsur::after { background-image: url('./assets/img/bg/big-sur-light.jpg'); }
    &.dark.bigsur::after { background-image: url('./assets/img/bg/big-sur-dark.jpg'); }
    &.light.catalina::after { background-image: url('./assets/img/bg/catalina-light.jpg'); }
    &.dark.catalina::after { background-image: url('./assets/img/bg/catalina-dark.jpg'); }
    &.light.mojave::after { background-image: url('./assets/img/bg/mojave-light.jpg'); }
    &.dark.mojave::after { background-image: url('./assets/img/bg/mojave-dark.jpg'); }
    &.mavericks::after { background-image: url('./assets/img/bg/mavericks.jpg');}
    &.sierra::after { background-image: url('./assets/img/bg/sierra.jpg');}

    &.loginscreen::after {
        filter: blur(1.5rem);
        transform: scale(1.2);
        // overflow
    }
}
</style>