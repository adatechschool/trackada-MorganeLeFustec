import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import { count } from "console";

const track = JSON.parse(readFileSync("./track.json", "utf-8"));
const cheminAda = join(homedir(), "ada")
const root = track.root.replace("~", homedir())
let score = 0; // Le nb de dossier complètement initialisés

// Vérifier l'existence du dossier Ada
const dirExists = existsSync(cheminAda)
console.log(dirExists ? "✅" : "❌", "dossier Ada", cheminAda);

// Vérifier l'existence des dossiers, d'un repo git et la présence des fichiers attendus
for (const {name, required} of track.projects){
    const projectExists = existsSync(join(root, name));
    const projectGit = existsSync(join(root, name, ".git"));
    let counter = 0;
    let tabRequired = []
    if (projectExists == false){
        console.log(`❌ dossier du projet ${name}\n- le dossier n'existe pas ou n'est pas nommé correctement`)
    } else {
        if (projectGit == false){
            console.log(`❌ dossier du projet ${name}\n- le repository git n'est pas initialisé`)
            for (const fichier of required){
                const projectRequired = existsSync(join(root, name, fichier))
                if (projectRequired == false){
                    tabRequired.push(fichier)
                } else  {
                    counter ++
                }
            }
            if (projectExists == true && projectGit == false && !(counter===required.length)){
            console.log(`- il manque ${tabRequired.join(", ")}`)
            }
        } else{
            for (const fichier of required){
                const projectRequired = existsSync(join(root, name, fichier))
                if (projectRequired == false){
                    tabRequired.push(fichier)
                } else  {
                    counter ++
                }
            }
            if (projectExists == true && projectGit == true && counter === required.length){
                console.log(`✅ dossier du projet ${name}`)
                score ++;
            } else{
            console.log(`❌ dossier du projet ${name}`)
            console.log(`- il manque ${tabRequired.join(", ")}`)
            }
        }
    }
}
if (score===track.projects.length){
    console.log(`✅ 100 % des projets sont intitialisés`)
} else {
    console.log(`❌ ${score/track.projects.length*100} % des projets sont initialisés`)
}


