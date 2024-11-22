import { db } from '$lib/server/db';
import { forms } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import type { Form } from '$lib/types';

export async function load({ params }): Promise<{ form: Form | null }> {
  const { linkName } = params;

  try {
    console.log('Params object:', params);
    console.log('Received linkName:', linkName);

    const normalizedLinkName = linkName.trim().toLowerCase();
    console.log('Normalized linkName:', normalizedLinkName);

    const formResult = await db
      .select()
      .from(forms)
      .where(
        eq(
          sql`LOWER(${forms.linkName})`,
          normalizedLinkName
        )
      )
      .limit(1);

    console.log('Query result:', formResult);

    if (!formResult.length) {
      console.log('No form found for linkName:', normalizedLinkName);
      return { form: null };
    }

    const form = formResult[0];

    if (form.isPublic === 0) {
      console.log('Form is not public:', form);
      return { form: null };
    }

    const processedCreatedAt =
      typeof form.createdAt === 'number'
        ? form.createdAt
        : new Date(form.createdAt).getTime();

    const processedForm: Form = {
      id: form.id,
      title: form.title ?? 'Untitled',
      googleFormEmbedLink: form.googleFormEmbedLink ?? '',
      linkName: form.linkName ?? '',
      createdAt: processedCreatedAt,
      isPublic: form.isPublic ?? 0,
    };

    console.log('Returning processed form:', JSON.stringify(processedForm, null, 2));

    return { form: processedForm };
  } catch (error) {
    console.error('Error fetching form:', error);
    return { form: null };
  }
}
