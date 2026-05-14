# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=20.14.0

# ---- Base ----
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- Deps (cache) ----
FROM base AS deps
COPY package.json package-lock.json* ./
# ⬇️ no scripts here (scripts/ not copied yet)
RUN npm ci --ignore-scripts

# ---- Build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# ⬇️ scripts/ now exists, so run the generator (CJS) and then build
RUN node scripts/gen-sgds-ambient.cjs && npm run build

# ---- Runner (standalone) ----
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# server + minimal node_modules
COPY --from=build /app/.next/standalone ./
# static assets for /_next/static/*
COPY --from=build /app/.next/static ./.next/static
# public assets
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
