#python vs code...extension...code 
#interpreter 
#.py extension while saving
#python is a case sensitive

#single line comments #
print("hello")

#multiple line comments '''hello'''

#variables
a = 7

#string variable
b = "string"
c,d,e = 1, 2, 4

print(a, b, c, d, e)

#data types
a = 10
print((type(a)))


#type casting
a = 10.3
b = int(a)
print(b)

c = 10
d = float(c)
print(d)

e = "5"
print(type(e))
f = int(e)
print(type(f))

#strings

# single line string:single or double quote
a='this is a table'
print(a)

#multi line string same as multiline comment
b=''' this
is 
a 
table 
in 
multiple
line'''
print(b)

#everything in a python is an object <class 'int'>
a = int(3)
print(a)
#a=6 is same as a = int(a)

a = "string"
print(a.upper())
print(a.__doc__) #attribute

#operators
#identity operator
#membership operator

#exponential operator
a = 2**3
b = 2//3 #floor division
print(a)
print(b)

#control structures
#if else
#tab thichyo bhani block bhitra
#block bahira janu paryo bhani \
#indentation
a = 10
if a > 10:
    print(a)

elif a == 10:
    print("equal")

else:
    print("else")

#loops
# while
a = 0
while(a<=10):
    a = a+1
print(a)

#for loop
a = "string"
for s in a:
    print(s)

for a in range(10):
    print(a)

for b in range(1, 10):
    print(b)

#list
b = [1,2,3,4,5, "s", 2.4, ]
print(type(b))
#print(b)
#print(b[0])
print(b[-1]) #last element
print(b[1:4])

#list within list
b = [1,2,3,4,5, "s", 2.4, [1,2]]
print(len(b))

#modifying
b[0] = "string"
print(b)
b[0:3] = 1,3,4,5
print(b)

#tuple
#same as list but cannot modify
#c = [1,3,4]
#c[0] = 'string'
#print(c)

#dictionary
car = {
    "color": "red",
    "year": 2017
}
print(car["color"])
#print(car.get["year"])
#car[temp] = 12

#functions, scopes, modules
#next target
#edurika
#https://realpython.org/3















