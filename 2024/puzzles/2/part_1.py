from .parse_input import get_input


def is_safe(report, direction):
    if direction == "increasing":
        return all(1 <= report[i + 1] - report[i] <= 3 for i in range(len(report) - 1))
    elif direction == "decreasing":
        return all(1 <= report[i] - report[i + 1] <= 3 for i in range(len(report) - 1))
    return False


reports = get_input()

num_safe = sum(
    is_safe(report, "increasing" if report[0] < report[1] else "decreasing")
    for report in reports
)

print(num_safe)
