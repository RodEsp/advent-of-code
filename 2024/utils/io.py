def get_input(filename):
    """
    Read and return the contents of a file.

    Args:
        filename: Path to the input file

    Returns:
        The contents of the file as a string
    """
    with open(filename) as f:
        s = f.read()
    return s
