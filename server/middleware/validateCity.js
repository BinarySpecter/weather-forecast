import { AppError } from '../utils/AppError.js';

const CITY_PATTERN = /^[\p{L}\p{M}\s.'-]+$/u;
const MAX_CITY_LENGTH = 85;

export function validateCity(req, res, next) {
  const rawCity = req.query.city;

  if (typeof rawCity !== 'string') {
    return next(
      new AppError(400, 'Please provide a city name using the "city" query parameter.', 'CITY_REQUIRED')
    );
  }

  const city = rawCity.trim().replace(/\s+/g, ' ');

  if (!city) {
    return next(new AppError(400, 'Please enter a city name to search.', 'CITY_REQUIRED'));
  }

  if (city.length > MAX_CITY_LENGTH) {
    return next(
      new AppError(400, 'That city name is too long. Please use a shorter search term.', 'CITY_TOO_LONG')
    );
  }

  if (!CITY_PATTERN.test(city)) {
    return next(
      new AppError(
        400,
        'City names can only contain letters, spaces, hyphens, apostrophes and periods.',
        'CITY_INVALID'
      )
    );
  }

  req.city = city;
  return next();
}
