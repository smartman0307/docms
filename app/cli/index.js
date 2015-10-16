var vorpal = require('vorpal')(),
  inquirer = require("inquirer"),
  prompt = require('prompt'),
  request = require('superagent');
  User = require('../../server/models/users');

prompt.start();

var authToken, userId;

vorpal
  .command('login', "Logs in an existing user")
  .action(function(args, callback) {
    prompt.get(['username', 'password'], function(err, result) {
      if (err) {
        return onErr(err);
      }
      // console.log(result);
      request
        .post('http://localhost:3000/api/users/login')
        .send(result)
        .end(function(err, res) {
          if (!err) {
            console.log("You have successfully logged in.");
            authToken = res.body.token;
            userId = res.body.id;
            callback();
          } else {
            console.log("There was a problem logging you in.\n" + '\n' + res.body.message);
            callback();
          }
        });
    });
  });

vorpal
  .command('signup', "Signs up a new user")
  .action(function(args, callback) {
    prompt.get(['firstname', 'lastname', 'username', 'password', 'email', 'role'], function(err, result) {
      if (err) {
        return onErr(err);
      }
      request
        .post('http://localhost:3000/api/users')
        .send(result)
        .end(function(err, res) {
          if (!err) {
            console.log("You have successfully signed up.");
            callback();
          } else {
            console.log("There was a problem signing you up.\n" + '\n' + res.body.message);
            callback();
          }
        });
    });
  });

vorpal
  .command('all-users', "Gets all the users in database")
  .action(function(args, callback) {
    request
      .get('http://localhost:3000/api/users')
      .end(function(err, res) {
        if (!err) {
          console.log("All Users: \n" + JSON.stringify(res.body));
          callback();
        } else {
          console.log("Error" + res.body.message);
          callback();
        }
      });
  });


vorpal
  .command('all-documents', "Gets all the documents in database")
  .action(function(args, callback) {
    request
      .get('http://localhost:3000/api/documents')
      .set('x-access-token', authToken)
      .end(function(err, res) {
        if (!err) {
          console.log("All Documents: \n" + JSON.stringify(res.body));
          callback();
        } else {
          console.log("Error" + res.body.message);
          callback();
        }
      });
  });


vorpal
  .command('write-document', "Add a new document")
  .action(function(args, callback) {
    prompt.get(['title', 'content'], function(err, result) {
      result.ownerId = userId;
      if (err) {
        return onErr(err);
      }
      request
        .post('http://localhost:3000/api/documents')
        .set('x-access-token', authToken)
        .send(result)
        .end(function(err, res) {
          if (!err) {
            console.log("Document Saved!");
            callback();
          } else {
            console.log("Error:\n" + '\n' + res.body.message);
            callback();
          }
        });
    });
  });

vorpal
  .command('logout', "Logs out current user")
  .action(function(args, callback) {
    request
      .get('http://localhost:3000/api/users/logout')
      .set('x-access-token', authToken)
      .end(function(err, res) {
        if (!err) {
          authToken = '';
          console.log("You have logged out of docms.");
          callback();
        } else {
          console.log("Error" + res.body.message);
          callback();
        }
      });
  });

vorpal
  .delimiter('docms$'.red)
  .show();
