import hashlib
hash_object = hashlib.sha256('thisisatest')
hex_dig = hash_object.hexdigest()
print(hex_dig)