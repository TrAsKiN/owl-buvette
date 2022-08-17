# OWL Buvette

A multiple player for the OWL viewing parties by Féfé

## Local Docker container

- `docker run -dit --name owl-buvette -p 80:80 -v ${PWD}:/usr/local/apache2/htdocs/ httpd:latest`
- http://localhost/public/

## Push `public` folder to GitHub pages

- `git subtree push --prefix public origin gh-pages`
