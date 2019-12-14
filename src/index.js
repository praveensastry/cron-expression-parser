const Parser = require('./parser');

const args = process.argv.slice(2, 3);
const cronString = args[0];

const result = Parser.describeCron(cronString);

console.log(result);

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node docs)
})




