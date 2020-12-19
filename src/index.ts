import { spawn } from 'child_process';
import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const progress = spawn('./build/progress', ['1000', '20']);

fromEvent(progress.stdout, 'data')
  .pipe(
    map((data: any) => data.toString().trim()),
    takeUntil(fromEvent(progress, 'close'))
  )
  .subscribe({
    next: (data: string) => console.log(data),
    error: (error: string) => console.log(error),
    complete: () => console.log('done'),
  });
