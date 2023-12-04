import idGenerator from "../../utils/idGenerator.js";

// Server data:
let CHARACTER_DATA = [
    {
        id: 0,
        img: `https://lrpc.wdfiles.com/local--resized-images/deep-gnome/Svirfneblin.jpg/medium.jpg`,
        text: {name: 'Dickens', charClass: 'Monk', race: 'Deep Gnome'},
        stats: {strength: 24, dexterity: 14, constitution: 12, intelligence: 8, wisdom: 16, charisma: 8},
        description: `Just a cute little guy. (Very stupid)`
    },
    {
        id: 1,
        img: `https://images.nightcafe.studio/jobs/5oX0OnL6khxB3755POlU/5oX0OnL6khxB3755POlU--1--LG1WS_6x.jpg?tr=w-1600,c-at_max`,
        text: {name: 'Koogal Floogalhorn', charClass: 'Wizard/Sorcerer', race: 'Tiefling'},
        stats: {strength: 8, dexterity: 8, constitution: 10, intelligence: 20, wisdom: 14, charisma: 20},
        description: `Weak and uncoordinated. (Very smart)`
    },
    {
        id: 2,
        img: `https://m.media-amazon.com/images/I/513pbXoCnfL._AC_UF894,1000_QL80_.jpg`,
        text: {name: 'Guy Fieri', charClass: 'Chef', race: 'Human'},
        stats: {strength: 100, dexterity: 100, constitution: 100, intelligence: 100, wisdom: 100, charisma: 1000},
        description: `Guy Ramsay Fieri is an American restaurateur, author, and an Emmy Award winning television presenter. He co-owned three now defunct restaurants in California, licenses his name to restaurants in cities all over the world, and is known for hosting various television series on the Food Network. By 2010, The New York Times reported that Fieri had become the "face of the network", bringing an "element of rowdy, mass-market culture to American food television" and that his "prime-time shows attract more male viewers than any others on the network".`
    }
];

// Route functions:
function getInfo(req, res) {
    res.status(200).json(CHARACTER_DATA)
};

function addInfo(req, res) {
    const { img, text, stats, description } = req.body;

    const newCharacter = {
        id: idGenerator(),
        img: img,
        text: text,
        stats: stats,
        description: description,
        isEditing: true
    }

    CHARACTER_DATA.push(newCharacter)
    res.json(CHARACTER_DATA)
};

function updateInfo(req, res) {
    const { id } = req.params;
    const{ img, text, stats, description } = req.body;

    const character = CHARACTER_DATA.find((character) => character.id === +id);

    character.img = img || character.img;
    character.text = text || character.text;
    character.stats = stats || character.stats;
    character.description = description || character.description;

    res.json(character);
};

function deleteInfo(req, res) {
    const { id } = req.params;
    CHARACTER_DATA = CHARACTER_DATA.filter((character) => character.id !== +id);
    res.json(CHARACTER_DATA)
};

// Exports:
export { getInfo, addInfo, updateInfo, deleteInfo };