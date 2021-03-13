<template>
    <div class="app" :class="visibleClass" :style="'--i: ' + app.order" @mouseover="scaleEffect" @mouseleave="deleteScale">
        <a class="app__link" @click="clickApp(app.name)">
            <img class="app__img" :src="app.src" :alt="app.name">
            <p class="app__name">{{ app.name }}</p>
        </a>
    </div>
</template>

<script>
export default {
    props: ['app'],
    inject: ['clickApp'],
    computed: {
        visibleClass() {
            return this.app.order === 0 ? { 'hidden': true } : { 'hidden': false };
        },
    },
    methods: {
        scaleEffect(e) {
            e.target.closest('.app').classList.add('scale1');
            e.target.closest('.app')?.nextElementSibling?.classList.add('scale2');
            e.target.closest('.app')?.previousElementSibling?.classList.add('scale2');
        },
        deleteScale() {
            document.querySelectorAll('.app').forEach(node => {
                node.classList.remove('scale1');
                node.classList.remove('scale2');
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.app {
    margin: 0 0 calcRem(30px);
    text-align: center;
    order: var(--i);

    &.hidden { display: none; }

    &__link {
        position: relative;
        margin: 0 auto;
        width: 65px;
    }

    &__img {
        position: relative;
        margin: 0 auto;
        width: 100%;
        vertical-align: bottom;
    }

    &__name {
        color: $txt-white;
        font-size: calcRem(12px);
    }
}

@include desktop {
    .app { margin: 0 0 calcRem(5px); order: 0; transform-origin: bottom; @include transition(transform 0.1s, margin 0.1s);}
    .app.hidden { display: block; }
    .app.scale1 { margin: 0 calcRem(5px) calcRem(5px); transform: scale(1.2); }
    .app.scale2 { margin: 0 calcRem(2.5px) calcRem(5px); transform: scale(1.1); }
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
        z-index: 100;
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

    .app__link:hover .app__name { display: block; }

    .light .app__name { background: rgba($secondary-bg-light, 0.8); color: $txt-black; }
    .light .app__name::before { border-top: 5px solid rgba($secondary-bg-light, 0.8); }
    .dark .app__name { background: rgba($secondary-bg-dark, 0.8); color: $txt-white; }
    .dark .app__name::before { border-top: 5px solid rgba($secondary-bg-dark, 0.8); }
}
</style>