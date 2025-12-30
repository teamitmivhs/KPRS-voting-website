FROM redis:7

# Capture args that came from docker compose that came from env
ARG REDIS_BIND
ARG REDIS_PASS
ARG REDIS_PORT

ENV REDIS_BIND=${REDIS_BIND}
ENV REDIS_PASS=${REDIS_PASS}
ENV REDIS_PORT=${REDIS_PORT}

# Update packages and install gettext-base to use envsubst
RUN apt update && apt install -y gettext-base \
        && rm -rf /var/lib/apt/lists/*

# Copy the redis configuration file
COPY redis.conf.template /redis.conf.template

# Use envsubst to substitute environment variable to redis.conf and then use it to run redis
CMD sh -c "envsubst < /redis.conf.template > /redis.conf && exec redis-server /redis.conf"
