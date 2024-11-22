<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let title = '';
	let googleFormEmbedLink = '';
	let linkName = '';
	let isPublic = false;
	let message = '';

	async function addForm() {
		message = '';
		try {
			const response = await fetch('/api/forms', {
				method: 'Post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					googleFormEmbedLink,
					linkName,
					isPublic,
				}),
			});

			const result = await response.json();
			if (response.ok) {
				message = 'Form added succesfuly!';
				title = '';
				googleFormEmbedLink = '';
				linkName = '';
				isPublic = false;
			} else {
				message = `Error: ${result.error}`;
			}
		} catch (error) {
			message = `Error`;
		}
	}

	let { data }: { data: PageServerData } = $props();
</script>

<h1 class='text-2xl font-bold p-2'>Hi, {data.user.username}!</h1>
<p class='text-lg p-2'>Your user ID is {data.user.id}.</p>
<form method='post' action='?/logout' use:enhance>
	<button class='bg-red-500 text-white p-2 rounded-md absolute top-2 right-2'>Sign out</button>
</form>

<h1 class="text-center">Add a New Form</h1>
  
<form on:submit|preventDefault={addForm}>
  <div>
	<label for="title">Title:</label>
	<input
	  id="title"
	  bind:value={title}
	  type="text"
	  placeholder="Form Title"
	  required
	/>
  </div>

  <div>
	<label for="googleFormEmbedLink">Google Form Embed Link:</label>
	<input
	  id="googleFormEmbedLink"
	  bind:value={googleFormEmbedLink}
	  type="url"
	  placeholder="https://docs.google.com/forms..."
	  required
	/>
  </div>

  <div>
	<label for="linkName">Link Name:</label>
	<input
	  id="linkName"
	  bind:value={linkName}
	  type="text"
	  placeholder="URL-friendly name"
	  required
	/>
  </div>

  <div>
	<label for="isPublic">Public:</label>
	<input id="isPublic" bind:checked={isPublic} type="checkbox" />
  </div>

  <button type="submit">Add Form</button>
</form>

{#if message}
  <p>{message}</p>
{/if}

<style>
  form {
	max-width: 400px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
  }

  label {
	font-weight: bold;
  }

  input {
	padding: 5px;
	font-size: 1rem;
  }

  button {
	padding: 10px;
	background: #007bff;
	color: white;
	border: none;
	cursor: pointer;
  }

  button:hover {
	background: #0056b3;
  }

  p {
	margin-top: 10px;
	color: green;
  }
</style>
