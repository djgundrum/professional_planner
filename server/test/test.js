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
  describe("/GET user by email", () => {
    it("it will return a user given an email", (done) => {
      chai
        .request(server)
        .get("/api/user/email/declan.gundrum.17@gmail.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST forgot_password", () => {
    it("functionality to send user email given they forgot their password", (done) => {
      chai
        .request(server)
        .post("/api/user/forgot_password")
        .send({ email: "declan.gundrum.17@gmail.com" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST forgot_password_update", () => {
    it("api that resets the password given the correct user hash", (done) => {
      chai
        .request(server)
        .post("/api/user/forgot_password_update")
        .send({ hash: "declan.gundrum.17@gmail.com", password: "Redrider1" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST update preference for user", () => {
    it("api that resets the password given the correct user hash", (done) => {
      chai
        .request(server)
        .post("/api/user/update_preference")
        .send({ category: "Theme", preference_id: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
  describe("/POST update user", () => {
    it("api that updates a given user", (done) => {
      chai
        .request(server)
        .post("/api/user/update_user")
        .send({
          name: "Declan Gundrum",
          email: "test_email@gmail.com",
          password: "test",
          role: 4,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
  describe("/POST login", () => {
    it("api that logs a given user in", (done) => {
      chai
        .request(server)
        .post("/api/user/login")
        .send({ email: "declan.gundrum.17@gmail.com", password: "Redrider1" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST create a new user", () => {
    it("api that creates a new user and adds them to the database", (done) => {
      chai
        .request(server)
        .post("/api/user/create_user")
        .send({
          email: "test_email@gmail.com",
          password: "test",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST delete user", () => {
    it("api that deletes a given user from the database", (done) => {
      chai
        .request(server)
        .post("/api/user/delete")
        .send({ user_id: 100, email: "test_email@gmail.com" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET validation", () => {
    it("api that validates whether a user is signed in or not", (done) => {
      chai
        .request(server)
        .get("/api/user/validate")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
  describe("/GET account", () => {
    it("api that returns the currently signed in user as an object", (done) => {
      chai
        .request(server)
        .get("/api/user/account")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
});

describe("Event routes", () => {
  describe("/POST delete event", () => {
    it("api that deletes a specific event from the database", (done) => {
      chai
        .request(server)
        .post("/api/events/delete")
        .send({ event_id: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });

  // describe.skip("/POST create new event", () => {
  //   it("create a new event in the database", (done) => {
  //     chai
  //       .request(server)
  //       .post("/api/events/create")
  //       .send({
  //         name: "Test event",
  //         capacity: 100,
  //         duration: 2000,
  //         schedule_id: 3,
  //         type: 4,
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property("valid").eql(true);
  //         done();
  //       });
  //   });
  // });
  describe("/GET all events", () => {
    it("Get all the events that are in the database", (done) => {
      chai
        .request(server)
        .get("/api/events")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET event by an event_id", () => {
    it("api that returns a singular specified event", (done) => {
      chai
        .request(server)
        .get("/api/events/2")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET event given a user id", () => {
    it("Api that returns all the events that a user is a part of", (done) => {
      chai
        .request(server)
        .get("/api/events/user/1")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET event given a schedule id", () => {
    it("api that returns all the events given a schedule id", (done) => {
      chai
        .request(server)
        .get("/api/events/schedule/2")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Guest routes", () => {
  describe("/POST add a user to a given event/schedule", () => {
    it("api that adds a user to an existing event", (done) => {
      chai
        .request(server)
        .post("/api/events/guests/add")
        .send({ user_id: 2, event_id: null, schedule_id: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  // describe.skip("/POST delete", () => {
  //   it("api that deletes a user off of a guest list", (done) => {
  //     chai
  //       .request(server)
  //       .post("/api/events/guests/delete")
  //       .send({ user_id: 2, event_id: 2, schedule_id: null })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property("valid").eql(true);
  //         done();
  //       });
  //   });
  // });
  describe("/GET by event_id", () => {
    it("api that returns all the guests given a certain event", (done) => {
      chai
        .request(server)
        .get("/api/events/guests/1")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET by user_id", () => {
    it("api that returns all the events that a person is invited to", (done) => {
      chai
        .request(server)
        .get("/api/events/guests/user/2")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all guest", () => {
    it("api that returns all rows in the guest list table", (done) => {
      chai
        .request(server)
        .get("/api/events/guests")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all guest", () => {
    it("api that returns all guests by schedule", (done) => {
      chai
        .request(server)
        .get("/api/events/guests/schedule/1")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });

  // Bad input tests
  describe("/POST add a user to a given event/schedule", () => {
    it("api that adds a user to an existing event", (done) => {
      chai
        .request(server)
        .post("/api/events/guests/add")
        .send({ user_id: -2, event_id: null, schedule_id: -1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST delete", () => {
    it("api that deletes a user off of a guest list", (done) => {
      chai
        .request(server)
        .post("/api/events/guests/delete")
        .send({ user_id: -2222, event_id: 2222, schedule_id: null })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
  describe("/GET by event_id", () => {
    it("api that returns all the guests given a certain event", (done) => {
      chai
        .request(server)
        .get("/api/events/guests/-1")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET by user_id", () => {
    it("api that returns all the events that a person is invited to", (done) => {
      chai
        .request(server)
        .get("/api/events/guests/user/-1")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all guest", () => {
    it("api that returns all rows in the guest list table", (done) => {
      chai
        .request(server)
        .get("/api/events/guests")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Preference routes", () => {
  describe("/GET all", () => {
    it("api that returns all the different preferences", (done) => {
      chai
        .request(server)
        .get("/api/preferences")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all categories", () => {
    it("api that returns all the different preference categories", (done) => {
      chai
        .request(server)
        .get("/api/preferences/category")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  // describe.skip("/POST create new preferences", () => {
  //   it("api that creates a new pereference type in the database", (done) => {
  //     chai
  //       .request(server)
  //       .post("/api/preferences/create")
  //       .send({
  //         category: "Theme",
  //         name: "Dark",
  //         description: "Make the theme of your website dark",
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property("valid").eql(true);
  //         done();
  //       });
  //   });
  // });
  describe("/POST delete", () => {
    it("api that deletes a given preference from the database", (done) => {
      chai
        .request(server)
        .post("/api/preferences/delete")
        .send({ preference_id: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
});

describe("Role routes", () => {
  describe("/POST delete", () => {
    it("api that delete a given role from the database", (done) => {
      chai
        .request(server)
        .post("/api/roles/delete")
        .send({ role_id: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST create", () => {
    it("api that creates a new role in the database", (done) => {
      chai
        .request(server)
        .post("/api/roles/create")
        .send({ name: "Manager", description: "Top dog" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all", () => {
    it("api that returns all the roles in the database", (done) => {
      chai
        .request(server)
        .get("/api/roles")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Schedule routes", () => {
  describe("/POST update", () => {
    it("api that updates an existing schedule in the database", (done) => {
      chai
        .request(server)
        .post("/api/schedules/update")
        .send({
          name: "Justin",
          type: 2,
          schedule_id: 100,
          description: "Test schedule",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST create", () => {
    it("api that creates a new schedule in the database", (done) => {
      chai
        .request(server)
        .post("/api/schedules/create")
        .send({ name: "Justin", type: 2, creator_id: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(false);
          done();
        });
    });
  });
  describe("/POST delete", () => {
    it("api that deletes a schedule in the database", (done) => {
      chai
        .request(server)
        .post("/api/schedules/delete")
        .send({ schedule_id: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET all", () => {
    it("api that returns all the schedules in the database", (done) => {
      chai
        .request(server)
        .get("/api/schedules")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET schedule by id", () => {
    it("api that returns a given schedule by its id", (done) => {
      chai
        .request(server)
        .get("/api/schedules/100")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Shifts routes", () => {
  describe("/GET all", () => {
    it("api that returns all the shifts that are in the database", (done) => {
      chai
        .request(server)
        .get("/api/shifts")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/GET by id", () => {
    it("api that returns a singular shift given its id", (done) => {
      chai
        .request(server)
        .get("/api/shifts/100")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST create", () => {
    it("api that creates a new shift in the database", (done) => {
      chai
        .request(server)
        .post("/api/shifts/create")
        .send({ user_id: 2, event_id: 2, schedule_id: 3 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST update", () => {
    it("api that updates an existing shift in the database", (done) => {
      chai
        .request(server)
        .post("/api/shifts/update")
        .send({ user_id: 2, event_id: 2, schedule_id: 3 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
  describe("/POST delete", () => {
    it("delete an existing shift from the database", (done) => {
      chai
        .request(server)
        .post("/api/shifts/delete")
        .send({ schedule_id: 2, event_id: 3 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});

describe("Algorithm tests", () => {
  describe("Basic algorithm", () => {
    const constraints = {
      minHrs: 2,
      maxHrs: 5,
      minShift: 2,
      maxShift: 4,
      normalShift: 2.5,
      minEmployees: 2,
      maxEmployees: 4,
      prefferedNumberOfEmployees: 3,
      businessHrs: {
        m: { start: 10, end: 17.5 },
        t: { start: 10, end: 17.5 },
        w: { start: 10, end: 17.5 },
        r: { start: 10, end: 17.5 },
        f: { start: 10, end: 17.5 },
      },
    };

    const employees = {
      e0001: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 10,
        conflicts: {
          m: [
            [10, 12],
            [4, 5],
          ],
          t: [],
          w: [],
          r: [],
          f: [],
        },
      },
      e0002: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 10,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0003: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 11,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0004: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0005: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0006: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0007: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0008: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0009: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
      e0010: {
        preferredMinHrs: 3,
        preferredMaxHrs: 6,
        preferredHrs: 5,
        conflicts: { m: [], t: [], w: [], r: [], f: [] },
      },
    };
    it("returns valid schedule", (done) => {
      chai
        .request(server)
        .post("/api/algorithm")
        .send({ constraints, employees })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("valid").eql(true);
          done();
        });
    });
  });
});
