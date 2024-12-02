from .parse_input import get_input

nums1, nums2 = get_input()

total_distance = sum(abs(num1 - num2) for num1, num2 in zip(nums1, nums2))

print(total_distance)
