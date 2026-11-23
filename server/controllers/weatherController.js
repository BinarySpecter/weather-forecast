import { fetchCurrentWeather, fetchForecast } from '../services/openWeatherService.js';
import { mapCurrentWeather, mapForecast } from '../services/weatherMapper.js';

export async function getCurrentWeather(req, res, next) {
  const { city } = req.query;

  try {
    const raw = await fetchCurrentWeather(city);

    res.status(200).json({
      success: true,
      data: mapCurrentWeather(raw),
    });
  } catch (error) {
    next(error);
  }
}

export async function getForecast(req, res, next) {
  const { city } = req.query;

  try {
    const raw = await fetchForecast(city);
    const forecast = mapForecast(raw);

    res.status(200).json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    next(error);
  }
}
