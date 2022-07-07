const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/allfunds', {
    useNewUrlParser: true,
    useunifiedTopology: true
})
.then(db => console.log('DB connected'))
.catch(err => console.log(err))