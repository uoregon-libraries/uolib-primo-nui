# UO Primo New UI

## Setup

Copy `docker-compose.override-example.yml` to `docker-compose.override.yml` and
tweak as needed.  If copied as-is, the proxy app will be reachable at
`http://127.0.0.1/primo-explore/search?vid=UO` and the `custom` directory will
be mounted into the running container for real-time changes.

`custom/UO` is our view code package. If you ever need to start fresh you can
re-download it from the "back office", or acquire a fresh one from
[here](https://github.com/ExLibrisGroup/primo-explore-package).

## Views

Everything in `custom` is build into the docker image, and if the override was
copied as-is, it's mounted in the container for real-time changes.  But views
are weird: you have to explicitly choose the view by overriding the environment
variable in `docker-compose.override.yml`, e.g.:

```yaml
    environment:
      - VIEW=UO_TEST
```

Then you have to change the view in your URL, e.g.,
`http://127.0.0.1/primo-explore/search?vid=UO_TEST`.

## Development

On your first run, build the docker images: `docker-compose build`.  If you
didn't opt to mount `custom` into the image via the override file, you'll have
to rebuild the image whenever you change code.

To run the server, just start up the stack: `docker-compose up -d`.

Any time you change `custom/UO/package.json`, you will need to restart the
container so the npm modules are installed:

```sh
docker-compose down
docker-compose up -d
```

You can edit the other files in your package's folder and changes will be made
in real-time if you copied the override file as-is, or on an image rebuild.

### Creating deploy packages

```sh
docker-compose run --rm server gulp create-package
```

Select a package when prompted (typically this will be UO), and you'll have a
new zip file in your local `packages` directory.
