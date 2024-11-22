<script lang="ts">
  import { page } from '$app/stores';
  import type { Form } from '$lib/types';

  
  const form = $page.data.form as Form | null;

  
  // console.log('Received form in +page.svelte:', form);

  let errorMessage = '';

  $: if (!form) {
    errorMessage = 'Form not found or not public.';
  }
</script>

<svelte:head>
	<title>{form?.title ?? ''}</title>
	<meta name="description" content="GBS" />
	<link rel="manifest" href="/manifest.json">
</svelte:head>

<div class="max-w-4xl mx-auto p-4">
{#if form}

  <h1 class="text-2xl font-bold mb-6 text-center">{form.title ?? 'Untitled Form'}</h1>
  <iframe
    class="rounded-lg h-screen static pb-4"
    src={form.googleFormEmbedLink ?? ''}
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen
    title={form.title ?? 'Embedded Form'}
  ></iframe>
  <br>
{:else}
  <p class="text-center text-gray-500">{errorMessage}</p>
{/if}
</div>
