const { Router } = require('express');
const New = require('../models/New');


// Inicialization
const router = Router();


// Routes
router.get('/news', async (req, res) => {
    const news = await New.find({archiveDate: null});
    res.status(200).send(news);
})

router.get('/archivated', async (req, res) => {
    const archivated = await New.find({archiveDate: { $ne: null}});
    res.status(200).send(archivated);
})

router.post('/addNew', async (req, res) => {
    const { title, description, date, content, author, archiveDate } = req.body;
    const newNew = new New({ title, description, date, content, author, archiveDate });
    await newNew.save();
    res.status(200).json({"status": 200});
})

router.delete('/deleteNew/:id', async (req, res) => {
    const newNew = await New.findById(req.params.id);
    await New.deleteOne(newNew);
    res.status(200).json({"status": 200});
})

router.put('/archive/:id', async(req, res) => {
    const newNew = await New.findById(req.params.id);
    newNew.archiveDate = new Date();
    await newNew.save();
    res.status(200).send(newNew);
})
module.exports = router;