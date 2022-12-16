# Symfony Kit Starter

> This project help you to start quickly your symfony 6 project without worrying about development environment.

This Kit Starter is mix of many tools that help you start quickly and ensure thant your code respect good practices.

Tools install and configure

* DOCKER 
* PHP 8
* MySQL 8
* NGINX
* NPM, NPX
* PHP-CS-FIXER
* PHPUNIT
* ESLINT
* HUSKY
* COMMITLINT
* LINT-STAGE
* PRETTIER
* BITBUCKET PIPELINE
* ETC.

## Install

**Make sure you have install docker and git 2 on your local machine**

```bash
# Clone our repository
$ git clone url <your project directory>
# Change directory to our repo
$ cd <your project directory>
# Reset git
$ rm -rf .git
$ git init
# Check if docker environnement variables in .env match with your needs
APP_PORT=8089
DB_PORT=3037
DB_USER=root
DB_PWD=toor
DB_NAME=kit-starter-symfony
MYSQL_ADMIN_PORT=8090
# start the project
$ make install
```
## Test and enjoy!

**go to:**

* [http://localhost:8089](http://localhost:8089) for symfony app
* [http://localhost:8090](http://localhost:8090) for phpmyadmin

## Commands List

```bash
$ make help
```
## Contributing
[https://www.kinshasadigital.com/](https://www.kinshasadigital.com/)
## Licence
MIT