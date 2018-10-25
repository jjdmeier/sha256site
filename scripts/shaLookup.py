import sys
import os
import pickle

# shaValue must be passed in as argument from command line
shaValue = sys.argv[1]

# load in object by file name from obj folder
def load_obj(name):
    with open('obj/' + name, 'rb') as f:
        return pickle.load(f)

found = False

# loop through dictionary objects and check for sha
for name in os.listdir('obj/'):
    if name.endswith('.pkl'):
        dictObj = load_obj(name)
        if shaValue in dictObj.keys():
            print("\nReversed: " + dictObj[shaValue])
            found = True
            break

if found == False:
    print("Value is not present in database")