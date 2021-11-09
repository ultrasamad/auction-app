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
                <div class="">
                    <span class="font-semibold">BIDDING STATUS</span>:
                    <span class="bg-blue-500 text-white px-2 rounded-sm">{{ product?.biddingStatus }}</span>
                </div>
                <div class="pt-1">
                    <span class="font-semibold">STARTING PRICE</span>: {{ formattedPrice(product?.initialPrice as number) }}
                </div>
                <div class="pt-1">
                    <span class="font-semibold">CURRENT PRICE</span>: {{ formattedPrice(product?.currentPrice as number) }}
                </div>
                <div class="mt-1">
                    <span class="font-semibold">CLOSING TIME</span>: {{ product?.endTime }}
                </div>
                <BidForm :product-id="productId"/>            
            </div>
        </div>
        <div class="mx-auto">
            <h2 class="text-2xl">BID TIMER</h2>
            <BidTimer :product-id="productId"/>
        </div>
    </div>
    <BidHistoryList :product-id="productId" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

import BidButton from "../components/BidButton.vue";
import BidForm from "../components/BidForm.vue";
import BidHistoryList from "../components/BidHistoryList.vue";
import BidTimer from "../components/BidTimer.vue";

import useProduct from "../hooks/useProduct";
import IProduct from "../types/Product";
import { getProduct } from "../api/products.api";
import { getBiddings } from "../api/bidding.api";
import formattedPrice from "../utils/formatCurrency";
import { formattedTime } from "../utils/datetime";

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