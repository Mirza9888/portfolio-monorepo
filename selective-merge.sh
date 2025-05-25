#!/bin/bash

# Ensure we're on develop branch
git checkout develop

# List of code files to merge (excluding config files)
CODE_FILES=(
    "portfolio-laravel/app/Http/Requests/StoreContentRequest.php"
    "portfolio-laravel/app/Http/Resources/ContentResource.php"
    "portfolio-laravel/app/Services/ContentService.php"
    "portfolio-laravel/routes/api.php"
    "portfolio-next/src/api/services/content.ts"
    "portfolio-next/src/components/nav-bar.tsx"
    "portfolio-next/src/components/page-wrapper.tsx"
)

# Create a temporary branch for the merge
git checkout -b temp-merge

# Merge master but don't commit yet
git merge master --no-commit

# Reset all changes
git reset --hard

# Checkout only the code files we want
for file in "${CODE_FILES[@]}"; do
    if git checkout master -- "$file"; then
        echo "Merged $file"
    else
        echo "Failed to merge $file"
    fi
done

# Commit the changes
git add .
git commit -m "Selective merge from master: code files only"

# Switch back to develop and merge the temporary branch
git checkout develop
git merge temp-merge

# Clean up
git branch -D temp-merge

echo "Selective merge completed. Please review the changes before pushing." 