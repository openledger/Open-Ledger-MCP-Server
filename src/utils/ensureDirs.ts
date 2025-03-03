import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
export function ensureDirectories() {
  const logsDir = path.join(process.cwd(), 'logs');
  
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log('Created logs directory');
  }
}

// Call this function when the server starts
export default ensureDirectories; 