// const today = Date.now();
// const someday = new Date(today);
// someday.setDate(someday.getDate() + 3);

// const updatedTimestamp = someday.getTime();
// console.log(today);
// console.log(updatedTimestamp);

const currentDate = new Date();
const endDate = new Date();
endDate.setDate(currentDate.getDate() + 3);
console.log(currentDate);
console.log(endDate);