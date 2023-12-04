import capitalize from "../../utils/capitalize";

const StatsRows = ({ state, label, isEditing }) => {

    const [stateVar, setStateVar] = state

    return isEditing ? (
        <td>
            <h4 className="stat">{capitalize(label)}:</h4>
            <input id="input" className="stat" type="text" value={stateVar} onChange={(e) => setStateVar(e.target.value)} />
        </td>
    ) : (
        <td>
            <h4 className="stat">{capitalize(label)}:</h4>
            <p className="stat">{stateVar}</p>
        </td>
    )
};

export default StatsRows