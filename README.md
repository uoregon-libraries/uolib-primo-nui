# UO Primo New UI

## Setup

Copy `docker-compose.override-example.yml` to `docker-compose.override.yml` and
tweak as needed.  If copied as-is, the proxy app will be reachable at
`http://localhost:8003/discovery/search?vid=01ALLIANCE_UO:UO` and the `custom`
directory will be mounted into the running container for real-time changes.

`custom/01ALLIANCE_UO-UO` is our view code package. If you ever need to start
fresh you can re-download it from the "back office", or acquire a fresh one
from [here](https://github.com/ExLibrisGroup/primo-explore-package).

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
`http://localhost:8003/discovery/search?vid=01ALLIANCE_UO:UOTEST`.

Note that this isn't a "sticky" parameterIn the JavaScript we embed links and
we hard-code the view because links have to include that `vid` parameter.
You'll have to watch (and possibly re-hack) your URL if you're trying to test a
different view and you start clicking around.

## Alerts

When something critical happens and a Primo-wide alert is needed, copy
`alert.js` to `custom/01ALLIANCE_UO-UO/js/99alert.js` and change the example text copied from
COVID messaging so it's a realistic example.

Keep the `<aside>` and `<div>` elements intact, just change the text so that
styles continue to work.

When the alert period is over, delete that file.

## Development

On your first run, build the docker images: `docker-compose build`.  If you
didn't opt to mount `custom` into the image via the override file, you'll have
to rebuild the image whenever you change code.

To run the server, just start up the stack: `docker-compose up -d server`.

Any time you change `custom/01ALLIANCE_UO-UO/package.json`, you will need to
restart the container so the npm modules are installed:

```sh
docker-compose down
docker-compose up -d server
```

You can edit the other files in your package's folder and changes will be made
in real-time if you copied the override file as-is, or on an image rebuild.

### Central Package

You should regularly update the central package files, otherwise customizations
which would work in production will appear to be broken in dev. A simple script
has been added to do this: `sync-central.sh`.

This script deletes and then replaces the central package files with the latest
from the alliance's github repo.

### Creating deploy packages

Make sure your working directory is *pristine*, or things can get annoying /
weird / broken. Make sure everything is checked in, then clean aggressively:

```sh
docker-compose down -v

# Review the list of things git would clean to decide what you actually MUST
# keep, like the docker compose override
git clean -xfdn
```

Then rebuild the image and run the package tool:

```sh
docker-compose build
docker-compose run --rm server gulp create-package
```

Select a package when prompted (typically this will be `01ALLIANCE_UO-UO`), and
you'll have a new zip file in your local `packages` directory.

## Codeshift

To run jscodeshift, simply build the image (e.g., `docker-compose build
codeshift`) and then run that image (e.g., `docker-compose run --rm
codeshift`). It's set up to replace all the JS files in our custom dir.
