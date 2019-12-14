const Utils = require('../utils');

const handleRange = (pattern, values, timeType) => {
  let [start, end] = pattern.split('-');

  // Check for word format(SUN/JAN) and validate
  if (!Utils.isInteger(start) || !Utils.isInteger(end)) {
    start = values.indexOf(start);
    end = values.indexOf(end);

    if (start === -1 || end === -1) {
      throw new Error(`Invalid input for ${timeType}. Please use either string or number syntax.`)
    }
  }

  return [...Utils.range(start, end)].join(' ');
}

const handleIntervals = (pattern, values, timeType) => {
  let [first, second] = pattern.split("/");

  if (first == "*") {
    if (!Utils.isInteger(second)) {
      throw new Error(`Invalid input for ${timeType}`);
    }
    return values.filter(val => val % second == 0).join(' ');
  }

  if (Utils.isInteger(first) && Utils.isInteger(second)) {
    return [...Utils.range(first, values.slice(-1)[0])]
  } else {
    throw new Error(`Invalid input for ${timeType}`);
  }
}

const handleLists = (pattern, values, timeType, context = null) => {
  const list = pattern.split(',');
  // check if there is a mix of JAN / 1 formats
  // This does not handle []
  if (!Utils.isAllSameType(list)) {
    throw new Error(`Invalid input combination for ${timeType}. Please use either string or number syntax.`);
  }

  // Check if the integers passed are within valid range 
  const isValidIntegerInputs = Utils.isInteger(list[0]) && list.map((i) => values.includes(i)).every(x => x === true);
  // Check if the input strings are valid values
  const isValidStrInputs = list.map((i) => values.includes(i)).every(x => x === true);

  if (isValidIntegerInputs || isValidStrInputs) {
    throw new Error(`Invalid input for ${timeType}`);
  }

  return list.join(' ');
}

const handleLast = (pattern, timeType, days) => {
  if (timeType == 'week') {
    if (pattern.length > 1) {
      const [num, _] = pattern.split('L')
      const numberedDay = Number(num);
      if (!(numberedDay >= 1 && numberedDay <= 7)) {
        throw new Error(`In [Number]L pattern for ${timeType} L must be between 1 & 7`);
      }
      return `Last ${days[numberedDay - 1]} of the Month`
    }
    return days.slice(-1)[0];
  } else if (timeType == 'day') {
    if (pattern == "LW") {
      return 'Last week day of the Month';
    } else if (pattern.includes("-")) {
      const [_, day] = pattern.split("-");
      return `${day} days from the end of the month`;
    }
    return 'Last day of the Month';
  }
  else {
    throw new Error(`L is not a valid pattern for ${timeType}`);
  }

}

const handleWeekday = (pattern, timeType) => {
  if (timeType == 'day') {
    const date = pattern.split('W')[0];
    if (!Utils.isInteger(date) || date === "") {
      throw new Error(`Ivalid pattern for ${timeType}, must include valid date followed by W`);
    }
    return `Nearest weekday to day ${date} of the month`;
  } else {
    throw new Error(`W is not valid pattern for ${timeType}`);
  }

}

module.exports = {
  handleWeekday: handleWeekday,
  handleLast: handleLast,
  handleLists: handleLists,
  handleIntervals: handleIntervals,
  handleRange: handleRange
}


