const fileCount = 200;
const fs = require("fs");

const functionTemplate = (i) => `
get${i}: String
get${i} = "${i}"
`

const template = (modName) => {
  return [modName, `${modName}.elm` ,`module ${modName} exposing (..)
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

const mainStatement = mod.map(([modName]) => modName).reduce((pre, cur, i) => `${pre}${i === 0 ? "" : "\n"}    ${cur}.get1 ++`, "") + ` ""`;


const mainSourceCode = `
module Main exposing (..)

import Html exposing (Html, text, div, h1, img)
import Html.Attributes exposing (src)

${importStatements}

---- MODEL ----


type alias Model =
    String


init : ( Model, Cmd Msg )
init =
    ( 
${mainStatement}
      , Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ img [ src "/logo.svg" ] []
        , h1 [] [ text "Your Elm App is working!" ]
        ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }

`;

fs.writeFileSync(`src/Main.elm`, mainSourceCode);
