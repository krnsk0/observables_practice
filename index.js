const { interval, merge } = require('rxjs');
const { map, take } = require('rxjs/operators');

const thousandCounter = interval(1000).pipe(
  map((n) => `${n} seconds`),
  take(5)
);
const hundredCounter = interval(100).pipe(
  map((n) => `${n} tenth-seconds`),
  take(50)
);

merge(thousandCounter, hundredCounter).subscribe({
  next: (x) => console.log(x),
  error: (err) => console.log(`error: ${err}`),
  complete: () => console.log(`complete`),
});
