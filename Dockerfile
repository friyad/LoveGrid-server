# Stage: install dependencies
FROM node:24-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install


# Stage: build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json .

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# Final stage
FROM node:24-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

RUN rm -rf /app/node_modules/.cache

USER node

EXPOSE 5000

CMD ["node", "build/index.js"]