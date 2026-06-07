#!/bin/bash
# تحميل صور المعرض محلياً

cd "$(dirname "$0")"

# قائمة الصور
declare -A images=(
    ["gallery-1.jpg"]="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    ["gallery-2.jpg"]="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
    ["gallery-3.jpg"]="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80"
    ["gallery-4.jpg"]="https://images.unsplash.com/photo-1550966871-3ed3cdb5b0c8?w=800&q=80"
    ["gallery-5.jpg"]="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
    ["gallery-6.jpg"]="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"
)

for filename in "${!images[@]}"; do
    echo "Downloading $filename..."
    curl -L "${images[$filename]}" -o "$filename"
done

echo "✅ All images downloaded!"