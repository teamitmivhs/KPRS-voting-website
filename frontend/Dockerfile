# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS build-stage
WORKDIR /kprs/src/frontend

# Copy dependency files first to leverage Docker caching
COPY package*.json ./
RUN npm ci

# Copy the rest of your source code
COPY . .

# Run the Vite build command
RUN npm run build

# --- Stage 2: Production Server ---
FROM nginx:alpine AS production-stage

# Copy only the built 'dist' folder from the first stage
COPY --from=build-stage /kprs/src/frontend/dist /usr/share/nginx/html

# Copy your Express server file
COPY nginx.conf /etc/nginx/nginx.conf
