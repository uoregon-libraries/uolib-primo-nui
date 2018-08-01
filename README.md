# Primo New UI Customization Docker Development Environment

## Prerequisites:

Ensure the latest versions of `docker` and `docker-compose` are installed.

## Usage:

### Setup

`views/UO` is our view code package. If you ever need to start fresh you can re-download it from the "back office", or acquire a fresh one from [here](https://github.com/ExLibrisGroup/primo-explore-package).

to add a view to the development environment, ensure that the line:
```yml
volumes:
  - /path/to/my/view/code/:/home/node/primo-explore-devenv/custom/NAME_OF_VIEW
```
appears in your `docker-compose.yml`, where the path on the left is the absolute path to your view code folder.

- To select a view, edit the `VIEW` property in `docker-compose.yml` to match the name you provided in the `volumes` stanza, e.g. `NAME_OF_VIEW`.
- To select a proxy server to view live primo results, edit the `PROXY` property in `docker-compose.yml`.

To start developing, open a terminal in this directory and run:
```sh
docker-compose up -d
```

- You can edit the files in your package's folder and changes will be made in real-time.
- You can observe the view using a browser at `localhost:8003/primo-explore/search?vid=NAME_OF_VIEW`.

### Changing views

First, ensure that the line:
```yml
volumes:
  - /path/to/my/other/view/:/home/node/primo-explore-devenv/custom/NAME_OF_OTHER_VIEW
```
appears in your `docker-compose.yml`, providing access to the new view.

To change the currently displayed view, edit the `VIEW` property in `docker-compose.yml`, open a terminal in the project directory, and run:
```sh
docker-compose restart
```

- Making changes to `VIEW` or `PROXY` will require the above restart command to take effect.
- You can add as many views as you like to the `volumes` stanza.
- You can add a central package by mounting it in the above manner and naming it `CENTRAL_PACKAGE`.

### Creating packages

First, make sure that the line:
```yml
volumes:
  - ./:/home/node/primo-explore-devenv/packages
```
appears in your `docker-compose.yml` file, so that packages will appear outside the container.

To create a package, open a terminal in this directory and run:
```sh
docker-compose run server gulp create-package
```
Select a package when prompted. the zip file will appear in this folder.
