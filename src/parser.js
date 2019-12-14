const Constants = require('./constants');
const Handlers = require('./handlers')

const parseExecutionTimes = (pattern, timeType) => {
  // ranges for the different parameter values
  const values = Constants.values;
  const months = Constants.months;
  const days = Constants.days;

  // return all values in range if * selector is used
  if (pattern == "*")
    return values[timeType].join(" ")

  if (pattern == "?")
    return 'Not Specified' //To-Do

  // handle ranges
  if (pattern.includes("-") && !pattern.includes("L")) {
    return Handlers.handleRange(
      pattern,
      timeType == "week" ? days : months,
      timeType
    )
  }

  // handle intervals
  if (pattern.includes("/"))
    return Handlers.handleIntervals(pattern, values[timeType], timeType)

  // handle lists
  if (pattern.includes(",")) {
    if (timeType == 'month' || timeType == 'week') {
      return Handlers.handleLists(
        pattern,
        values[timeType],
        timeType,
        timeType == "week" ? days : months
      )
    }
    else {
      return Handlers.handleLists(pattern, values[timeType], timeType)
    }
  }

  // handle last operator
  if (pattern.includes("L")) {
    return Handlers.handleLast(pattern, timeType, days);
  }


  // handle weekday operator
  if (pattern.includes("W")) {
    return Handlers.handleWeekday(pattern, timeType);
  }


  // Handle Individual month string ex: JAN
  if (months.includes(pattern)) {
    return months.indexOf(pattern) + 1;
  }

  // Handle Indivisual day string ex: MON
  if (days.includes(pattern)) {
    return days.indexOf(pattern) + 1;
  }

  return pattern;
}

const describeCron = (cronString) => {
  const timePatterns = cronString.split(" ");

  const [minute, hour, day, month, week, cmd] = timePatterns;

  try {
    return [
      `Minutes: ${parseExecutionTimes(minute, 'minute')}`,
      `Hours: ${parseExecutionTimes(hour, 'hour')}`,
      `Day of month: ${parseExecutionTimes(day, 'day')}`,
      `Month: ${parseExecutionTimes(month, 'month')}`,
      `Day of Week: ${parseExecutionTimes(week, 'week')}`,
      `Command: ${cmd}`,
    ].join('\n');
  } catch (error) {
    // console.log(error);
    return error.message;
  }

}

module.exports = {
  describeCron: describeCron
}



