from collections import Counter
from .parse_input import get_input

nums1, nums2 = get_input()

counts = Counter(nums2)
similarity_score = sum(num * counts[num] for num in nums1)

print(similarity_score)
