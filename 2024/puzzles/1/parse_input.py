from utils.io import get_input


def parse_input():
    """
    Parse the input file and return two sorted lists of numbers.
    """
    input_text = get_input("data/day_1.txt")
    list1, list2 = zip(*(map(int, line.split()) for line in input_text.splitlines()))

    return sorted(list1), sorted(list2)
