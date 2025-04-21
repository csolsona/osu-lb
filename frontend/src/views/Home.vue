<script setup lang="ts">
	import { ref, onMounted, onBeforeMount } from 'vue';
	import * as osu from 'osu-api-v2-js';

	const user = ref<osu.User | null>(null);

	async function isLogged() {
		const res = await fetch('/api/me');
		const data = await res.json();
		// user.value = data;
		// console.log(data);
		return data;
	}

	async function login() {
		const res = await fetch('/api/authorization-url');
		const data = await res.json();

		window.location.href = data.url;
	}

	async function me() {
		const res = await fetch('/api/me');
		const data = await res.json();

		console.log(data);
	}

	onBeforeMount(async () => {
		user.value = await isLogged();
	});

	onMounted(() => {
		const urlParams = new URLSearchParams(window.location.search);
	});
</script>

<template>
	<h1>osu!lb</h1>
	<button @click="login">Login</button>
	<button @click="me">Me</button>
	<!-- maybe change it to <a>? -->
	<p v-if="user">Welcome, {{ user.username }}</p>
	<p v-else="">User not logged</p>
</template>
