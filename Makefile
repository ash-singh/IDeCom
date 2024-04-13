generate:
	@echo "generate declarations"
	dfx generate 

deloy:
	dfx deloy

local-fe:
	@echo "starting local frontend dev enironment"
	npm start
