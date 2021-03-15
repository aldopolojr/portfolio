<template>
    <div class="login">
        <div class="login__profiles">
            <div class="login__profile">
                <a class="login__acount login__acount--user" :class="userClass" @click="selectProfile('user')">
                    <img class="login__img" src="@/assets/img/aldopolo.png" alt="A picture of a handsome man">
                    <p class="login__name">Aldo Polo</p>
                </a>
            </div>
            <div class="login__profile">
                <a class="login__acount login__acount--guest" :class="guestClass" @click="selectProfile('guest')">
                    <img class="login__img" src="@/assets/img/guest.png" alt="A black silhouette of a man">
                    <p class="login__name">{{ content[settings.language].guest }}</p>
                </a>
            </div>
        </div>
        <div class="login__pwd" :class="pwdClass">
            <div class="login__input-container" ref="inputContainer">
                <a class="login__btn login__btn--goback" @click="selectProfile('')"><i class="icon icon-arrow-left-circle"></i></a>
                <input class="login__input" type="password" :placeholder="content[settings.language].placeholder" v-model="pwdInput" @keyup.enter="failLogin" :disabled="waitLogin">
                <a class="login__btn login__btn--login" v-show="pwdInput !== ''" @click="failLogin"><i class="icon icon-arrow-right-circle"></i></a>
            </div>
        </div>
        <div class="login__progress" :class="progressClass">
            <div class="login__progress-container">
                <span class="login__progress-bar"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            content: {
                eng: {
                    guest: 'Guest',
                    placeholder: 'Enter Password',
                },
                ned: {
                    guest: 'Gast',
                    placeholder: 'Typ Wachtwoord',
                },
            },
            selectedProfile: '',
            pwdInput: '',
            waitLogin: false,
        };
    },
    computed: {
        ...mapGetters(['settings']),
        userClass() {
            if (this.selectedProfile === 'user') {
                return { 'active': true,  'hidden': false };
            } else if (this.selectedProfile === 'guest') {
                return { 'active': false,  'hidden': true };
            } else {
                return { 'active': false,  'hidden': false };
            }
        },
        guestClass() {
            if (this.selectedProfile === 'guest') {
                return { 'active': true,  'hidden': false };
            } else if (this.selectedProfile === 'user') {
                return { 'active': false,  'hidden': true };
            } else {
                return { 'active': false,  'hidden': false };
            }
        },
        pwdClass() {
            return ( this.selectedProfile === 'user' ? { 'hidden': false } : { 'hidden': true } );
        },
        progressClass() {
            return ( this.selectedProfile === 'guest' ? { 'active': true } : { 'active': false } );
        },
    },
    methods: {
        selectProfile(name) {
            this.selectedProfile = name;
            this.pwdInput = '';

            if (name === 'guest') {
                setTimeout( ()=> { this.$store.dispatch('updateModes', { key: 'loggedIn', val: true }); }, 5000);
            }
        },
        failLogin() {
            if (!this.waitLogin) {
                this.waitLogin = true;
                this.$refs.inputContainer.classList.add('active');
                setTimeout( ()=> { 
                    this.$refs.inputContainer.classList.remove('active');
                    this.waitLogin = false;
                }, 1000);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
::placeholder, ::-webkit-input-placeholder { color: $txt-white; }

.login {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: calcRem(25px);
    transform: translate(-50%, -50%);

    // PROFILES
    &__profiles {
        display: flex;
    }

    &__profile {
        margin: 0 calcRem(20px);
        width: 80px;
        text-align: center;
    }

    &__acount {
        @include transition(all 0.3s);
        opacity: 1;

        &--user.active {   transform: translateX(60px); }
        &--guest.hidden { transform: translateX(60px); opacity: 0; visibility: hidden; }
        &--user.hidden {   transform: translateX(-60px); opacity: 0; visibility: hidden; }
        &--guest.active { transform: translateX(-60px); }
    }

    &__img {
        width: 100%;
        vertical-align: bottom;
        border-radius: 50%;
    }

    &__profile:nth-child(1) &__img { background: #82ccdd; }
    &__profile:nth-child(2) &__img { background: #dfe4ea; }

    &__name {
        margin-top: calcRem(10px);
        color: $txt-white;
    }

    // PASSWORD
    &__pwd {
        display: flex;
        justify-content: center;
        margin-top: calcRem(20px);
        text-align: center;

        &.hidden { opacity: 0; visibility: hidden; }
    }

    &__input-container {
        position: relative;

        &.active { @include animation('loginFail 0.4s infinite 0.6s'); }
    }

    &__input {
        padding: calcRem(8px) calcRem(35px) calcRem(8px) calcRem(15px);
        width: 140px;
        color: $txt-white;
        font-size: calcRem(12px);
        border: none;
        border-radius: 15px;
        outline: none;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
    }

    &__btn {
        position: absolute;
        top: 0;
        display: flex;
        width: 20px;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: $txt-white;

        &--goback { left: calcRem(-23px); }
        &--login { right: calcRem(5px); }
    }

    // PROGRESS
    &__progress {
        display: flex;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
    }

    &__progress-container {
        position: relative;
        width: 200px;
        height: 8px;
        border-radius: 15px;
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
    }

    &__progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 8px;
        background: $txt-white;
        border-radius: 15px;
    }

    &__progress.active {
        opacity: 1;
        visibility: visible;
        
        .login__progress-bar { 
            @include animation('loginLoader 5s forwards');
        }
    }
}

// COLORS
.light {
    .login__input { background: rgba($tertiary-light, 0.4); }
    .login__progress-container { background: rgba($main-bg-light, 0.4); }
}
.dark {
    .login__input { background: rgba($tertiary-dark, 0.6); }
    .login__progress-container { background: rgba($main-bg-dark, 0.6); }
}

@include phone-md {
    .login__profile { width: 100px; }
    .login__acount--user.active {   transform: translateX(70px); }
    .login__acount--guest.hidden { transform: translateX(70px); opacity: 0; visibility: hidden; }
    .login__acount--user.hidden {   transform: translateX(-70px); opacity: 0; visibility: hidden; }
    .login__acount--guest.active { transform: translateX(-70px); }
}

@include tablet {
    .login__profile { width: 120px; }
    .login__acount--user.active {   transform: translateX(80px); }
    .login__acount--guest.hidden { transform: translateX(80px); opacity: 0; visibility: hidden; }
    .login__acount--user.hidden {   transform: translateX(-80px); opacity: 0; visibility: hidden; }
    .login__acount--guest.active { transform: translateX(-80px); }
}
</style>