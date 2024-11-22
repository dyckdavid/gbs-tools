import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { forms } from '$lib/server/db/schema';

export async function POST({ request }) {
  try {
    const { title, googleFormEmbedLink, linkName, isPublic } = await request.json();

    if (!title || !googleFormEmbedLink || !linkName) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newForm = await db.insert(forms).values({
      createdAt: new Date(),
      title,
      googleFormEmbedLink,
      linkName,
      isPublic: isPublic ? 1 : 0, // Convert boolean to integer
    });

    return json({ message: 'Form created', form: newForm });
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
}
