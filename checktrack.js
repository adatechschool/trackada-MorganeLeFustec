import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";

const track = JSON.parse(readFileSync("./track.json", "utf-8"));
const cheminAda = join(homedir(), "ada")
const root = track.root.replace("~", homedir())

// Vérifier l'existence du dossier Ada
const dirExists = existsSync(cheminAda)
console.log(dirExists ? "✅" : "❌", "dossier Ada", cheminAda);


for (const {name} of track.projects) {
    const projectExists = existsSync(join(root, name));
    console.log(projectExists ? "✅" : "❌", `dossier du projet ${name}\n- le dossier n'existe pas ou n'est pas nommé correctement`);
}