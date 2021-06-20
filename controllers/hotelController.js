/* eslint-disable node/no-unsupported-features/es-syntax */
const Hotel = require('../models/hotelModels');

exports.getAllHotels = async (req, res) => {
  try {
    //implementing filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax

    // build the query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // advance filtering

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Hotel.find(JSON.parse(queryString));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // field limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      query = query.select(fields);
    }else{
      query = query.select('')
    }

    //Execute Query
    const hotel = await query;

    res.status(200).json({
      status: 'success',
      result: hotel.length,
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid sent request',
    });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid request',
    });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Invalid data sent',
    });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid request',
    });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      hotel,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid request',
    });
  }
};
