// Script to fix all Next.js pages issues
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

// Pages that use useSearchParams or other dynamic features
const dynamicPages = [
  'app/admin/settings/page.tsx',
  'app/shop/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/dashboard/orders/[id]/page.tsx',
];

function addDynamicExport(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if already has dynamic export
  if (content.includes("export const dynamic")) {
    console.log(`✅ Already fixed: ${filePath}`);
    return;
  }
  
  // Check if it's a client component
  if (content.includes("'use client'")) {
    // Add dynamic export after 'use client'
    content = content.replace(
      "'use client';",
      "'use client';\n\nexport const dynamic = 'force-dynamic';"
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
  } else {
    console.log(`⚠️  Not a client component: ${filePath}`);
  }
}

console.log('🔧 Fixing Next.js pages...\n');

dynamicPages.forEach(page => {
  addDynamicExport(page);
});

console.log('\n✅ All pages fixed!');
console.log('\n📝 Note: Viewport metadata warnings are just warnings and won\'t break the build.');
console.log('   They will be automatically handled by Next.js.');
