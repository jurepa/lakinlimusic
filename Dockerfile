FROM caddy:alpine
RUN apk update && apk add nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN cp -r .vercel/output/* /srv/
COPY ./Caddyfile /etc/caddy/Caddyfile
