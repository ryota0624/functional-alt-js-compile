const fileCount = 200;
const fs = require("fs");

const functionTemplate = (i) => `
let get${i} = "${i}";
`

const template = (modName) => {
  return [modName, `${modName}.re` ,`
${Array.from({length: 10}).map((_, i) => functionTemplate(i)).reduce((pre, cur) => `${pre}\n${cur}`)}
  `]
};

const mod = Array
  .from({length: fileCount}).map((_, i) => `Mod${i}`)
  .map(template);

mod.forEach(([modName, fileName, sourceCode]) => {
  fs.writeFileSync(__dirname + "/src/" + fileName, sourceCode);
});

const importStatements = mod.map(([modName]) => modName).reduce((pre, cur) => `${pre}\open ${cur};\n`, "");

const mainStatement = mod.map(([modName]) => modName).reduce((pre, cur, i) => `${pre}${i === 0 ? "" : "\n"}    ${cur}.get1 ++`, "") + ` ""`;

const mainSourceCode = `
Js.log(
${mainStatement}
);
`;
fs.writeFileSync(__dirname + "/src/Demo.re", mainSourceCode);
