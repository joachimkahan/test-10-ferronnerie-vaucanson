import re

with open(r'c:\Users\33783\Documents\Informatique\portfolio\index.backup.html', 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r'id=["\']([^"\']+)["\']', content)
print("IDs found in original:", sorted(set(ids)))

anchors = re.findall(r'href=["\'](#[^"\']+)["\']', content)
print("Anchors found in original:", sorted(set(anchors)))

modals = re.findall(r'openModal\(["\']([^"\']+)["\']\)', content)
print("Modals called in original:", sorted(set(modals)))
