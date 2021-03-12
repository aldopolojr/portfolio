<template>
    <the-menubar></the-menubar>
    <the-dock></the-dock>
</template>

<script>
import TheMenubar from '../menubar/TheMenubar.vue'
import TheDock from '../dock/TheDock.vue'
;
export default {
    components: { TheMenubar, TheDock },
}
</script>