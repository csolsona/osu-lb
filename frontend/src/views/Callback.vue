<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	onMounted(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (code) {
			try {
				const response = await fetch('/api/token', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ code }),
				});

				const { access_token } = await response.json();

				localStorage.setItem('osu_token', access_token);

				router.push('/');
			} catch (err) {
				console.error('Error exchanging the code:', err);
			}
		}
	});
</script>

<template>
	<div>Processing authentication with osu!...</div>
</template>
