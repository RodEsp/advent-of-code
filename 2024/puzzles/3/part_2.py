from math import prod
import re
from utils.io import read_file

input = read_file("data/day_3.txt")

instructions = re.findall(r"mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)", input)

do = True
result = 0
for instruction in instructions:
    if "don't" in instruction:
        do = False
    elif "do" in instruction:
        do = True
    elif "mul" in instruction and do:
        result = result + prod(map(int, re.findall(r"\d+", instruction)))

print(result)
