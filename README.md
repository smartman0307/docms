## docms: document-management-system
The system manages documents, users and userroles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

### Database
This has since moved to using a `postgres` DB. Install Postgres using `Homebrew` (https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql)

On cmd,
1. `psql`
2. `# CREATE DATABASE testdb;`
3. 
```
CREATE TABLE USERS(
   ID SERIAL PRIMARY KEY     NOT NULL,
   FIRST_NAME     TEXT    NOT NULL,
   LAST_NAME      TEXT    NOT NULL,
   USERNAME       TEXT    NOT NULL,
   EMAIL          TEXT    NOT NULL,
   PASSWORD       TEXT    NOT NULL,
   ROLE           TEXT    NOT NULL
); 
```
4.
```
CREATE TABLE DOCUMENTS(
   DOCUMENT_ID    INT     NOT NULL,
   OWNER_ID INT  REFERENCES USERS(ID),
   TITLE          TEXT    NOT NULL,
   CONTENT        CHAR(400)    NOT NULL,
   DATE_CREATED   DATE    NOT NULL,
   LAST_MODIFIED  DATE    NOT NULL,
   PRIMARY KEY (DOCUMENT_ID,OWNER_ID)
);
```
5. Test INSERT `INSERT INTO USERS (ID,FIRST_NAME,LAST_NAME,USERNAME,EMAIL,PASSWORD,ROLE) VALUES (1, 'Nate', 'Martin', 'n8e','godmetweenciati@gmail.com', 'Abcd123!', 'Administrator');`
6. `select * from users;`

### Running the Project
You'll require the `nodemon` node package which you can get by running `npm install nodemon --save` from your console. We use this module to run our `documentManager.js` file as follows `nodemon documentManager.js` on the terminal.

MongoDB needs to be installed on your local machine. Along with it, the `mongoose` node package is required. Install it by running `npm install mongoose --save` on your console. Once it is done, you'll need to run `mongod` from your console.

To run the tests, you'll require to install `jasmine-node`, as `npm install jasmine-node --save`. Once completed, the Spec file is executed by running `jasmine-node documentManagerSpec.js`.

There is a gulpfile to automate tasks for the project, you only need to run `mongod` and `gulp` on the console.

### Logging in through the Command-line

We use the built in `curl` application to make http requests and get responses.
To access the default page when at localhost, use
    `curl --verbose http://localhost:3000` or `curl --request  GET "http://localhost:3000"`
    This returns the default server response.

To login you user `natemmartin` password `12345`, use
    `curl --data "username=natemmartin&password=12345" http://localhost:3000/api/users/login`

This user needs to have signed up first. To do this for user called _Fred Quimby_ , use
    `curl --data "firstname=Fred&lastname=Quimby&username=fquimby&password=12345&role=User&email=fquimby@cartoons.net" http://localhost:3000/api/users`

curl --data “firstname=Jason&lastname=Bourne&username=jb&password=12345&role=admin&email=jbourne@ultimatum.gov" http://localhost:3000/api/users