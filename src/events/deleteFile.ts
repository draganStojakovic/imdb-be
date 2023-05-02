import fs from 'fs';

export default function deleteFile(filePath: string) {
  if (!fs.existsSync(filePath))
    return console.error(`File not found: ${filePath}`);

  fs.unlink(filePath, (err) => {
    if (err) return console.error(`Failed to delete: ${filePath}: ${err}`);
    console.log(`Successfully deleted ${filePath}`);
  });
}
