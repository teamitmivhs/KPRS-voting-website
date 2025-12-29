# --- Stage 1: Build Frontend ---
FROM node:24-alpine AS build-stage
WORKDIR /kprs/src/frontend

# Copy dependency files first to leverage Docker caching
COPY package*.json ./
RUN npm ci

# Copy the rest of your source code
COPY . .

# Run the Vite build command
RUN npm run build

# --- Stage 2: Production Server ---
FROM node:24-alpine AS production-stage
WORKDIR /kprs/src/frontend

# Only install production-specific dependencies (Express, Compression, etc.)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy only the built 'dist' folder from the first stage
COPY --from=build-stage /kprs/src/frontend/dist ./dist

# Copy your Express server file
COPY server.js ./

# Set environment variables
ENV NODE_ENV=production

# Expose the port your Express app listens on
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]
