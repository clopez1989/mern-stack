const router = require('express').Router();
let Classes = require('../models/classes.model');

router.route('/').get((req, res) =>{
    Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const classesDescription = req.body.classesDescription;
    const gpa = req.body.gpa;
    const date = Date.parse(req.body.date);

    const newClasses = new Classes({
        username,
        email,
        classesDescription,
        gpa,
        date,
    });

    newClasses.save()
        .then(() => res.json('Class Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Classes.findById(req.params.id)
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Classes.findByIdAndDelete(req.params.id)
    .then(() => res.json('Class deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Classes.findById(req.params.id)
    .then(classes => {
        classes.username = req.body.username;
        classes.email = req.body.email;
        classes.classesDescription = req.body.classesDescription;
        classes.gpa = req.body.gpa;
        classes.date = Date.parse(req.body.date);

        classes.save()
        .then(() => res.json('Classes updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;