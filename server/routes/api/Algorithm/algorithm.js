//Managerial Constraints {minHrs, maxHrs, minShift, maxShift, minEmployees, maxEmployees, prefferedEmployees, businessHrs}
//BusinessHrs {M: (start, end), T, W, R, F, S, Su}
//Employee List {Employee1, Employee2, ..., EmployN}
//Need to make sure there are no duplicate Employees (Maybe make object and adders/delete)
//Employee {id, preferredMaxHrs, preferredMinHrs, preferredHrs, conflicts}
//conflicts {M: [(start,end),...], T, W, R, F}

//Solution {Employee1: {M: [(start,end),...], T, W, R, F}, ..., EmployeeN: {M: [(start,end),...], T, W, R, F}}

const express = require("express");
const router = express.Router();

const response = require("../../global/response");

router.post("/", async (req, res) => {
  try {
    let alg = await algorithm(constraints, employees);

    let r = new response("This is what was returned").body;

    r.body.response = alg;

    return res.send(r);
  } catch (err) {
    console.log(err);
    return res.send(
      new response(
        "There was an error in the algorithm api",
        false,
        err.message
      ).body
    );
  }
});

function makeArrayOfEmployees(employees) {
  var arr = [];
  for (x in employees) {
    arr.push({
      ID: x,
      preferredHrs: employees[x]["preferredHrs"],
      actualHrs: 0,
      shifts: { m: [], t: [], w: [], r: [], f: [] },
      conflicts: employees[x]['conflicts']
    });
  }
  return arr;
}

function randomEmployee(employees, employeeArr) {
  var len = employeeArr.length;
  var randEmployeeID = employeeArr(Math.random(len))["ID"];
  var conflicts = employees(randEmployeeID)["conflicts"];
  return [randEmployeeID, conflicts];
}

function isAvailable(
  employee,
  employeeArr,
  managerialConstraints,
  day,
  startTime,
  endOfDayTime
) {
  //if employee already has shift here then return null
  if (employee["shifts"][day].length > 0) {
    return null;
  }
  var minHrs = managerialConstraints["minHrs"];
  var maxHrs = managerialConstraints["maxHrs"];
  var conflicts = employee["conflicts"][day];
  var endTime;
  var shiftLength = 0;
  var remainingHrs = employee["preferredHrs"] - employee["actualHrs"];

  
  //accumulate max valid shiftLength
  //NOT accounting for preferred employee time
  
  endTime:
  for (endTime = startTime; endTime < endOfDayTime; endTime += 0.25) {
    shiftLength = endTime - startTime;
    if (shiftLength == maxHrs || shiftLength >= remainingHrs-.25) {
      break;
    }

    for (c of conflicts) {
      if (!(endTime < c[0] || endTime > c[1])) {
        break endTime;
      }
    }
  }

  if (shiftLength >= minHrs) {
    employee["shifts"][day].push([startTime, endTime]);
    employee["actualHrs"] += shiftLength;
    
    return endTime;
  }
  //if employee has conflict return null
  return null;
}

function createSchedule(employeeArr, unfilledShifts) {
  var sched = { m: [], t: [], w: [], r: [], f: [] };
  for (day in sched) {
    for (employee of employeeArr) {
      for (shift of employee["shifts"][day]) {
        sched[day].push([employee["ID"], shift]);
      }
    }
    for (unfilled in unfilledShifts[day]) {
      sched[day].push([-1, unfilled]);
    }
  }
  return sched;
}

function algorithm(managerialConstraints, employees) {
  var unfilledShifts = { m: [], t: [], w: [], r: [], f: [] };
  var employeeArr = makeArrayOfEmployees(employees);
  var employeeTotalHrsArr = makeArrayOfEmployees(employees);
  var weekdays = ["m", "t", "w", "r", "f"];
  var numEmployeesPerShift = 2;
  var tempEndTime = null;

  //iterate through week
  for (day of weekdays) {
    //iterate through number of employees per shift (default to 1)
    var startTime = managerialConstraints["businessHrs"]["m"]["start"];
    var endTime = managerialConstraints["businessHrs"]["m"]["end"];
    
    for (var j = numEmployeesPerShift; j>0; j--) {
      //iterate through day (per shift block 0.25 hrs)
      for (var i = startTime; i < endTime; i += 0.25) {
        //iterate through day employee list and check for availability during shift block (include randomness here)
        for (employee of employeeArr) {
          //assign first available employee to that shift
          tempEndTime = isAvailable(employee, employeeArr, managerialConstraints, day, i, endTime);
          if (tempEndTime != null) {
            i = tempEndTime - 0.25;
            break;
          }
        }

        if (i === startTime) {
          //noEmployeesAvailableError "Manual Action Required"
          //make dummy employee to store unfilled shifts
          //if for example 2 out of 3 shifts filled then skipAhead by 0.25 is good?
          var skipAhead = 0.25;
          unfilledShifts[day].push([startTime, startTime + 0.25]);
          i += skipAhead - 0.25;
        }
      }
    }
  }
  //fill in empty spots (mark for manual action, "close-enough" logic, or mark red)

  var sched = createSchedule(employeeArr, unfilledShifts);

  return sched;
}

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

module.exports = router;
