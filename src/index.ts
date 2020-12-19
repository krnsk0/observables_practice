import { spawn } from 'child_process';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const progress = spawn('./build/progress', ['1000', '20']);

fromEvent(progress.stdout, 'data')
  .pipe(map((data: any) => data.toString().trim()))
  .subscribe((x) => console.log(x));
