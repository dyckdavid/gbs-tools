// +page.js or +page.server.js
export async function load({ fetch }) {
  const response = await fetch('/api/form');
  if (response.ok) {
    const form = await response.json();
    return { form };
  } else {
    // Handle the error or return a default form
    return {
      form: {
        id: 1,
        title: 'Default Form',
        googleFormEmbedLink: 'https://example.com',
        linkName: 'default',
        createdAt: Date.now(),
        isPublic: 1,
      }
    };
  }
}
