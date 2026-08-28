with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

print("Occurrences of 'blog':", content.lower().count("blog"))

# Let's search for any activeTab matches
import re
print("All activeTab occurrences in page.tsx:")
for m in re.finditer(r"activeTab\s*===\s*['\"][^'\"]+['\"]", content):
    print(m.group())
