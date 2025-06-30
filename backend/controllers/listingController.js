import Listing from '../models/Listing.js';

export const createListing = async (req, res) => {
  const { serviceType, availableDate, price, location, description } = req.body;

  try {
    const listing = await Listing.create({
      provider: req.user._id,
      serviceType,
      availableDate,
      price,
      location,
      description
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

export const searchListings = async (req, res) => {
  const { lat, lng, serviceType, date, radius = 3 } = req.query;

  if (!lat || !lng || !serviceType || !date) {
    return res.status(400).json({ error: 'Missing filters' });
  }

  const filter = {
    serviceType,
    availableDate: new Date(date),
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseFloat(radius) * 1000
      }
    }
  };

  try {
    const listings = await Listing.find(filter)
      .populate('provider', 'name email')
      .populate('serviceType', 'name');

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};
