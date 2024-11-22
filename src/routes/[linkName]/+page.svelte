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


{#if form}
  <h1>{form.title ?? 'Untitled Form'}</h1>
  <iframe
    src={form.googleFormEmbedLink ?? ''}
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen
    title={form.title ?? 'Embedded Form'}
  ></iframe>
{:else}
  <p>{errorMessage}</p>
{/if}
