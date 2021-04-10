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
        .get("/logout")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
