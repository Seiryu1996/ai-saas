FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]