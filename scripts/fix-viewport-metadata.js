// Script to fix viewport metadata warnings in Next.js pages
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

// Pattern to find viewport in metadata
const viewportPattern = /viewport:\s*{[^}]*}/g;
const metadataPattern = /export const metadata[^=]*=\s*{/;

function fixViewportInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if file has viewport in metadata
    if (content.includes('viewport:') && content.includes('export const metadata')) {
      console.log(`\n📝 Fixing: ${filePath}`);

      // Extract viewport configuration
      const viewportMatch = content.match(/viewport:\s*({[^}]*})/);
      
      if (viewportMatch) {
        const viewportConfig = viewportMatch[1];
        
        // Remove viewport from metadata
        content = content.replace(/,?\s*viewport:\s*{[^}]*}/g, '');
        
        // Check if viewport export already exists
        if (!content.includes('export const viewport')) {
          // Add viewport export after metadata
          const metadataEndIndex = content.indexOf('};', content.indexOf('export const metadata'));
          
          if (metadataEndIndex !== -1) {
            const insertPosition = metadataEndIndex + 2;
            const viewportExport = `\n\nexport const viewport = ${viewportConfig};\n`;
            
            content = content.slice(0, insertPosition) + viewportExport + content.slice(insertPosition);
            modified = true;
          }
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${path.basename(filePath)}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  let fixedCount = 0;
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next
        if (file !== 'node_modules' && file !== '.next') {
          fixedCount += walkDirectory(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (fixViewportInFile(filePath)) {
          fixedCount++;
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return fixedCount;
}

console.log('🔧 Starting viewport metadata fix...\n');
console.log('Scanning app directory for pages with viewport metadata...');

const fixedCount = walkDirectory(appDir);

console.log('\n' + '='.repeat(60));
console.log(`\n✨ Fixed ${fixedCount} file(s)`);
console.log('\n💡 Tip: Restart your dev server to see the changes');
console.log('='.repeat(60) + '\n');
