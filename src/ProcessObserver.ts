import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { fromEvent, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

type ObservationCallback = (observable: Observable<string>) => void;

export class ProcessObserver {
  private _path: string;
  private _totalProcessTime: number;
  private _steps: number;
  private _process: ChildProcessWithoutNullStreams | null = null;
  private _observable: Observable<string> | null = null;

  constructor(path: string, totalProcessTime: number, steps: number) {
    this._path = path;
    this._totalProcessTime = totalProcessTime;
    this._steps = steps;
  }

  start(): void {
    const args = [this._totalProcessTime.toString(), this._steps.toString()];
    this._process = spawn(this._path, args);
  }

  observe(callback: ObservationCallback): void {
    this._observable = new Observable((observer) => {
      if (this._process) {
        this._process.stdout.on('data', (data) => {
          observer.next(data.toString().trim());
        });
        this._process.stdout.on('close', () => {
          observer.complete();
        });
      }
    });
    if (this._process) {
      callback(this._observable);
    }
  }
}
