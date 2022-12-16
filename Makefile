DOCKER_PHP_CONTAINER_NAME = web_app
DOCKER_NGIX_CONTAINER_NAME = app_nginx

STEP = "\\n\\r**************************************************\\n"

help:
	@echo " "
	@echo "-- install: install the project (to run the first time you wan to launch the project)";
	@echo "-- build : run after dockerfile or docker compose update";
	@echo "-- cli: enter PHP container CLI";
	@echo "-- cli-server: enter NGINX container CLI";
	@echo "-- up: start the project";
	@echo "-- stop: stop the project";
	@echo " "

build: stop
	@echo "$(STEP) Starting build containers... $(STEP)";
	@docker-compose build;
	@$(MAKE) up;

install:
	@echo "$(STEP) Starting build containers... $(STEP)";
	@docker-compose build;
	@$(MAKE) up;
	@echo "$(STEP) Starting build application... $(STEP)";
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) composer install;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) php bin/console make:migration;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) php bin/console doctrine:migrations:migrate;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) php bin/console cache:clear;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) npm install;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) gulp;
	@docker exec  -it $(DOCKER_PHP_CONTAINER_NAME) npx husky install;

cli:
	@echo "$(STEP) Entering bash CLI in $(DOCKER_PHP_CONTAINER_NAME)... $(STEP)";
	@docker exec -it $(DOCKER_PHP_CONTAINER_NAME) bash;

cli-server:
	@echo "$(STEP) Entering bash CLI in $(DOCKER_NGIX_CONTAINER_NAME)... $(STEP)";
	@docker exec -it $(DOCKER_NGIX_CONTAINER_NAME) bash;

up:
	@echo "$(STEP) Starting up containers... $(STEP)";
	@docker-compose up -d;
	@echo "$(STEP) Finished! $(STEP)";

stop:
	@echo "$(STEP) Stopping containers... $(STEP)";
	@docker-compose stop;
	@echo "$(STEP) Finished! $(STEP)";