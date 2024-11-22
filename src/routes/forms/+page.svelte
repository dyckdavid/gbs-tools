<script lang="ts">
  import { page } from '$app/stores';
  import type { Form } from '$lib/types';

  
  const forms = $page.data.forms as Form[] || [];

  
  // console.log('Received forms in +page.svelte:', forms);

  let publicForms = forms.filter((form) => form.isPublic === 1);

  forms.forEach((form) => {
  // console.log(`Form ID: ${form.id}, isPublic: ${form.isPublic}, Type: ${typeof form.isPublic}`);
});

</script>

<h1 class="text-3xl font-bold  pl-4">Forms</h1>
{#if publicForms.length === 0}
  <p class="text-gray-500 pl-4 pr-4">No public forms available.</p>
{:else}
  <ul class="p-4 space-y-0">
    {#each publicForms as form, index (form.id)}
      <li class={`p-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
        <a class="text-blue-600 hover:underline" href={`/forms/${form.linkName || ''}`}>
          {form.title || 'Untitled Form'}
        </a>
      </li>
    {/each}
  </ul>
{/if}