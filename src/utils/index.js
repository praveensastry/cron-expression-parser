const range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

const isInteger = (input) => !isNaN(input);

const isAllSameType = (inputArray) => {
  return inputArray.every((val, i, arr) => typeof val === typeof arr[0]);
}

module.exports = {
  range: range,
  isInteger: isInteger,
  isAllSameType: isAllSameType
}