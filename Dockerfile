# Gunakan Node.js sebagai base image
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Salin semua file dari project ke direktori kerja di container
COPY . .

# Jalankan Build aplikasi Next.js
RUN npm run build

# Ekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
