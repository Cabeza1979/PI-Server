const express = require("express");
const {Activity, Country} = require("../db");
const router = express();
const { Op } = require("sequelize");

/*GET de todas las actividades */
router.get("/", async(req,res) =>{
   try {
    res.status(201).json(await Activity.findAll());
   } catch (error) {
    res.status(400).json(error.message);
   }
});

/*GET con los paises donde se realiza la actividad */
router.get("countries/:actividad", async(req, res)=>{
    const {actividad} = req.params;
    try {
        const allActivities = await Activity.findAll({
            where:{nombre : actividad},
            include: Country,
            
        })
           //console.log(allActivities[0].countries);
        res.status(201).json(allActivities[0].countries);

    } catch (error) {
        res.status(401).json(error.message);
    }
})

/*GET con la actividad por id */
router.get("/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        const activity = await Activity.findByPk(id, {
            // where:{id : id},
            include: Country,
            
        })
           //console.log(allActivities[0].countries);
        res.status(201).json(activity);

    } catch (error) {
        res.status(401).json(error.message);
    }
})

/* POST nueva actividad */
router.post("/", async (req, res) => {
    const { nombre, dificultad, duracion, temporada, countries } = req.body
    try {
        if(!nombre || !dificultad || !duracion || !temporada )
        throw new Error("Datos faltantes o erroneos, verifique")
        if(dificultad > 5 || dificultad < 1) throw new Error("El campo dificultad debe estar entre 1 y 5");

        const newActivity = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada,
        });
        await newActivity.addCountries(countries);
        res.status(201).json(newActivity)
    } catch (error) {
        res.status(401).json(error.message);
    }
});

router.put("/updatecountries/:idActivity", async(req, res)=>{
    const idActivity= req.params;
    const paises= req.body;

    try {
        const idPaises = paises.id;
        const getActivity = await Activity.findByPk(idActivity.idActivity);
             await getActivity.setCountries(idPaises);
        //    for (i=0; i< idPaises.length; i++){
           // await getActivity.addCountries(idPaises)
        //    }
           
        res.status(201).json(idPaises)
    } catch (error) {
        res.status(401).json(error.message);
}
});

/*PUT Modificar actividad */
router.put("/update/:id", async(req, res)=>{
    const {id} = req.params;
    const {duracion, dificultad, temporada} = req.body;
    console.log(id, duracion, dificultad, temporada);
    try {
        const actividad = await Activity.update(
            {duracion, dificultad, temporada },
            {
                where:{id}
            }
        )       
        res.status(201).json(actividad)
    } catch (error) {
        res.status(401).json(error.message);
    }
});



router.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const activity = await Activity.findByPk(id);
        activity.destroy();
        res.status(200).send(activity);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;