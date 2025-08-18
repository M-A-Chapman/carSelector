
const express = require('express');
const moment = require('moment');
const axios = require('axios');

const router = express.Router();

const getMakes = async () => {
    const { data: carMakes } = await axios({
        method: 'get',
        url: 'http://localhost:3005/makes',
    });
    return carMakes.makes;
};

const getModels = async (makeName) => {
    const { data: carModels } = await axios({
        method: 'get',
        url: `http://localhost:3005/models/${makeName}`
    });
    return carModels;
}

const getSubmodels = async (modelName) => {
    const { data: carSubmodels } = await axios({
        method: 'get',
        url: `http://localhost:3005/submodels/${modelName}`
    });
    return carSubmodels;

}

router.get('/', async (req, res) => {
    try {
        const getCarData = [];
        let [chosenMake,,chosenModel] = req.query.make.split('/');
        chosenModel = chosenModel.substring(7);

        // get facts on date
        getCarData.push(getMakes());
        // get weather on month and year
        getCarData.push(getModels(chosenMake));
        getCarData.push(getSubmodels(chosenModel));

        const [
            carMakes,
            carModels,
            carSubmodels,
        ] = await Promise.all(getCarData);
        res.render('getSubmodelsByModel', {
            title: 'Car Selector',
            carMakes,
            carModels,
            chosenMake,
            chosenModel,
            carSubmodels,
        });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = router;
