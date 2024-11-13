<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<h1 class='text-2xl font-bold p-2'>Hi, {data.user.username}!</h1>
<p class='text-lg p-2'>Your user ID is {data.user.id}.</p>
<form method='post' action='?/logout' use:enhance>
	<button class='bg-red-500 text-white p-2 rounded-md absolute top-2 right-2'>Sign out</button>
</form>
