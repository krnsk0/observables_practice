const { interval, merge, from } = require('rxjs');
const { map, take } = require('rxjs/operators');

const seconds: number = 3;

const thousandCounter = interval(1000).pipe(
  map((n: number) => `${n} seconds`),
  take(seconds)
);
const hundredCounter = interval(100).pipe(
  map((n: number) => `${n} tenth-seconds`),
  take(10 * seconds)
);

merge(thousandCounter, hundredCounter).subscribe({
  next: (x: number) => console.log(x),
  error: (err: Error) => console.log(`error: ${err}`),
  complete: () => console.log(`complete`),
});
