from utils.io import read_file

input = read_file("data/day_4.txt")

grid = [list(row) for row in input.splitlines()]
count = 0
rows = len(grid)
cols = len(grid[0])


def count_xmas(sequence: str) -> int:
    return sequence.count("XMAS") + sequence.count("SAMX")


# Check horizontally
for row in grid:
    count += count_xmas("".join(row))

# Check vertically
for col in range(cols):
    vertical = "".join(grid[row][col] for row in range(rows))
    count += count_xmas(vertical)

# Check diagonals (top-left to bottom-right)
for row in range(rows):
    r = row
    c = 0
    diagonal = ""
    while r < rows and c < cols:
        diagonal += grid[r][c]
        r += 1
        c += 1
    count += count_xmas(diagonal)
for col in range(1, cols):
    r = 0
    c = col
    diagonal = ""
    while r < rows and c < cols:
        diagonal += grid[r][c]
        r += 1
        c += 1
    count += count_xmas(diagonal)

# Check diagonals (top-right to bottom-left)
for row in range(rows):
    r = row
    c = cols - 1
    diagonal = ""
    while r < rows and c >= 0:
        diagonal += grid[r][c]
        r += 1
        c -= 1
    count += count_xmas(diagonal)
for col in range(cols - 2, -1, -1):
    r = 0
    c = col
    diagonal = ""
    while r < rows and c >= 0:
        diagonal += grid[r][c]
        r += 1
        c -= 1
    count += count_xmas(diagonal)

print(count)
