// import shadaffOomoo from "../../music/shadaff_oomoo.mp3";
import orangeSkin from "../../skins/orange_skin.wsz";


const urlBase = "https://raw.githubusercontent.com/theravetheory/theravetheory.github.io/winamp/src/music/playlist/"
const songFileNames = ["++chao2.mp3",
"10\ Gabber\ For\ Milfs.mp3",
"2crush.mp3",
"A\ (Alphabetical).mp3",
"Abraxas\ (ft.\ Catastrophi).mp3",
"Angel_City.mp3",
"Blood\ Ocean.mp3",
"coated\ in\ ice.mp3",
"Composition\ Booklet\ -\ Weed\ For\ The\ Innocence\ -\ 01\ Alcohol.mp3",
"Computer.mp3",
"DEVILMAN.mp3",
"Duty\ Is\ The\ Greatest\ Gift.mp3",
"f_3$h\ BYTE.mp3",
"Faith.mp3",
"Floater.mp3",
"Flux.mp3",
"GUNK\ SHOT\ __.mp3",
"Ignorant\ Existence\ (Luci\ Carcass\ X\ Lucy\ Ghost).mp3",
"lost\ in\ time,\ like\ tears\ in\ the\ shower.mp3",
"nachmancore.mp3",
"Penguin\ s2s\ (july\ 2020).mp3",
"rumaniasa_flying_colors_v1.mp3",
"S.O.S.mp3",
"Shy\ x\ Radish\ Prod.\ o0o\ _\ djfun.mp3",
"Sin\ Bound.mp3",
"SwagGod\ (prod.Inverse\ x\ SMG).mp3",
"TAKE\ IN\ THE\ ONE.mp3",
"The\ Void\ (feat.\ HKND).mp3",
"Ugly\ Sceptre.mp3",
"VVVV.mp3"];



var playlist=songFileNames.map((fileName)=>{
    return {url: urlBase+fileName};
}
);

var skin = {url: orangeSkin};


// const playlist = [
//     { url: urlBase+"++chao2.mp3" }
// ];

// const playList

export const initialTracks = playlist, initialSkin = skin;