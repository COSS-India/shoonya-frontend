# Dev server (react-scripts). Use `npm run build` + static hosting for production.
FROM node:18-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# CRA treats CI=true as "fail on warnings"; Docker sets CI often — keep dev server usable.
ENV CI=false \
    HOST=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
