.PHONY: up down web

up:
	docker compose up

down:
	docker compose down

web:
	docker compose exec nextjs ash


