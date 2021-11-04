<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">Auction App</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-yellow-600 focus:ring focus:ring-opacity-40 focus:ring-yellow-500"
            v-model="username"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-yellow-600 focus:ring focus:ring-opacity-40 focus:ring-yellow-500"
            v-model="password"
          />
        </label>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-yellow-600 rounded-md focus:outline-none hover:bg-yellow-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("user1");
const password = ref("user2");

function login() {
  //Save token to localStorage
  //Dummy Login
  const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxI';
  localStorage.setItem('auction.token', authToken);
  
  router.push("/");
}
</script>
