const fs = require('fs');
const path = require('path');
const componentsPath = './src/components';

// читаем файл где прописаны все слова
fs.readFile('structure.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // разбиваем данные на строки
    const strings = data.split('\n');

    // Выбираем первое слово из каждой строки и оставшуюся часть как комментарий
    const componentsInfoArray = strings.map(str => {
        const [componentName, ...rest] = str.trim().split(/\s+/);
        const comment = rest.join(' ');
        return { componentName, comment };
    });

    componentsInfoArray.forEach(({ componentName, comment }) => {
        const componentFolderPath = path.join(componentsPath, componentName);
        const componentJSFilePath = path.join(componentFolderPath, `${componentName}.js`);
        const componentCSSFilePath = path.join(componentFolderPath, `${componentName}.css`);

        // Проверяем существование директории компонента
        if (fs.existsSync(componentFolderPath)) {
            console.log(`Component "${componentName}" already exists at "${componentFolderPath}", skipping...`);
            return;
        }

        // Создаем директорию компонента
        fs.mkdirSync(componentFolderPath);

        // Проверяем существование файла JS
        if (fs.existsSync(componentJSFilePath)) {
            console.log(`File "${componentJSFilePath}" already exists, skipping...`);
        } else {
            // Создаем файл JS и записываем в него необходимый код
            fs.writeFileSync(componentJSFilePath, `// ${comment}\nimport './${componentName}.css';\n\nconst ${componentName} = () => {\n  return (\n    <div>${componentName}</div>\n  )\n}\n\nexport default ${componentName};`);
            console.log(`File "${componentJSFilePath}" was created`);
        }

        // Проверка существование файла css
        if (fs.existsSync(componentCSSFilePath)) {
            console.log(`File "${componentCSSFilePath}" already exists, skipping...`);
        } else {
            // Создаем файл css
            fs.writeFileSync(componentCSSFilePath, '');
            console.log(`File "${componentCSSFilePath}" was created`);
        }
    });
});
