const { Flight, validate } = require('../models/Flight')

exports.getFlight = async (req, res) => {
    const flight = await Flight.find().sort('-title')
    res.status(200).send({
        message: "All flights",
        flight
    })
}

exports.getOneFlight = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
  
    if (!flight) return res.status(400).send('The flight with the given ID was not found.');
  
    res.status(200).json({
        message: "flight Found",
        flight
    });
}

exports.postFlight = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const newFlight = new Flight({
      title: req.body.title,
      price: req.body.price,
      place: req.body.place
    })

    await newFlight.save(newFlight)

    res.status(201).json({
        message: "flight Created",
        newFlight
    })
}

exports.updateFlight = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const {title, price, place} = req.body;
    
    const flight = await Flight.findOneAndUpdate(req.params.id, {
    title: title,
    price: price,
    place: place 
  }, {new: true});
 if (!flight) return res.status(400).send('the flight with the given ID is not found');

  res.status(200).send({
    message: "update successful...",
    flight
  });

}

exports.deleteFlight = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const flight = await Flight.findOneAndRemove(req.params.id);

    if (!flight) return res.status(400).send('the flight with the given ID is not found');
  
    res.status(200).send(flight);
}

