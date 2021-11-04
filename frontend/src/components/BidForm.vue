<template>
    <form action="" method="post" @submit.prevent="submitBid">
        <div class="flex-inline items-center space-x-2 py-2">
            <input 
                type="checkbox" 
                id="autoBidding"
                class="rounded"
                v-model="autoBidding"
            >
            <label for="autoBidding">Enable Auto Bidding</label>
        </div>
        <div class="flex space-x-1 mt-1">
            <input 
                type="number" 
                class="w-40 rounded border-gray-200 rounded-md focus:border-yellow-600  focus:ring-yellow-500"
                placeholder="Enter Your Bid"
                required
                autofocus
                v-model.number="bidAmount"
            >
            <button
                type="submit" 
                class="bg-yellow-600 hover:bg-yellow-700 uppercase px-4 py-3 w-full rounded text-white">
                Submit Bid
            </button>
        </div>
        <div class="mt-2" v-if="showAlert">
            <MessageAlert 
                :title="alertTitle" 
                :body="alertBody"
                @close="closeAlert"
            />
        </div>
    </form>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { createBidding } from "../api/bidding.api";
import MessageAlert from "./MessageAlert.vue";

const props = defineProps({
    productId: String
});

const loading = ref(false);
const bidAmount = ref();
const autoBidding = ref(false);
const showAlert = ref(false);
const alertTitle = ref('');
const alertBody = ref('');

const submitBid = async () => {
    loading.value = true;
    const params = {
        bidAmount: bidAmount.value,
        productId: props.productId,
        userId: 'fake-socket-client-id'
    }
    try {
        const response = await createBidding(params);
        alertTitle.value = 'Success';
        alertBody.value = response.data.data.message;
    } catch (error) {
        alertTitle.value = 'Error';
        alertBody.value = 'An error occured';
    } finally {
        showAlert.value = true;
        
    }
}

const closeAlert = () => {
    showAlert.value = false;
}
</script>
