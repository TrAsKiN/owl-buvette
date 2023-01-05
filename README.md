# OWL Buvette

A multiple player for the OWL viewing parties by Féfé

## Build the project in the development environment

### With Docker

#### Install dependencies and build

- `docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app node npm install`
- `docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app node npm run dev`

#### Create local container

- `docker run -dit --name owl-buvette -p 80:80 -v ${PWD}/docs:/usr/local/apache2/htdocs/ httpd:latest`

### Conventional method

- `npm install`
- `npm run dev`

Point your server to the `docs` folder as the public folder.

<!---
## Push `public` folder to GitHub pages

- `git subtree push --prefix public origin gh-pages`
--->
