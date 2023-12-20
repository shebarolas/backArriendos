const User = require("../Models/User");
const Visitas = require("../Models/Visitas");

const agendar = async(req, res) => {

    const {fecha, userId, propId} = req.body;
    console.log(fecha, userId, propId);

    const fechaExiste = await Visitas.findOne({fecha, idPropiedad: propId});

    if(fechaExiste){
        return res.status(400).json({
            msg: "No puede agendar visita para esa fecha"
        })
    }
    const visita = new Visitas({
        fecha,
        idCliente: userId,
        idPropiedad: propId
    });

    await visita.save();
    return res.json({
        visita
    });


}

const obtenerVisitas = async(req, res) => {
    const visitas = await Visitas.find();
    res.json(visitas);
}

const obtenerVisitasPorId = async(req, res) => {
    const visitas = await Visitas.findById(req.params.id);
    res.json(visitas);
}

const obtenerVisitasPorIdCliente = async(req, res) => {
    console.log(req.params.id);

    try {
        const visitas = await Visitas.find({idCliente: req.params.id}).sort({fecha: 1}).populate('idPropiedad');
        const users =  await Promise.all(
            visitas.map(async (visita) => {
                const user = await User.findById({
                    _id: visita.idPropiedad.user
                });
                console.log(user);
                if (user){
                    const {password, ...others} = user._doc;
                    return {...visita._doc, user: others}
                }
                return {user };
            }));
        if (!visitas) {
            return res.status(400).json({
                msg: "No se encontraron visitas"
            });
        }
        return res.json(users);
    } catch (error) {
        return res.status(500).json({
            msg: "Error interno del servidor"
        });
    }
    
}

const obtenerVisitasPorIdPropiedad = async(req, res) => {

    try {
        const visitas = await Visitas.find({idPropiedad: req.params.id}).populate('idPropiedad').populate('idCliente').exec();
        console.log(visitas);
        if (!visitas) {
            return res.status(400).json({
                msg: "No se encontraron visitas"
            });
        }
        return res.json(visitas);
    } catch (error) {
        return res.status(500).json({
            msg: "Error interno del servidor"
        });
    }

}

const obtenerVisitasPorFecha = async(req, res) => {
    const visitas = await Visitas.find({fecha: req.params.fecha});
    res.json(visitas);
}

const obtenerVisitasPorFechaYIdCliente = async(req, res) => {
    const visitas = await Visitas.find({fecha: req.params.fecha, idCliente: req.params.id});
    res.json(visitas);
}

const obtenerVisitasPorFechaYIdPropiedad = async(req, res) => {
    const visitas = await Visitas.find({fecha: req.params.fecha, idPropiedad: req.params.id});
    res.json(visitas);
}

const obtenerVisitasPorFechaYIdClienteYIdPropiedad = async(req, res) => {
    const visitas = await Visitas.find({fecha: req.params.fecha, idCliente: req.params.id, idPropiedad: req.params.idProp});
    res.json(visitas);
}

const obtenerVisitasPorFechaYIdClienteYIdPropiedadYFecha = async(req, res) => {
    const visitas = await Visitas.find({fecha: req.params.fecha, idCliente: req.params.id, idPropiedad: req.params.idProp, fecha: req.params.fecha});
    res.json(visitas);
}



module.exports = {
    agendar,
    obtenerVisitasPorIdPropiedad,
    obtenerVisitasPorIdCliente,
    obtenerVisitasPorId,
    obtenerVisitas,
    obtenerVisitasPorFecha,
    obtenerVisitasPorFechaYIdCliente,
    obtenerVisitasPorFechaYIdPropiedad,
    obtenerVisitasPorFechaYIdClienteYIdPropiedad,
    obtenerVisitasPorFechaYIdClienteYIdPropiedadYFecha
}