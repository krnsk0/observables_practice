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
    if (this._process) {
      this._observable = fromEvent(this._process.stdout, 'data').pipe(
        map((data: any) => data.toString().trim()), // no any here
        takeUntil(fromEvent(this._process, 'close'))
      );

      callback(this._observable);
    }
  }
}
