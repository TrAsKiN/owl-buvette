# OWL Buvette

A multiple player for the OWL viewing parties by Féfé

## Local Docker container

- `docker run -dit --name owl-buvette -p 80:80 -v ${PWD}/docs:/usr/local/apache2/htdocs/ httpd:latest`
- http://localhost/

## Build with Docker

- `docker run -it --rm -v ${PWD}:/usr/src/app -w /usr/src/app node npm run build`

<!---
## Push `public` folder to GitHub pages

- `git subtree push --prefix public origin gh-pages`
--->
