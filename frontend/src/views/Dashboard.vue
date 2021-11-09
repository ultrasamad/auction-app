<template>
    <h2 class="text-center text-2xl font-bold text-gray-700">Product Listing</h2>
    <div class="w-full mt-2">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Initial Price</th>
            <th class="px-4 py-3">Current Price</th>
            <th class="px-4 py-3">Bidding Status</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700" v-for="product in state.products" :key="product._id">
            <td class="px-4 py-3 border">{{ product.name }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ formattedPrice(product.initialPrice) }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ formattedPrice(product.currentPrice) }}</td>
            <td class="px-4 py-3 text-sm border">
              <div class="flex items-center justify-between">
                <span class="font-semibold bg-green-500 px-2 text-white rounded-sm">
                  {{ product.biddingStatus }}
                </span>
                <form action="" method="post" @submit.prevent="submitForm(product._id)">
                  <button
                    type="submit"
                    class="bg-yellow-600 text-white px-4 py-1 rounded"
                    v-if="product.biddingStatus === 'IDLE'"
                  >
                    Activate BID
                  </button>
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, onMounted } from 'vue';

import { updateProduct } from '../api/products.api';
import useProduct from "../hooks/useProduct";
import formattedPrice from '../utils/formatCurrency';

const { getProducts, loadProducts } = useProduct();
const state = reactive({ products: getProducts });
const socketIO = ref<null|undefined>(null);

const submitForm = async (productId: string) => {

  try {
    const params = {
      biddingStatus: 'ACTIVE',
    }
    const response = await updateProduct(productId, params);
    const data = response.data.data;
    const { product } = data;
    socketIO.value.emit('timer:start', product);

    location.reload();

    //Reload page
  } catch (error) {
    //TODO: Replace with custom alert
    alert('Failed updating product status');
  }
}

onMounted(() => {
    loadProducts();
    socketIO.value = inject('socketio');
});
</script>

<style scoped>

</style>