First run:
```
mv .env.sample .env
docker compose up -d
```

To see tests:
```
docker compose logs -f --tail 100 test
or 
docker compose run --rm test npm test
```

API would be available at localhost:3000.