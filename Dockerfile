# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

ENV PORT=3000

# Expose port
EXPOSE 3000

# Run prisma migrate and start app
CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma generate && npm run dev"]
