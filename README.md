# OWL Buvette

[![Build and Deploy](https://github.com/TrAsKiN/owl-buvette/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/TrAsKiN/owl-buvette/actions/workflows/build-and-deploy.yml)

A multi-player for OWL viewing parties originally by Féfé

**NEW!** You can change the host of the OWL Buvette by adding `#host=<channel name>` (i.e.: https://traskin.github.io/owl-buvette/#host=traskin)

## Build the project in the development environment

### With Docker

#### Install dependencies and build

- `docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app node npm install`
- `docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app node npm run dev`

#### Create local container

- `docker run -dit --name owl-buvette -p 80:80 -v ${PWD}/public:/usr/local/apache2/htdocs/ httpd:latest`

### Conventional method

- `npm install`
- `npm run dev-server`
