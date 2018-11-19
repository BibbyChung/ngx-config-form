workspace-up:
	docker run --rm -it --name ncf-workspace -v $(PWD)/../:/app -w /app -p 4300:4200 teracy/angular-cli bash
workspace-exec:
	docker exec -it ncf-workspace bash