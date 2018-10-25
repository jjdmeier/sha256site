import itertools
import sys

stringLength = int(sys.argv[1]) #length of strings to be generated from command line
fileToOpen = 'dictionary' + str(stringLength) + '.txt'
f = open(fileToOpen, 'w')

chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
count = 2
for item in itertools.product(chars, repeat=stringLength):
    f.write("".join(item)+"\n")