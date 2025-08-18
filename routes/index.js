
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

router.get('/', async (req, res) => {
  try {

    const carMakes = await getMakes();

    res.render('index', {
      title: 'Car Selector',
      carMakes
    });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = router;
