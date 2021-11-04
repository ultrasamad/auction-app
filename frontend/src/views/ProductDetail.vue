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
    <div class="w-full mt-2">
      <h3 class="text-center text-lg font-bold">Product Biddings</h3>
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">User</th>
            <th class="px-4 py-3">Bid Amount</th>
            <th class="px-4 py-3">Date/Time</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700" v-for="bidding in biddings" :key="bidding._id">
            <td class="px-4 py-3 border">{{ bidding.userId }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ bidding.bidAmount }}</td>
            <td class="px-4 py-3 text-sm border">{{ bidding.bidTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

import BidButton from "../components/BidButton.vue";
import BidForm from "../components/BidForm.vue";
import useProduct from "../hooks/useProduct";
import IProduct from "../types/Product";
import { getProduct } from "../api/products.api";
import BidTimer from "../components/BidTimer.vue";
import { getBiddings } from "../api/bidding.api";

const product = ref<IProduct>();
const biddings = ref([]);

const route = useRoute();
const {id: productId } = route.params;

onMounted( async() => {
    const response = await getProduct(productId as string);
    const item = response.data.data.product;
    product.value = item;

    const bidResponse = await getBiddings(productId as string);
    biddings.value = bidResponse.data.data.biddings;
});

const fullImageUrl = computed(() => `/src/assets/images/${product.value?.imageUrl}`);


</script>

<style scoped>

</style>