<template>
    <div class="app">
        <a class="app__link">
            <div class="app__img">
                <img :src="app.src" :alt="app.name">
            </div>
            <p class="app__name">{{ app.name }}</p>
        </a>
    </div>
</template>

<script>
export default {
    props: ['app'],
}
</script>

<style lang="scss" scoped>
.app {
    margin: 0 0 calcRem(30px);
    text-align: center;

    &__link {
        position: relative;
        margin: 0 auto;
        width: 56px;
    }

    &:last-child {
        display: none;
    }
}

.app__img {
    position: relative;
    margin: 0 auto;
    width: 100%;

    img {
        width: 100%;
        vertical-align: bottom;
    }
}

.app__name {
    color: $txt-white;
    font-size: calcRem(12px);
}

@include desktop {
    .app { margin: 0 0 calcRem(5px); }
    .app:last-child { display: block; }
    .app:hover { transform: scale(1.1); transform-origin: bottom; }
    .app__link { width: 50px; }

    .app__name { 
        position: absolute; 
        top: -50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        display: none;
        padding: calcRem(3px) calcRem(10px);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
        border-radius: 3px;
    }

    .app__name::before {
        content: '';
        position: absolute; 
        bottom: -5px; 
        left: 50%; 
        transform: translate(-50%, 0);
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }

    .app__link:hover .app__name {
        display: block;
    }
}

.light {
    @include desktop {
        .app__name {
            background: rgba($secondary-bg-light, 0.8);
            color: $txt-black;
        }
        .app__name::before {
            border-top: 5px solid rgba($secondary-bg-light, 0.8);
        }
    }
}

.dark {
    @include desktop {
        .app__name {
            background: rgba($secondary-bg-dark, 0.8);
            color: $txt-white;
        }
        .app__name::before {
            border-top: 5px solid rgba($secondary-bg-dark, 0.8);
        }
    }
}
</style>