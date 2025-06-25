# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./index.html ./
COPY ./postcss.config.js ./
COPY ./tailwind.config.js ./
COPY ./vite.config.ts ./
COPY ./tsconfig.json ./
COPY ./tsconfig.app.json ./
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .

# Stage 3: Production image
FROM node:20-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/server ./server

# Copy frontend build
COPY --from=frontend-build /app/dist ./server/public

# Set environment variables (can be overridden)
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend port
EXPOSE 5000

# Start backend (serves API and static frontend)
CMD ["node", "server/server.js"] 