from .parse_input import get_input

SAFE_RANGE = range(1, 4)  # 1, 2, or 3


def dampen(report, i, dampened=False):
    """
    Removes elements around the problematic index to check if the resulting report is safe.
    It tests three new reports. Each created by removing one of the the previous, current, or next elements.
    """
    if not dampened:
        for j in range(max(0, i - 1), min(i + 2, len(report))):
            new_report = report[:j] + report[j + 1 :]
            if is_safe(new_report, True):
                return True
    return False


def is_safe(report, dampened=False):
    direction = "increasing" if report[0] < report[1] else "decreasing"

    def diff(x, y):
        return x - y if direction == "decreasing" else y - x

    for i in range(len(report) - 1):
        if diff(report[i], report[i + 1]) not in SAFE_RANGE:
            return dampen(report, i, dampened)

    return True


reports = get_input()

num_safe = sum(is_safe(report) for report in reports)
print(num_safe)
