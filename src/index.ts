const { spawn } = require('child_process');

const progress = spawn('./src/progress/progress', ['1000', '20']);

progress.stdout.on('data', (data: string) => {
  console.log(data.toString().trim());
});
