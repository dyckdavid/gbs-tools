#!/bin/sh
npx drizzle-kit migrate
pnpm drizzle-kit generate
pnpm drizzle-kit up
node ./build/index.js