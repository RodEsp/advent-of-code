from utils.io import read_file

input = read_file("data/day_4.txt")

grid = [list(row) for row in input.splitlines()]
count = 0
rows = len(grid)
cols = len(grid[0])

for row in range(1, rows - 1):
    for col in range(1, cols - 1):
        if grid[row][col] == "A":
            # Check corners for diagonally opposing Ms and Ss
            top_left = grid[row - 1][col - 1]
            bottom_right = grid[row + 1][col + 1]
            top_right = grid[row - 1][col + 1]
            bottom_left = grid[row + 1][col - 1]
            if (
                (top_left == "M" and bottom_right == "S")
                or (top_left == "S" and bottom_right == "M")
            ) and (
                (top_right == "M" and bottom_left == "S")
                or (top_right == "S" and bottom_left == "M")
            ):
                count += 1

print(count)
