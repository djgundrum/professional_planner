var assert = require("assert");
const server = require("../app");

let chai = require("chai");
let chaiHttp = require("chai-http");

let should = chai.should();

chai.use(chaiHttp);

describe("User routes", () => {
  describe("/POST logout", () => {
    it("it will logout current user", (done) => {
      chai
        .request(server)
        .post("/api/user/logout")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Event routes", () => {
  describe("/POST get all events", () => {
    it("it will get all events", (done) => {
      chai
        .request(server)
        .get("/api/events")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST add event", () => {
    it("it will create an event", (done) => {
      chai
        .request(server)
        .data({ name: "Justin's going away party", capacity: 15, duration: 5, schedule_id: 5, type: 1})
        .get("/api/events/create")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});