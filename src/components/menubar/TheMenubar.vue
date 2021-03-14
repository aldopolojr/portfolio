<template>
    <header class="menubar" @mouseleave="closeMenus">
        <!-- LEFT -->
        <div class="menubar__left">
            <!-- MENU GROUP APPLE -->
            <div class="menubar__group">
                <a class="menubar__btn" :class="appleMenuClass" @click="toggleMenu('apple')"><i class="icon icon-apple"></i></a>
                <div class="submenu" v-show="menus.appleOpen">
                    <a class="submenu__btn">{{ content[settings.language].about }}</a>
                    <div class="submenu__divider"></div>
                    <a class="submenu__btn">{{ content[settings.language].systemPreferences }}</a>
                    <a class="submenu__btn">App Store</a>
                    <div class="submenu__divider"></div>
                    <a class="submenu__btn" @click="logout">{{ content[settings.language].logout }}
                        <span class="submenu__shortcut"><i class="icon icon-shift"></i><i class="icon icon-cmd"></i>Q</span>
                    </a>
                </div>
            </div>
            <!-- MENU GROUP ACTIVE APP -->
            <div class="menubar__group">
                <a class="menubar__btn" :class="appMenuClass" @click="toggleMenu('app')"><strong>{{ display.title }}</strong></a>
                <div class="submenu" v-show="menus.appOpen">
                    <a class="submenu__btn">{{ content[settings.language].hide }} {{ display.title }}
                        <span class="submenu__shortcut"><i class="icon icon-cmd"></i>H</span>
                    </a>
                    <a class="submenu__btn">{{ content[settings.language].quit }} {{ display.title }}
                        <span class="submenu__shortcut"><i class="icon icon-cmd"></i>Q</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- RIGHT -->
        <div class="menubar__right">
            <!-- MENU GROUP FULLSCREEN -->
            <div class="menubar__group">
                <a class="menubar__btn" @click="toggleFullscreen"><i :class="fullscreenIcon"></i></a>
            </div>
            <!-- MENU GROUP LANGUAGE -->
            <div class="menubar__group">
                <a class="menubar__btn" :class="languageMenuClass" @click="toggleMenu('language')"><i class="icon icon-language"></i></a>
                <div class="submenu" v-show="menus.languageOpen">
                    <a class="submenu__btn" @click="setLanguage('eng')">{{ content[settings.language].english }}
                        <span class="submenu__extra submenu__flag">🇬🇧</span>
                    </a>
                    <a class="submenu__btn" @click="setLanguage('ned')">{{ content[settings.language].dutch }}
                        <span class="submenu__extra submenu__flag">🇳🇱</span>
                    </a>
                </div>
            </div>
            <!-- MENU GROUP NETWORKS -->
            <div class="menubar__group">
                <a class="menubar__btn" :class="networkMenuClass" @click="toggleMenu('network')"><i class="icon icon-wifi"></i></a>
                <div class="submenu" v-show="menus.networkOpen">
                    <a class="submenu__btn" href="https://github.com/aldopolojr" target="_blank">GitHub
                        <span class="submenu__extra"><i class="icon icon-github"></i></span>
                    </a>
                    <a class="submenu__btn" href="https://www.linkedin.com/in/aldopolojr/" target="_blank">LinkedIn
                        <span class="submenu__extra"><i class="icon icon-linkedin"></i></span>
                    </a>
                    <a class="submenu__btn" href="https://twitter.com/aldopolojr" target="_blank">Twitter
                        <span class="submenu__extra"><i class="icon icon-twitter"></i></span>
                    </a>
                    <a class="submenu__btn" href="https://www.facebook.com/aldopolojr" target="_blank">Facebook
                        <span class="submenu__extra"><i class="icon icon-facebook"></i></span>
                    </a>
                    <a class="submenu__btn" href="https://www.instagram.com/aldopolojr/" target="_blank">Instagram
                        <span class="submenu__extra"><i class="icon icon-instagram"></i></span>
                    </a>
                </div>
            </div>
            <!-- MENU GROUP CLOCK -->
            <div class="menubar__group">
                <a class="menubar__clock">{{ clock }}</a>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            content: {
                eng: {
                    about: 'About aldopolojr',
                    systemPreferences: 'System Preferences',
                    logout: 'Logout',
                    hide: 'Hide',
                    quit: 'Quit',
                    english: 'English',
                    dutch: 'Dutch',
                    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

                },
                ned: {
                    about: 'Over aldopolojr',
                    systemPreferences: 'Voorkeursinstellingen',
                    logout: 'Uitloggen',
                    hide: 'Verberg',
                    quit: 'Sluit',
                    english: 'Engels',
                    dutch: 'Nederlands',
                    weekdays: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vri', 'Zat'],
                    months: ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
                },
            },
            menus: {
                appleOpen: false,
                appOpen: false,
                languageOpen: false,
                networkOpen: false,
            },
        };
    },
    computed: {
        ...mapGetters(['settings', 'modes', 'display']),
        appleMenuClass() {
            return [{ active: this.menus.appleOpen }];
        },
        appMenuClass() {
            return [{ active: this.menus.appOpen }];
        },
        languageMenuClass() {
            return [{ active: this.menus.languageOpen }];
        },
        networkMenuClass() {
            return [{ active: this.menus.networkOpen }];
        },
        fullscreenIcon() {
            return this.modes.fullscreen ? 'icon icon-fullscreen_exit' : 'icon icon-fullscreen';
        },
        clock() {
            let dt = this.display.time || new Date();

            let weekday = this.content[this.settings.language].weekdays[dt.getDay()];
            let date = dt.getDate();
            let month = this.content[this.settings.language].months[dt.getMonth()];
            let hour = dt.getHours();
            let min = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
            let ampm = dt.getHours() >= 12 ? "PM" : "AM";

            if (this.settings.language === 'eng') {
                if (hour > 12) {
                    hour -= 12;
                } else if (hour === 0) {
                    hour = 12;
                }
                return `${weekday} ${date} ${month} ${hour}:${min} ${ampm}`;
            } else {
                return `${weekday} ${date} ${month} ${hour}:${min}`;
            }
        },
    },
    methods: {
        ...mapActions(['updateSettings', 'updateModes', 'updateDisplay']),
        closeMenus() {
            this.menus.appleOpen = false;
            this.menus.appOpen = false;
            this.menus.languageOpen = false;
            this.menus.networkOpen = false;
        },
        toggleMenu(key) {
            if (!(key === 'app' && this.display.title === 'aldopolojr')) {
                if (!(this.menus[key + 'Open'])) {
                    this.closeMenus();
                }
                this.menus[key + 'Open'] = !this.menus[key + 'Open'];
            }
        },
        toggleFullscreen() {
            const fullscreen = this.modes.fullscreen;
            const elem = document.documentElement;

            if (fullscreen == false) {
                // open fullscreen
                if (elem.requestFullscreen) {
                elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
                this.updateModes({ key: 'fullscreen', val: true });
            } else if (fullscreen == true) {
                // close fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                this.updateModes({ key: 'fullscreen', val: false });
            }
        },
        setLanguage(lang) {
            this.updateSettings({ key: 'language', val: lang});
            localStorage.setItem("language", lang);
        },
        logout() {
            this.$store.dispatch('updateModes', { key: 'loggedIn', val: false });
        },
    },
    beforeCreate() {
        setInterval(()=> { this.$store.dispatch('updateDisplay', { key: 'time', val: new Date() }); }, 1000);
    },
}
</script>

<style lang="scss" scoped>
// MENUBAR
.menubar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: none;
    justify-content: space-between;
    padding: 0 calcRem(25px);
    font-size: calcRem(15px);
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    backdrop-filter: saturate(200%) blur(20px);

    @include desktop { display: flex; }

    &__left, &__right { display: flex; }

    &__group { position: relative; }

    &__btn, &__clock {
        padding: calcRem(6px) calcRem(12px);
        border-radius: 3px;
    }

    &__btn.active { background: rgba(#fff, 0.33);}

    &__clock { cursor: default; }
}

// SUBMENU
.menubar__left .submenu { left: 0; width: 180px; }
.menubar__right .submenu { right: 0; width: 130px; }

.submenu {
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    padding: calcRem(5px) calcRem(4px);
    border-radius: 6px;

    &__btn {
        padding: calcRem(4px) calcRem(8px);
        border-radius: 3px;

        &:hover {
            background: $accent;
            color: $txt-white;
        }
    }

    &__divider {
        margin: calcRem(4px) calcRem(10px);
        height: 1px;
    }

    &__shortcut, &__extra {
        float: right;
        font-weight: 300;
    }

    &__btn:hover &__shortcut, &__btn:hover &__extra { color:$txt-white; }

    &__flag { margin-top: -5px; }
}

// COLORS
.light {
    .menubar { background: rgba($main-bg-light, 0.5); color: #f0eef2; }
    .submenu { background: rgba($secondary-bg-light, 0.8); color: $txt-black; }
    .submenu__divider { background-color: rgba($txt-black, 0.1); }
    .submenu__shortcut, .submenu__extra { color: rgba($txt-black, 0.25); }
}
.dark {
    .menubar { background: rgba($main-bg-dark, 0.5); color: #f0eef2; }
    .submenu { background: rgba($secondary-bg-dark, 0.8); color: $txt-white; }
    .submenu__divider { background-color: rgba($txt-white, 0.1); }
    .submenu__shortcut, .submenu__extra { color: rgba($txt-white, 0.25); }
}
</style>