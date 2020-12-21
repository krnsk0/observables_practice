import { ProcessObserver } from './ProcessObserver';

const processObserver = new ProcessObserver('./build/progress', 1000, 20);

processObserver.start();

processObserver.observe((observable) => {
  observable.subscribe({
    next: (data: string) => console.log(data),
    error: (error: string) => console.log(error),
    complete: () => console.log('done'),
  });
});
