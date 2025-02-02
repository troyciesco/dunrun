# Make sure 'boot' is not interpreted as a file/folder name
.PHONY: boot

bootall:
	@echo "Starting servers... (Press Ctrl+C to stop)"
	# Use a shell trap so that Ctrl+C kills all processes
	# 'wait' will wait for all child processes to finish
	@trap "kill 0" SIGINT; \
	  (cd ./_mock-server && bun dev) & \
	  (cd ./control-plane && bun dev) & \
	  (cd ./takhisis && php artisan --port=1112) & \
	  (cd ./withers && uv run manage.py runserver 1113) & \
	  (cd ./ui && bun dev) & \
	  wait
