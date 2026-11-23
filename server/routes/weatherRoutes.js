import { Router } from 'express';
import { getCurrentWeather, getForecast } from '../controllers/weatherController.js';
import { validateCity } from '../middleware/validateCity.js';

const router = Router();

router.get('/weather', validateCity, getCurrentWeather);
router.get('/forecast', validateCity, getForecast);

export default router;
