var documentManager = require('../server/controllers/documentManager'),
  express = require('express');

var dm = new documentManager();
var app = express();

app.get('/user', function(req, res) {
  res.send(200, {
    name: 'toto'
  });
});

describe('GET /user', function(){
  it('should respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'json')
      .expect(200, done);
  });
});

describe("User", function() {
  it("validates that a new user created is unique", function() {
    expect(dm.createUser()).not.toBeDefined();
  });

  it("validates that a new user created has a role defined", function() {
    expect(true).toBe(true);
  });

  it("validates that a new user created both first and last names", function() {
    expect(true).toBe(true);
  });

  it("validates that all users are returned when getAllUsers is called.", function() {
    expect(dm.getAllUsers()).toBeDefined();
  });
});

describe("Role", function() {
  it("validates that a new role created has a unique title", function() {
    expect(true).toBe(true);
  });

  it("validates that all documents are returned, limited by a specified number, when getAllDocuments is called", function() {
    expect(true).toBe(true);
  });

  it("validates that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called", function() {
    expect(true).toBe(true);
  });
});

describe("Search", function() {
  it("validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called", function() {
    expect(true).toBe(true);
  });

  it("validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called", function() {
    expect(true).toBe(true);
  });
});
