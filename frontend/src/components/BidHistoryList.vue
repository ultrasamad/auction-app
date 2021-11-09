<template>
    <div class="w-full mt-2">
      <h3 class="text-center text-lg font-bold">Product Biddings</h3>
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">User(Socket ID)</th>
            <th class="px-4 py-3">Bid Amount</th>
            <th class="px-4 py-3">Date/Time</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700" v-for="bidding in biddings" :key="bidding._id">
            <td class="px-4 py-3 border">{{ bidding.userId }}</td>
            <td class="px-4 py-3 text-ms font-semibold border">{{ bidding.bidAmount }}</td>
            <td class="px-4 py-3 text-sm border">{{ bidding.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts" setup>
import  { ref, onMounted, inject, computed } from '@vue/runtime-core';
import { getBiddings } from '../api/bidding.api';
import IBid from "../types/Bid";

const props = defineProps({
    productId: {
        type: String,
        required: true,
    }
});

const biddings = ref<IBid[]>([]);
const socketIO = ref<null|undefined>(null);

onMounted( async () => {
  socketIO.value = inject('socketio');
  const response = await getBiddings(props.productId as string);
  biddings.value = response.data.data.biddings;

  //Push to biddings
  socketIO.value?.on('bidding:created', (payload: IBid) => {
      biddings.value.unshift(payload);
  });
})
</script>
