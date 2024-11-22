import { db } from '$lib/server/db';
import { forms } from '$lib/server/db/schema';

async function addForm() {
  try {
    await db.insert(forms).values({
      title: 'Dynamic Test Form',
      googleFormEmbedLink: 'https://docs.google.com/forms/d/e/test-form/viewform',
      linkName: 'dynamic-test',
      createdAt: new Date(), // Use a Date object instead of a number
      isPublic: 1, // 1 for true (public)
    });

    console.log('Form added successfully!');
  } catch (error) {
    console.error('Error inserting form:', error);
  }
}

// Execute the script
addForm();
