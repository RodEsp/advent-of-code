from utils.io import read_file


def get_input():
    """
    Parse the input file and return two sorted lists of numbers.
    """
    input_text = read_file("data/day_1.txt")
    list1, list2 = zip(*(map(int, line.split()) for line in input_text.splitlines()))

    return sorted(list1), sorted(list2)
