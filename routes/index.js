const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
    res.sendFile('./build/index.html');
});

module.exports = router;