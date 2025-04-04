lint-frontend:
	make -C frontend lint

install:
	npm install
	cd frontend && npm install


start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	make -C frontend build