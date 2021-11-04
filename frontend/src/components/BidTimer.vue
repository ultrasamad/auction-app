<template>
    <div class="border w-full p-4 rounded-full mt-4">
        <div class="relative inline-flex items-center justify-center overflow-hidden rounded-full">
            <svg class="w-20 h-20">
                <circle
                    class="text-gray-300"
                    stroke-width="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
                <circle
                    class="text-yellow-600"
                    stroke-width="5"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="circumference - percent / 100 * circumference"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
            </svg>
            <span class="absolute text-xl text-blue-700">{{ percent }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "@vue/runtime-core";

    //TODO: Accept product as prop
    const circumference = ref(30 * 2 * Math.PI);
    const percent = 10;
</script>
