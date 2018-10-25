import sys
import hashlib
import pickle


# save_obj takes in the dictionary obj and name of the file to store it.
# Currently the name is set from the argument of the file name
def save_obj(obj, name ):
    with open('obj/'+ name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

f = open(sys.argv[1], 'r') #file to read in will be second argument
fl = f.readlines()
dict = {'key':'value'} #set up dictionary var

# Sha256 each value and store in dict var
for line in fl:
    value = hashlib.sha256(line.strip()).hexdigest()
    dict[value] = str(line)

# Save the sha256 dict as an object
save_obj(dict, sys.argv[1])

f.close()
