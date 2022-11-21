const express = require("express");
const{ Country} = require("../db");
//const { Router } = require('express');
const countries = require("./countries");
const activities= require("./activities");
//const axios = require("axios");

const router = express(); //server creado

router.use("/countries", countries);
router.use("/activities", activities);

module.exports = router;
