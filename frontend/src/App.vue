<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, provide } from "vue";
import { useRouter } from "vue-router";
import initConnection from "./sockets/socketio.service";


const defaultLayout = "default";
const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout}-layout`
);

provide('socketio', initConnection());

onMounted(() => {
  //
});

</script>

<style scoped>

</style>
