const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})

const Genre = mongoose.model('Genre', genreSchema)

async function insertGenre(genrePayload) {
    try {
        let genre = new Genre(genrePayload)
        genre = await genre.save()
        return genre

    } catch (err) {
        //return parseErrors(err)
        return err
    }

}

const addGenre = (genre) => {
    return insertGenre(genre)
}

function parseErrors(err) {
    var messages = []
    for (index in err.errors)
        messages.push(err.errors[index].messages)
    return {
        error: err.type,
        message: messages
    }
}

module.exports = addGenre