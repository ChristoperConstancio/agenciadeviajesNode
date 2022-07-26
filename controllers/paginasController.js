import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/testimoniales.js';

const paginaInicio = async (req,res) =>{ //request la peticion que enviamos : res l lo que express nos responde

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));
    // consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all( promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase : 'home',
            viajes: resultado[0],
            testimonios : resultado[1]
        });
    } catch (error) {
        console.error(error);
    }
    
};

const paginaNosotros = (req,res) =>{ //request la peticion que enviamos : res l lo que express nos responde

    res.render('nosotros', {
        pagina : 'Nosotros'
    });
};

const paginaTestimoniales  = async (req,res) =>{ //request la peticion que enviamos : res l lo que express nos responde

    try {
        const testimonios = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina : 'Testimoniales',
            testimonios
        });
    } catch (error) {
        console.error(error);
    }
};
const paginaViajes  = async (req,res) =>{ //request la peticion que enviamos : res l lo que express nos responde

    // Consutlar BD
    const viajes =  await Viaje.findAll();

    res.render('viajes', {
        pagina : 'Proximos Viajes',
        viajes
    });
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res) => {
    const { slug }  = req.params; 
    try {
        const viaje = await Viaje.findOne({ where : {slug}})
        res.render('viaje', {
            pagina: `Informacion Viaje`,
            viaje
        })
    } catch (error) {
        console.error(error)
    }
}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}