const handleLast = require("..").handleLast;

describe('Handle Last', () => {
  it('should handle last numbered day in a WEEK', () => {
    expect(handleLast("2L", "week", ["MON", "TUE", "WED"])).toEqual("Last TUE of the Month");
  });

  it('should throw an error for invalid numbered day in a week', () => {
    expect(() => {
      handleLast("9L", "week", ["A", "B", "C", "D"])
    }).toThrow("In [Number]L pattern for week L must be between 1 & 7");
  });

  it('should handle last day in a WEEK', () => {
    expect(handleLast("L", "week", ["A", "B"])).toEqual("B");
  });

  it('should handle last given number of days of a month', () => {
    expect(handleLast("L-3", "day", [])).toEqual("3 days from the end of the month");
  });

  it('should handle last day of a month', () => {
    expect(handleLast("L", "day", [])).toEqual("Last day of the Month");
  });

  it('should throw an error for invalid time type', () => {
    expect(() => {
      handleLast("*", "decades", []);
    }).toThrow("L is not a valid pattern for decades");
  });
});