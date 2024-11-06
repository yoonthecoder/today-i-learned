const fs = require('fs');
const path = require('path');

const README_PATH = path.join(__dirname, '/README.md');
const ROOT_DIR = __dirname;

function createMarkdownLink(name, url) {
  return `* [${name}](${url})`;
}

function capitalizeTitle(title) {
  return title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// gatheres category and file data
function generateTOC() {
  const categories = fs
    .readdirSync(ROOT_DIR, { withFileTypes: true })
    // exclue .git file
    .filter((item) => item.isDirectory() && !item.name.startsWith('.'))
    .map((dir) => {
      const categoryName = dir.name;
      const categoryPath = path.join(ROOT_DIR, categoryName);

      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith('.md'))
        .map((file) => ({
          name: capitalizeTitle(path.basename(file, '.md').replace(/-/g, ' ')),
          path: `/${categoryName}/${file}`,
        }));

      return {
        name: capitalizeTitle(categoryName.replace(/-/g, ' ')),
        path: `/${categoryName}`,
        files,
      };
    });
  return categories;
}

// generate TOC content as markdown

function generateTOCContent(categories) {
  let tocContent = '';

  categories.forEach((category) => {
    tocContent += `${createMarkdownLink(category.name, category.path)}\n`;
  });

  tocContent += `---\n\n`;

  categories.forEach((category) => {
    tocContent += `### ${category.name}\n\n`;
    category.files.forEach((file) => {
      tocContent += `- ${createMarkdownLink(file.name, file.path)}\n`;
    });
    tocContent += `\n`;
  });

  return tocContent;
}

function updateREADME() {
  const categories = generateTOC();
  const tocContent = generateTOCContent(categories);

  let readmeContent = fs.readFileSync(README_PATH, 'utf-8');

  const marker = '### Categories';
  const markerIndex = readmeContent.indexOf(marker);

  if (markerIndex !== -1) {
    const header = readmeContent.substring(0, markerIndex + marker.length);
    const newContent = `${header}\n${tocContent}`;

    fs.writeFileSync(README_PATH, newContent, 'utf-8');
    console.log('README.md updated successfully!');
  } else {
    const newContent = `${README_HEADER}\n${tocContent}`;
    fs.writeFileSync(README_PATH, newContent, 'utf-8');
    console.log('README.md updated with new TOC successfully!');
  }
}

updateREADME();
