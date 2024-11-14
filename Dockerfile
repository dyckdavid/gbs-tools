
ARG NODE_VERSION=22.8.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="SvelteKit"

# SvelteKit app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

RUN apt-get update && apt-get install -y fuse3 openssl sqlite3 ca-certificates

# Install pnpm
ARG PNPM_VERSION=8.15.4
RUN npm install -g pnpm@$PNPM_VERSION

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy package files
COPY package.json pnpm-lock.yaml ./
# Copy .npmrc only if it exists
COPY .npmrc .npmrc

# Install node modules
RUN pnpm install --prod=false

# Copy application code
COPY . .

# Build application
RUN DATABASE_URL=":memory:" pnpm run build

# Remove development dependencies
RUN pnpm prune --prod

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app
COPY --from=build /app/drizzle.config.ts /app
COPY --from=build /app/drizzle /app/drizzle
COPY --from=build /app/deploy.sh /app
# Copy the schema file and its directory structure
COPY --from=build /app/src/lib/server/db /app/src/lib/server/db

RUN mkdir -p /app/data

# Fix permissions on the copied script
RUN chmod +x /app/deploy.sh

VOLUME /app/data

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV DATABASE_URL="/app/data/sqlite.db"

# Start the server
CMD ["/app/deploy.sh"]
