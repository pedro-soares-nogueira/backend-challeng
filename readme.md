### Step by step

```sh
https://github.com/pedro-soares-nogueira/backend-challeng.git
```

```sh
cd backend-challeng
```

```sh
npm install
```

#### Start docker

```sh
docker compose up -d
```

#### Start prisma (create migration)

```sh
npx prisma migrate dev
```

#### Start server

```sh
npm run start:dev
```
