<template>
    <h2>Product Listing</h2>
    <div class="w-full mt-2">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Initial Price</th>
            <th class="px-4 py-3">Current Price</th>
            <th class="px-4 py-3">End Date</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700" v-for="product in state.products" :key="product._id">
            <td class="px-4 py-3 border">{{ product.name }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ product.initialPrice }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ product.currentPrice }}</td>
            <td class="px-4 py-3 text-sm border">{{ product.endTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

import useProduct from "../hooks/useProduct";

const { getProducts, loadProducts } = useProduct();
const state = reactive({
    products: getProducts
});

onMounted(() => {
    loadProducts();
});
</script>

<style scoped>

</style>