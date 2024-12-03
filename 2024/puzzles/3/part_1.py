import re
from utils.io import read_file

input = read_file("data/day_3.txt")

mul_instructions = re.findall(r"mul\(\d{1,3},\d{1,3}\)", input)
nums_to_multiply = [
    tuple(map(int, re.findall(r"\d+", instruction))) for instruction in mul_instructions
]

result = sum(a * b for a, b in nums_to_multiply)

print(result)
