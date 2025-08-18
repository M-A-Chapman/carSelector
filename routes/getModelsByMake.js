 
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

router.get('/', async (req, res) => {
    try {
        const getCarData = [];
        const {
            make: chosenMake,
        } = req.query;

        // get facts on date
        getCarData.push(getMakes());
        // get weather on month and year
        getCarData.push(getModels(chosenMake));
        const [
            carMakes,
            carModels,
        ] = await Promise.all(getCarData);
        res.render('getModelsByMake', {
            title: 'Car Selector',
            carMakes,
            carModels,
            chosenMake
        });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = router;
