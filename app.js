const mongoose = require('mongoose')
const { ProfesorModel, CursosModel, AsignaturaModel } = require('./models/modelos')


const loadValue = () => {
    ProfesorModel.create({
        name: 'Leifer M'
    })

    CursosModel.create({
        name: 'Angular desde cero'
    })

    AsignaturaModel.create({
        name: 'Form Reactive'
    })
}

const getData = async () => {
    const courses = await CursosModel.aggregate([
        {
            $lookup: {
                from: "asignaturas",
                let: { codCourse: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$$codCourse", "$course"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "profesores",
                            let: { codProfesor: "$teacher" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$codProfesor", "$_id"] }
                                    }
                                }
                            ],
                            as: 'profe'
                        }
                    },
                    {
                        $unwind: "$profe"
                    }
                ],
                as: 'data'
            }
        }
    ])
    console.log(JSON.stringify(courses))
}

const dbConnection = () => {
    const DB_URI = 'mongodb://localhost:27017/mongo-relacion';
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('Conexion correcta!')
            getData()
        } else {
            console.log('Error en la conexion')
        }
    })
}





dbConnection();