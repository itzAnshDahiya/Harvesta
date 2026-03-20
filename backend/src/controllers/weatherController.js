exports.getWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
    }
    
    // In a real app, you would use axios to fetch from OpenWeatherMap using process.env.OPENWEATHER_API_KEY.
    // Here we return mock data so it works reliably out of the box for the frontend to show the UI properly.
    const mockWeather = {
      temp: 24,
      condition: "Rainy",
      forecast: [
        { day: 'Mon', high: 26, low: 18, condition: 'Rainy' },
        { day: 'Tue', high: 28, low: 20, condition: 'Sunny' },
        { day: 'Wed', high: 25, low: 19, condition: 'Cloudy' },
        { day: 'Thu', high: 24, low: 18, condition: 'Rainy' },
        { day: 'Fri', high: 27, low: 19, condition: 'Sunny' }
      ]
    };

    res.status(200).json({ success: true, data: mockWeather });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch weather data' });
  }
};
