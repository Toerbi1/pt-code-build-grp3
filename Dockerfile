FROM node:26-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build
RUN npm prune --omit=dev

FROM gcr.io/distroless/nodejs22-debian13

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER nonroot

EXPOSE 3001

CMD ["dist/server.js"]