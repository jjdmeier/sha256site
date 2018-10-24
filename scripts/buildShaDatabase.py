import hashlib
import shutil
import sys

f = open('english3.txt', 'r')
fl = f.readlines()
dict = {'key':'value'}

for line in fl:
    value = hashlib.sha256(line.strip()).hexdigest()
    dict[value] = str(line)

    #print(line.strip() + "," + hashlib.sha256(line).hexdigest())

val = dict['1ef0c38962cccad837151fba6e70257fc999c6987693a8f12d9db38936109018']
print ("dict['1ef0c38962cccad837151fba6e70257fc999c6987693a8f12d9db38936109018']: " + val)
f.close()
