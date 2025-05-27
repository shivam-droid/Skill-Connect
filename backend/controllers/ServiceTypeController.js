import ServiceType from '../models/ServiceType.js';

// Create new service type
export const createServiceType = async (req, res) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const exists = await ServiceType.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Service already exists' });

    const serviceType = await ServiceType.create({ name, description });
    res.status(201).json(serviceType);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all service types
export const getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find().sort({ createdAt: -1 });
    res.status(200).json(serviceTypes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single service type
export const getServiceTypeById = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);
    if (!serviceType) return res.status(404).json({ error: 'Not found' });

    res.status(200).json(serviceType);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete service type
export const deleteServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findByIdAndDelete(req.params.id);
    if (!serviceType) return res.status(404).json({ error: 'Not found' });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
