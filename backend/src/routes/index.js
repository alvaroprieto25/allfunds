const { Router } = require('express');
const New = require('../models/New');


// Inicialization
const router = Router();


// Routes
router.get('/news', (req, res) => {
    res.send('News.')
})

router.post('/addNew', (req, res) => {
    const { title, description, date, content, author, archiveData } = req.body;
    const newNew = new New({ title, description, date, content, author, archiveData });
    console.log(newNew);
    res.send('Added new');
})

router.get('/archivated', (req, res) => {
    res.send('Archivated News.')
})

module.exports = router;