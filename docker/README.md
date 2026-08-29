## Docker Development Commands:

```sh
# build
npm run docker:build
# setup
npm run docker:run-setup
# run
npm run docker:run
# run w/ env
docker compose -f docker/docker-compose.yml run --rm --service-ports -e LOG_LEVEL=3 mirakurun
# up
npm run docker:up
# down
npm run docker:down
# logs
npm run docker:logs
# bash
npm run docker:bash
```

## PT3 character devices with recpt1

`Dockerfile.recpt1` builds pinned versions of libarib25 and recpt1 on top of
the same Node.js image used by the standard Mirakurun image.
`docker-compose.pt3.yml` is a standalone Compose configuration for hosts that
expose PT3 character devices as `/dev/pt3video*` and use the host pcscd.

Review the `devices` list and remove entries that do not exist on the host.
The host must provide `/var/run/pcscd/pcscd.comm`.
Tuner commands must invoke recpt1 with `--b25` when encrypted broadcasts need
to be decoded.

```sh
cp docker/pt3.env.example .env

docker compose -f docker/docker-compose.pt3.yml build --pull mirakurun
docker compose -f docker/docker-compose.pt3.yml up -d mirakurun
```

The bind-mounted configuration and EPG data are stored under `docker/config`
and `docker/data`. Back them up before replacing an existing container.

```sh
docker compose -f docker/docker-compose.pt3.yml stop mirakurun
tar -C docker -czf mirakurun-backup.tar.gz config data opt
```
