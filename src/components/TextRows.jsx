import capitalize from "../../utils/capitalize";

const TextRows = ({ state, label, isEditing }) => {
    // console.log(state);

    const [stateVar, setStateVar] = state;

    if (label === 'charClass') {
        label = 'class';
    };

    return isEditing ? (
        <tr key={label}>
            <label htmlFor="">{capitalize(label)}: </label>
            <input type="text" value={stateVar} onChange={(e) => setStateVar(e.target.value)}/>
        </tr>
    ) : (
        <tr key={label}>
            <p>{capitalize(label)}: </p>
            <h3>{stateVar}</h3>
        </tr>
    )
};

export default TextRows