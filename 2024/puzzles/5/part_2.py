from utils.io import read_file
from collections import defaultdict
from graphlib import TopologicalSorter


input = read_file("data/day_5.txt")
raw_rules, updates = map(lambda x: x.splitlines(), input.split("\n\n"))

rules = defaultdict(set)
for rule in raw_rules:
    before, after = rule.split("|")
    rules[int(before)].add(int(after))


def valid_sequence(sequence, rules):
    for i, page in enumerate(sequence):
        allowed_next_pages = rules[page]
        for next_page in sequence[i + 1 :]:
            if next_page not in allowed_next_pages:
                return False
    return True


sum = 0
for update in ([int(x) for x in item.split(",")] for item in updates):
    if not valid_sequence(update, rules):
        # Build dependency graph for invalid sequence
        graph = {page: set() for page in update}
        for page in update:
            for next_page in rules[page]:
                if next_page in update:
                    graph[page].add(next_page)

        sorted_sequence = list(TopologicalSorter(graph).static_order())
        sum += sorted_sequence[len(sorted_sequence) // 2]

print(sum)
