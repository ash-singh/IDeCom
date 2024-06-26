generate:
	@echo "generate declarations"
	dfx generate

deloy:
	dfx deloy

local-fe:
	@echo "starting local frontend dev enironment"
	npm start

dfx-start:
	dfx start --background --clean

deploy-ic:
	dfx deploy --network ic

undeploy-ic:
	dfx canister stop --all --network ic
