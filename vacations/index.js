const staffJSON = require("./weekend.json");

const staff = staffJSON.map((value) => {
  return {
    userId: value.user._id,
    name: value.user.name,
    startDate: value.startDate,
    endDate: value.endDate,
  };
});

const vacations = (staff) => {
  const employee = new Map();

  staff.forEach((el) => {
    const candidate = {
      userId: el.userId,
      name: el.name,
      weekendDates: [],
    };

    if (!employee.has(el.userId)) {
      employee.set(el.userId, candidate);
    }
    employee.get(el.userId).weekendDates.push({
      startDate: el.startDate,
      endDate: el.endDate,
    });
  });

  return employee;
};

const result = vacations(staff);

result.forEach((value) => {
  const newResult = {
    userId: value.userId,
    name: value.name,
    weekendDates: value.weekendDates,
  };
  console.log(newResult);
});
