function capitalize(word) {
    const newWord = word[0].toUpperCase() + word.slice(1)
    return newWord
}

export default capitalize;