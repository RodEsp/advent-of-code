from utils.io import read_file


def get_input():
    """
    Parse the input file and return a list of lists of integers.
    """
    input_text = read_file("data/day_2.txt")
    reports = input_text.splitlines()

    return [list(map(int, report.split())) for report in reports]
