import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const [key, ...rest] = trimmed.split('=');
    env[key.trim()] = rest.join('=').trim();
  }
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(imagesDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
});

console.log(`Found ${files.length} images to upload...\n`);

const results = {};

for (const filename of files) {
  const filePath = path.join(imagesDir, filename);
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).slice(1);
  const contentType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

  console.log(`Uploading ${filename} (${(fileBuffer.length / 1024).toFixed(1)} KB)...`);

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filename, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (uploadError) {
    console.error(`  FAILED: ${uploadError.message}`);
    continue;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filename);

  results[filename] = publicUrl;
  console.log(`  OK: ${publicUrl}`);
}

// Write results to JSON
const outputPath = path.join(__dirname, '..', 'scripts', 'image-urls.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

console.log(`\n=== DONE ===`);
console.log(`Uploaded ${Object.keys(results).length}/${files.length} images`);
console.log(`URLs saved to scripts/image-urls.json`);
