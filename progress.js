const { interval } = require('rxjs');
const { map, take } = require('rxjs/operators');

/**
 * This file emits percentage progress updates to stdout,
 * counting from 0.0 to 1.0.
 *
 * It should be invoked with two arguments:
 *    the total time it should take to get from 0 to 1
 *    the number of steps to get there
 *
 * It emits a `.` char on a new line to stdout
 * at the end of the count.
 */

const totalProcessTime = process.argv[2] || 5000;
const steps = process.argv[3] || 40;

interval(totalProcessTime / steps)
  .pipe(
    map((n) => n * (1 / steps)),
    take(steps)
  )
  .subscribe({
    next: (n) => console.log(`${Math.round(n * 100) / 100}`),
    complete: () => console.log(`.`),
  });
