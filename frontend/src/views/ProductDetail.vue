<template>
    <div class="flex overflow-hidden rounded-lg shadow-md bg-white py-4 px-2">
        <div class="flex space-x-2 w-2/3">
            <div>
                <img alt="Antique Image" 
                    class="block h-60 w-full" 
                    :src="`${fullImageUrl}`"
                >
            </div>
            <div class="flex-grow">
                <h3 class="font-semibold text-lg">{{ product?.name }}</h3>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                </p>
                <p class="">
                    <span class="font-semibold">Started at</span>: GHS {{ product?.initialPrice }}
                </p>
                <p class="">
                    <span class="font-semibold">Now at</span>: GHS {{ product?.currentPrice }}
                </p>
                <p>
                    <span class="font-semibold">Closing Time</span>: {{ product?.endTime }}
                </p>
                <BidForm :product-id="productId"/>            
            </div>
        </div>
        <div class="mx-auto">
            <h2 class="text-2xl">Bid Timer</h2>
            <BidTimer />
        </div>
    </div>
    <BidHistoryList :product-id="productId" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, provide } from "@vue/runtime-core";
import { useRoute } from "vue-router";

import BidButton from "../components/BidButton.vue";
import BidForm from "../components/BidForm.vue";
import BidHistoryList from "../components/BidHistoryList.vue";
import useProduct from "../hooks/useProduct";
import IProduct from "../types/Product";
import { getProduct } from "../api/products.api";
import BidTimer from "../components/BidTimer.vue";
import { getBiddings } from "../api/bidding.api";

const product = ref<IProduct>();
const route = useRoute();
const {id: productId } = route.params;

onMounted( async() => {
    const response = await getProduct(productId as string);
    const item = response.data.data.product;
    product.value = item;
});

const fullImageUrl = computed(() => `/src/assets/images/${product.value?.imageUrl}`);
</script>

<style scoped>

</style>