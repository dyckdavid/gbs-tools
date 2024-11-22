<script lang="ts">
  interface Form {
    id: number;
    title: string;
    googleFormEmbedLink: string;
    linkName: string;
    createdAt: number;
    isPublic: number;
  }

  // Define the default form
  const defaultForm: Form = {
    id: 1,
    title: 'Direct Test Form',
    googleFormEmbedLink: 'https://example.com',
    linkName: 'direct-test',
    createdAt: Date.now(),
    isPublic: 1,
  };

  // Export 'form' without a default value
  export let form: Form | undefined;

  // Assign defaultForm if 'form' is undefined
  if (!form) {
    form = defaultForm;
  }

  console.log('Form received in +page.svelte:', form);
</script>

{#if form}
  <h1>{form.title}</h1>
  <iframe
    src={form.googleFormEmbedLink}
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen
    title={form.title}
  ></iframe>
{:else}
  <p>Form not found.</p>
{/if}
