# testapp101686

Mala Node.js aplikace (Express) pripravena pro deployment na Azure App Service.

## Lokalne spusteni

```bash
npm install
npm start
```

Aplikace bezi na `http://localhost:3000`.

Endpointy:
- `GET /` - uvodni zprava
- `GET /health` - health check

## Deployment na Azure (App Service)

### 1) Prihlaseni a priprava promennych

```bash
az login
az account set --subscription "<SUBSCRIPTION_ID_NEBO_NAME>"

RESOURCE_GROUP="rg-testapp101686"
LOCATION="westeurope"
APP_NAME="testapp101686-$RANDOM"
```

### 2) Vytvoreni resource group a App Service planu

```bash
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"

az appservice plan create \
	--name "plan-testapp101686" \
	--resource-group "$RESOURCE_GROUP" \
	--sku B1 \
	--is-linux
```

### 3) Vytvoreni web app pro Node.js 20

```bash
az webapp create \
	--resource-group "$RESOURCE_GROUP" \
	--plan "plan-testapp101686" \
	--name "$APP_NAME" \
	--runtime "NODE|20-lts"
```

### 4) Deploy kodu z aktualniho adresare

```bash
zip -r app.zip . -x "node_modules/*" ".git/*"

az webapp deploy \
	--resource-group "$RESOURCE_GROUP" \
	--name "$APP_NAME" \
	--src-path app.zip \
	--type zip
```

### 5) Otevreni aplikace

```bash
az webapp browse --resource-group "$RESOURCE_GROUP" --name "$APP_NAME"
```

Volitelne logy:

```bash
az webapp log tail --resource-group "$RESOURCE_GROUP" --name "$APP_NAME"
```