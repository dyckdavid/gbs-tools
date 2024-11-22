<script lang="ts">
  import { page } from '$app/stores';
  import type { Form } from '$lib/types';

  
  const form = $page.data.form as Form | null;

  
  console.log('Received form in +page.svelte:', form);

  let errorMessage = '';

  $: if (!form) {
    errorMessage = 'Form not found or not public.';
  }
</script>

<div class="max-w-4xl mx-auto p-4">
{#if form}
  <h1 class="text-4xl font-bold mb-6 text-center">{form.title ?? 'Untitled Form'}</h1>
  <iframe
    class="rounded-lg h-screen"
    src={form.googleFormEmbedLink ?? ''}
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen
    title={form.title ?? 'Embedded Form'}
  ></iframe>
{:else}
  <p class="text-center text-gray-500">{errorMessage}</p>
{/if}
</div>
