const express = require('express');
const router = express.Router();

const projectsRouter = require('./projects');
const scriptsRouter = require('./scripts');

router.use('/projects', projectsRouter);
router.use('/scripts', scriptsRouter);


module.exports = router;
