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

<!--

{
	[
        "name": "John Doe",
        "governmentId": 11111111111,
        "email": "johndoe@kanastra.com.br",
        "debtAmount": 1000000.0,
        "debtDueDate": "2022-10-12",
        "debtID": "12,1adb6ccf-ff16-467f-bea7-5f05d494280f"
    ],
    [
        "name": "John Doe 2",
        "governmentId": 2222222222,
        "email": "johndoe2@kanastra.com.br",
        "debtAmount": 2000000.0,
        "debtDueDate": "2022-10-22",
        "debtID": "15,1adb6ccf-ff16-467f-bea7-5f05d494280f"
    ]
}

-->
