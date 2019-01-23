const fs = require('fs');
const path = require('path');

const scandir = root =>
{
    let files = [];
    const stats = fs.statSync(root);
    if (stats.isDirectory())
    {
        fs.readdirSync(root).forEach(
            file =>
            {
                const filePath = path.resolve(root, file);
                files = files.concat(scandir(filePath));
            }
        );
    }
    else if (stats.isFile() && root.endsWith('.js'))
    {
        files.push(root);
    }

    return files;
};

scandir(path.resolve(__dirname, 'tests'))
    .forEach(file => require(file));
