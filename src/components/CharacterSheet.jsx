import TextRows from './TextRows';
import StatsRows from './StatsRows';
import Buttons from './Buttons';
import { useState } from 'react';
import axios from 'axios';

function CharacterSheet({ characterInfo, setCharacters, initialIsEditing }) {
    // console.log(characterInfo);

    const [isEditing, setIsEditing] = useState(initialIsEditing);

    const { id, img, text, stats, description } = characterInfo;

    const [image, setImage] = useState(img)
    const [name, setName] = useState(text.name);
    const [charClass, setCharClass] = useState(text.charClass);
    const [race, setRace] = useState(text.race);
    const [strength, setStrength] = useState(stats.strength);
    const [dexterity, setDexterity] = useState(stats.dexterity);
    const [constitution, setConstitution] = useState(stats.constitution);
    const [intelligence, setIntelligence] = useState(stats.intelligence);
    const [wisdom, setWisdom] = useState(stats.wisdom);
    const [charisma, setCharisma] = useState(stats.charisma);
    const [background, setBackground] = useState(description)


    const stateVars = {
        name: [name, setName],
        charClass: [charClass, setCharClass],
        race: [race, setRace]
    };

    const stateVars2 = {
        strength: [strength, setStrength],
        dexterity: [dexterity, setDexterity],
        constitution: [constitution, setConstitution],
        intelligence: [intelligence, setIntelligence],
        wisdom: [wisdom, setWisdom],
        charisma: [charisma, setCharisma]
    };

    const charImage = () => {
        return isEditing ? (
            <div className='image'>
                <img src={img}/>
                <br />
                <input placeholder='Image url' type='text' value={image} onChange={e => setImage(e.target.value)}/>
            </div>
        ) : (
            <div className='image'>
                <img src={image}/>
            </div> 
        )
    }

    const textRows = Object.entries(text).map(([key, value]) => {
        return (
            <TextRows
            label={key}
            state={stateVars[key]}
            isEditing={isEditing}
            />
        );
    });

    const statsRows = Object.entries(stats).map(([key, value]) => {
        // return (
        //         <td>{key}: {value}</td>
        // );
        return (
            <StatsRows 
            label={key}
            state={stateVars2[key]}
            isEditing={isEditing}
            />
        )
    });

    const charDescription = () => {
        return isEditing ? (
            <>
                <h2>Character description:</h2>
                <textarea placeholder='Description' value={background} onChange={e => setBackground(e.target.value)}></textarea>
            </>
        ) : (
            <>
                <h2>Character description:</h2>
                <p className='background'>{background}</p>
            </>
        )
    };

    console.log(id)

    const setEditMode = () => setIsEditing(true)
    const setViewMode = async() => {
        const { data } = await axios.put(`/api/info/${id}`, {
            img: image,
            text: {name, charClass, race},
            stats: {strength, dexterity, constitution, intelligence, wisdom, charisma},
            description: background
        });

        setImage(data.img);
        setName(data.text.name);
        setCharClass(data.text.charClass);
        setRace(data.text.race);
        setStrength(data.stats.strength);
        setDexterity(data.stats.dexterity);
        setConstitution(data.stats.constitution);
        setIntelligence(data.stats.intelligence);
        setWisdom(data.stats.wisdom);
        setCharisma(data.stats.charisma);
        setBackground(data.description);

        setIsEditing(false);
    }

    const onDeleteClick = async() => {
        const { data } = await axios.delete(`/api/info/${id}`)
        setCharacters(data)
    }

// Final return statement:
    return (
        <div className="character">
            <div className="character-info">
                {charImage()}
                <div className="character-sub">
                    <div className="name-and-stuff">
                        <table>
                            {textRows}
                        </table>
                    </div>
                    <div className="stats">
                        <table>
                            <thead>Stats:</thead>
                            <tr>
                                {statsRows.slice(0, 3)}
                            </tr>
                            <tr>
                                {statsRows.slice(3, 6)}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="character-description">
                {charDescription()}
            </div>
            <div className="save-delete-btn">
                <Buttons isEditing={isEditing} onEditClick={setEditMode} onSaveClick={setViewMode} onDeleteClick={onDeleteClick} />
            </div>
        </div>
    )
}

export default CharacterSheet