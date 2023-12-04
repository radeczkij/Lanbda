const min = 60 * 1000;
const hour = min * 60;
const day = hour * 24;

let now = new Date(Math.ceil(new Date().getTime() / (hour / 2)) * (hour / 2));
let start = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  10
).getTime();
let end = start + hour * 9;

class Calculates {
  async calculatePrice(lang, type, count) {
    let price = lang === "en" ? count * 0.12 : count * 0.05;
    price = type === "other" ? price * 1.2 : price;
    if (lang === "en") {
      price = price < 120 ? 120 : price;
    } else {
      price = price < 50 ? 50 : price;
    }
    return price;
  }

  async calculateTime(lang, type, count) {
    let time = 0;
    if (lang === "en") {
      time = 0.5 + count / 333;
    } else {
      time = 0.5 + count / 1333;
    }
    time =
      type === "other"
        ? Math.floor(time * 1.2 * 10) / 10
        : Math.floor(time * 10) / 10;
    time = time < 1 ? 1 : time;
    return time;
  }

  async calculateDeadline(time) {
    const deadLine = (t = time, s = start, e = end, d = now.getTime()) => {
      let time = t;
      let start = s;
      let end = e;
      let deadline = d;
      if (time == 0) {
        return deadline;
      }
      if (deadline < start) {
        deadline = start;
      } else if (deadline > end) {
        start = start + day;
        end = end + day;
        deadline = start;
      }
      let tmp = new Date(deadline);
      if (tmp.getDay() == 6 || tmp.getDay() == 0) {
        start = start + day;
        end = end + day;
        deadline = start;
      } else if ((end - deadline) / hour < time) {
        time = time - (end - deadline) / hour;
        start = start + day;
        end = end + day;
        deadline = start;
      } else {
        deadline = deadline + time * hour;
        time = 0;
      }
      return deadLine(time, start, end, deadline);
    };
    return deadLine();
  }
}

module.exports = new Calculates();
