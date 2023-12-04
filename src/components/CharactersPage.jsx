import './CharactersPage.css';
import CharacterSheet from "./CharacterSheet";
import axios from "axios";
import { useState } from "react";

function CharactersPage({ characterInfo }) {

    const [characters, setCharacters] = useState(characterInfo);

    const addNewCharacter = async() => {
        const { data } = await axios.post('/api/info', {
            img: '',
            text: {name: '', charClass: '', race: ''},
            stats: {strength: '', dexterity: '', constitution: '', intelligence: '', wisdom: '', charisma: ''},
            description: '',
        });
        setCharacters(data);
    };

    const main = characters.map((character) => {
        const { isEditing } = character;

        return (
            <CharacterSheet
                key={character.id}
                characterInfo={character}
                setCharacters={setCharacters}
                initialIsEditing={isEditing}
            />
        );
    });

    return (
        <div className='body'>
            {main}
            <button onClick={addNewCharacter} className='add-char-btn'>Add new character</button>
        </div>
    );
};

export default CharactersPage;