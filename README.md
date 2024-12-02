# delete-reddit-history [Archived]

> Why this repo is archived ? 
> 
> Because Reddit stores locally it's history. So an API request can't delete it and Apple doesn't allow to access to the files of the app. So this project is useless.

A docker container which deletes your reddit history every X hours.

Copier du pc vers le serveur :

```bash
scp -r /home/$(whoami)/github/delete-reddit-history/* ubuntu@192.168.0.1:/home/ubuntu/delete-reddit-history/
```

Build :

```bash
docker build -t delete-reddit-history . && docker run --name reddit -d --restart=always delete-reddit-history
```
