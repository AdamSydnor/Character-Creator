function Buttons({ isEditing, onEditClick, onSaveClick, onDeleteClick }) {
    return isEditing ? (
        <>
            <button onClick={onSaveClick}>Save</button>
            <button onClick={onDeleteClick}>Delete</button>
        </>
    ) : (
        <>
            <button onClick={onEditClick}>Edit</button>
            <button onClick={onDeleteClick}>Delete</button>
        </>
    )
}

export default Buttons