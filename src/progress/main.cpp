#include <iostream>
#include <cstdlib>
#include <unistd.h>

/**
 * This small program emits percentage progress updates
 * to stdout, counting from 0.0 to 1.0.
 *
 * It should be invoked with two arguments:
 *    the total time it should take to get from 0 to 1
 *    the number of steps to get there
 *
 * It emits a `...` char on a new line to stdout
 * at the end of the count.
 */

int main(int argc, char **argv)
{
  if (argc < 3)
  {
    std::cerr << "not enough arguments" << std::endl;
    exit(1);
  }

  int totalProcessTime = atoi(argv[1]);
  int steps = atoi(argv[2]);
  int sleepTimeMs = totalProcessTime / steps;
  float progress, rounded;

  for (int i = 0; i < steps; i += 1)
  {
    progress = i * (1.0 / steps);
    rounded = (int)(progress * 100);
    std::cout << (float)rounded / 100 << std::endl;

    usleep(sleepTimeMs * 1000);
  }

  std::cout << "1" << std::endl;
}
