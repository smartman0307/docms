## docms: document-management-system
The system manages documents, users and userroles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

### Database
The system is developed using `mongoose` an ODM for node.

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