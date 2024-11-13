<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<form method='post' action='?/login' use:enhance class='flex flex-col gap-2'>
	<label class='flex flex-col gap-2'>
		Username
		<input name='username' />
	</label>
	<label class='flex flex-col gap-2'>
		Password
		<input type='password' name='password' />
	</label>
	<button class='bg-blue-500 text-white p-2 rounded-md'>Login</button>
	<button formaction='?/register' class='bg-green-500 text-white p-2 rounded-md'>Register</button>
</form>
<p style='color: red'>{form?.message ?? ''}</p>
