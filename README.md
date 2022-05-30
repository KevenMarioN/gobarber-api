# API GoBarber


## Create docker

```bash
docker run --name db_post -e POSTGRES_PASSWORD=123456 -v $(pwd)/.data:/var/lib/postgresql/data -p 5432:5432 -d postgres
```