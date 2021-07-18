const mongoose = require('mongoose')

const CursosSchema = new mongoose.Schema({
    name: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const AsignaturasSchema = new mongoose.Schema({
    name: {
        type: String
    },
    course: {
        type: mongoose.Types.ObjectId
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const ProfesorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    asignature: {
        type: mongoose.Types.ObjectId
    }
},
    {
        timestamps: true,
        versionKey: false
    })

const CursosModel = mongoose.model('cursos', CursosSchema)
const AsignaturaModel = mongoose.model('asignaturas', AsignaturasSchema)
const ProfesorModel = mongoose.model('profesores', ProfesorSchema)

module.exports = {
    CursosModel,
    AsignaturaModel,
    ProfesorModel
}