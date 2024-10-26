import fs from 'fs';
import path from 'path';

// Utility function to get all pages
export const getPagesList = () => {
  const pagesDir = path.join(process.cwd(), 'pages'); // Assuming 'pages' is at root
  const fileNames = fs.readdirSync(pagesDir); // Read all files in the 'pages' directory

  // Filter out files that are not .js or .jsx and remove extensions
  const pageNames = fileNames
    .filter((file) => file.endsWith('.js') || file.endsWith('.jsx'))
    .map((file) => file.replace(/\.js|\.jsx$/, ''));

  return pageNames;
};
