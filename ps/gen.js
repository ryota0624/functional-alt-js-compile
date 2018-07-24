const fileCount = 200;
const fs = require("fs");

const functionTemplate = (i) => `
get${i} :: String
get${i} = "${i}"
`

const template = (modName) => {
  return [modName, `${modName}.purs` ,`module ${modName} where
${Array.from({length: 10}).map((_, i) => functionTemplate(i)).reduce((pre, cur) => `${pre}\n${cur}`)}
  `]
};

const mod = Array
  .from({length: fileCount}).map((_, i) => `Mod${i}`)
  .map(template);


mod.forEach(([modName, fileName, sourceCode]) => {
  fs.writeFileSync(`src/${fileName}`, sourceCode);
});

const importStatements = mod.map(([modName]) => modName).reduce((pre, cur) => `${pre}\nimport ${cur} as ${cur}`, "");

const mainStatement = mod.map(([modName]) => modName).reduce((pre, cur, i) => `${pre}${i === 0 ? "" : "\n"}    ${cur}.get1 <>`, "") + ` ""`;

const mainSourceCode = `
module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)

${importStatements}

main :: Effect Unit
main = do
  log (
        ${mainStatement}
      )
`;
fs.writeFileSync(`src/Main.purs`, mainSourceCode);