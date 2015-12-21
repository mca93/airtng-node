var express = require('express');
var router = express.Router();
var Property = require('../models/property');

// GET /properties
router.get('/', function (req, res) {
  Property.find().then(function (properties) {
    res.render('properties/index', { properties });
  });
});

// GET /properties/new
router.get('/new', function (req, res) {
  Property.find().then(function (properties) {
    res.render('properties/new');
  });
});

// GET /properties/1
router.get('/:id', function (req, res) {
  var propertyId = req.params.id;
  Property.findOne({ _id: propertyId }).then(function (property) {
    res.render('properties/show', { property });
  });
});

// POST /properties
router.post('/', function (req, res) {
  var description = req.body.description;
  var imageUrl = req.body.imageUrl;

  var property = new Property({ description, imageUrl });
  property.save()
  .then(function (savedProperty) {
    res.redirect('/properties/' + savedProperty.id);
  });
});

// GET /properties/1/edit
router.get('/:id/edit', function (req, res) {
  var propertyId = req.params.id;
  Property.findOne({ _id: propertyId }).then(function (property) {
    res.render('properties/edit', { property });
  });
});

// POST /properties/update
router.post('/update', function (req, res) {
  var propertyId = req.body.propertyId;

  Property.findOne({ _id: propertyId })
  .then(function (property) {
    property.description = req.body.description;
    property.imageUrl = req.body.imageUrl;

    return property.save();
  }).then(function (updatedProperty) {
    return res.redirect('/properties/' + updatedProperty.id);
  });
});

module.exports = router;
