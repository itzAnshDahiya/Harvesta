const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getFieldsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const fields = await prisma.field.findMany({
      where: { userId: userId },
      include: { crops: true }
    });
    res.status(200).json({ success: true, data: fields });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch fields' });
  }
};

exports.createField = async (req, res) => {
  try {
    const { name, latitude, longitude, sizeHectares } = req.body;

    if (!name || latitude === undefined || longitude === undefined || sizeHectares === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, latitude, longitude and sizeHectares are required'
      });
    }

    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);
    const parsedSizeHectares = Number(sizeHectares);

    if ([parsedLatitude, parsedLongitude, parsedSizeHectares].some(Number.isNaN)) {
      return res.status(400).json({
        success: false,
        message: 'latitude, longitude and sizeHectares must be valid numbers'
      });
    }

    const field = await prisma.field.create({
      data: {
        userId: req.user.id,
        name,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        sizeHectares: parsedSizeHectares
      }
    });
    res.status(201).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create field', error: error.message });
  }
};
