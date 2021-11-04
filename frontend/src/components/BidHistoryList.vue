<template>
    <div class="w-full mt-2">
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
import  { ref, onMounted } from '@vue/runtime-core';
import { getBiddings } from '../api/bidding.api';

const props = defineProps({
    productId: {
        type: String,
        required: true,
    }
});

const biddings = ref([]);

onMounted( async () => {
    const response = await getBiddings(props.productId as string);
    biddings.value = response.data.data.biddings;
})
</script>
