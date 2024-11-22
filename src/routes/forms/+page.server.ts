import { db } from '$lib/server/db';
import { forms } from '$lib/server/db/schema';
import type { Form } from '$lib/types';

export async function load(): Promise<{ forms: Form[] }> {
  try {
    const allForms = await db.select().from(forms);

    const formsWithCorrectTypes = allForms.map(form => ({
      ...form,
      createdAt: form.createdAt instanceof Date ? form.createdAt.getTime() : form.createdAt, // Ensure createdAt is a number
    })) as Form[];

    return { forms: formsWithCorrectTypes };
  } catch (error) {
    console.error('Error fetching forms:', error);
    return { forms: [] }; // Return an empty array on error
  }
}
