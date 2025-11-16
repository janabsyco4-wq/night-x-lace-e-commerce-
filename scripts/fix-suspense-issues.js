// Script to fix useSearchParams Suspense issues
const fs = require('fs');
const path = require('path');

const pagesToFix = [
  {
    file: 'app/shop/page.tsx',
    needsSuspense: true
  },
  {
    file: 'app/products/[slug]/page.tsx',
    needsSuspense: true
  },
  {
    file: 'app/dashboard/orders/[id]/page.tsx',
    needsSuspense: true
  },
  {
    file: 'app/admin/settings/page.tsx',
    needsSuspense: true
  }
];

function wrapInSuspense(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if already has Suspense
  if (content.includes('import { Suspense }') || content.includes('from "react"') && content.includes('Suspense')) {
    console.log(`✅ Already has Suspense: ${filePath}`);
    return;
  }
  
  // Check if uses useSearchParams
  if (!content.includes('useSearchParams')) {
    console.log(`⚠️  Doesn't use useSearchParams: ${filePath}`);
    return;
  }
  
  console.log(`🔧 Fixing: ${filePath}`);
  
  // Add Suspense to React import
  if (content.includes("import { useState")) {
    content = content.replace(
      /import { ([^}]+) } from 'react';/,
      "import { $1, Suspense } from 'react';"
    );
  } else if (content.includes("import { useEffect")) {
    content = content.replace(
      /import { ([^}]+) } from 'react';/,
      "import { $1, Suspense } from 'react';"
    );
  } else {
    // Add new import
    content = content.replace(
      "'use client';",
      "'use client';\n\nimport { Suspense } from 'react';"
    );
  }
  
  // Find the component export and wrap its return in Suspense
  // This is a simple approach - wrap the entire component content
  const componentMatch = content.match(/export default function (\w+)\(\)/);
  if (componentMatch) {
    const componentName = componentMatch[1];
    
    // Create a wrapper component
    const wrapperComponent = `
function ${componentName}Content() {
  const router = useRouter();
  const searchParams = useSearchParams();`;
    
    // Replace the original function declaration
    content = content.replace(
      `export default function ${componentName}() {
  const router = useRouter();
  const searchParams = useSearchParams();`,
      wrapperComponent
    );
    
    // Add the wrapper at the end
    const lastBraceIndex = content.lastIndexOf('}');
    content = content.substring(0, lastBraceIndex + 1) + `

export default function ${componentName}() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>}>
      <${componentName}Content />
    </Suspense>
  );
}`;
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Fixed: ${filePath}`);
}

console.log('🔧 Fixing useSearchParams Suspense issues...\n');

pagesToFix.forEach(page => {
  if (page.needsSuspense) {
    wrapInSuspense(page.file);
  }
});

console.log('\n✅ All pages fixed!');
console.log('\n📝 Note: Pages using useSearchParams are now wrapped in Suspense boundaries.');
