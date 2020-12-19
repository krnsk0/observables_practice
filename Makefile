all:
	echo "building ./src/progress"
	g++ -Wall -o ./build/progress --std=c++11 src/progress/*
