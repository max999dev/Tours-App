const Hotel = require('../models/hotelModels');

exports.getOverview = async (req, res, next) => {
  // get data from collection
  const hotels = await Hotel.find();
  // build template
  // render template

  res.status(200).render('overview', {
    title: 'All Hotels',
    hotels
  });
  next();
};

exports.getHotel = (req, res) => {
  res.status(200).render('hotel', {
    title: 'Viroth Hotel',
  });
};
