<template>
    <div class="relative m-3 flex flex-wrap">
        <ProductCard :product="product" v-for="product in state.products" :key="product._id"/>
    </div> 
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

import ProductCard from "../components/ProductCard.vue";
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