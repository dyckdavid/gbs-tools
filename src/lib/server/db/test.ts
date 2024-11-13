import { db } from './index';
import * as table from './schema';

async function testDatabase() {
    // Insert a test user
    await db.insert(table.user).values({
        id: 'test-id',
        username: 'testuser',
        passwordHash: 'testhash',
        age: 25
    });

    // Retrieve users
    const users = await db.select().from(table.user).execute();
    console.log('Users in the database:', users);
}

testDatabase().catch(console.error);