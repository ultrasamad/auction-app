<template>
    <div class="relative  min-w-[340px] bg-white shadow-md rounded-md p-2 mx-1 my-3 cursor-pointer">
        <div class="overflow-x-hidden rounded relative">
            <img class="h-60 w-full object-cover" :src="fullImageUrl">
        </div>
        <div class="mt-4 pl-2 mb-2 flex justify-between ">
            <div>
                <p class="text-lg font-semibold text-gray-900 mb-0">
                    {{ props.product?.name }}
                </p>
                <p class="text-md text-gray-800 mt-0 font-semibold">
                    {{ formattedPrice(props.product?.initialPrice as number) }}
                </p>
            </div>
        </div>
        <BidButton :item-id="props.product?._id">
            Bid Now
        </BidButton>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import IProduct from '../types/Product';
import BidButton from "../components/BidButton.vue";
import formattedPrice from '../utils/formatCurrency';

const props = defineProps({
    product: Object as PropType<IProduct>
});

const fullImageUrl = computed(() => `/src/assets/images/${props.product?.imageUrl}`);
</script>