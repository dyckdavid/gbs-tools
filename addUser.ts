// addUser.js
import { db } from './src/lib/server/db/index.ts'; // Adjust path if needed
import { user } from './src/lib/server/db/schema.ts';
import bcrypt from 'bcrypt';

async function addUser(username, password) {
  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert the user into the database
  await db.insert(user).values({
    id: crypto.randomUUID(), // Generate a unique ID
    username,
    passwordHash,
  }).execute();

  console.log(`User ${username} added successfully!`);
}

// Capture command-line arguments
const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error("Usage: node addUser.js <username> <password>");
  process.exit(1);
}

addUser(username, password)
  .catch((error) => {
    console.error("Error adding user:", error);
    process.exit(1);
  });
