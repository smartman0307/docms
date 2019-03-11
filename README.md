# docms

The system manages documents, users and userroles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.


### Database

#### On Docker
This has since moved to using a `postgres` DB. We are using the postgres docker image. If you'd like to use this locally. Checkout the section on running this locally.

We set the database environment in the [environment section](https://github.com/n8e/docms/blob/master/docker-compose.yml#L13). This creates a database named `'docms_development'` that has a role named `'docker'` with the same password. See more on Docker Environment [here](https://docs.docker.com/samples/library/postgres/).

On running `npm start`, the prestart script in package.json is triggered first. This script uses [sequelize-cli](https://github.com/sequelize/cli) to perform migrations (We are using `Sequelize` as the ORM with Postgres). For this project, we have a `./.sequelizerc` that instructs sequelize-cli on where the directories and config files should be located. The models and migrations directories are generated using the `./node_modules/.bin/sequelize init` command. This comes with the `./server/models/index.js` file. See [this article](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#toc-sequelize-setup) to read more on this setup.

Note: Because we are using the postgres image which creates a database and role based on the given environment variables, we need the sequelize config to reflect those variable values. These are found [here](https://github.com/n8e/docms/blob/master/server/config/config.json#L2). We have already seen the database, username and password from the docker-compose config. We need to change the `"host"` value, which defaults to `"127.0.0.1"`, to the same name as the database service in the `docker-compose.yml` file.

#### Running locally
Install Postgres using `Homebrew` (https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql)
On command-line, run `psql` and create the database in subsequent psql session:
```
CREATE DATABASE docms_development;
```
On the `./server/config/config.json` file, change the `"username"` and `"password"` fields under `"development"` environment to value `null`. The host needs to be a localhost value e.g `"127.0.0.1"`.

Run `npm start`.


### Running the Project
The express API is conteinerised using Docker (See the `./Dockerfile`). Run the project using `docker-compose up` command.
