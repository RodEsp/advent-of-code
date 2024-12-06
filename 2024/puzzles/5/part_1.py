from utils.io import read_file
from collections import defaultdict

input = read_file("data/day_5.txt")
raw_rules, updates = map(lambda x: x.splitlines(), input.split("\n\n"))

ordering_rules = defaultdict(set)
for rule in raw_rules:
    left, right = rule.split("|")
    ordering_rules[int(left)].add(int(right))

sum = 0

for update in ([int(x) for x in item.split(",")] for item in updates):
    # Check for validity
    is_valid = True
    for i, page in enumerate(update):
        rule = ordering_rules[page]
        for j in range(i + 1, len(update)):
            if update[j] not in rule:
                is_valid = False
                break
    if is_valid:
        # Add middle page in update to sum
        sum += update[len(update) // 2]

print(sum)
