var { createCSVObjects } = require('./sources/convert/csvFileToObjects')

var source = process.argv.slice(2)[0];
console.log('Source: ', source);

var fileContent = createCSVObjects(source, "\n", ";")
console.log('File content: ', fileContent);

forEach((file, i) => {
  const points = createCSVObjects(file.tif)
  
});
