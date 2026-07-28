export async function geocodeLocation(query: string) {
  try {
    // Append Sri Lanka to ensure we search mostly within the country
    const searchParams = new URLSearchParams({
      name: query,
      count: "1",
      language: "en",
      format: "json",
    });

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${searchParams}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name: result.name,
        country: result.country,
        admin1: result.admin1,
        lat: result.latitude,
        lng: result.longitude,
      };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
}

export async function getWeatherData(lat: number, lng: number) {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,visibility",
      hourly: "temperature_2m,precipitation_probability",
      daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
      timezone: "auto",
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function getMarineData(lat: number, lng: number) {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      current: "wave_height,wave_direction,wave_period",
      hourly: "wave_height,wave_direction,wave_period",
      timezone: "auto",
    });

    const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?${params}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching marine data:", error);
    return null;
  }
}

export async function getAirQualityData(lat: number, lng: number) {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      current: "european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust",
      hourly: "european_aqi,pm10,pm2_5",
      timezone: "auto",
    });

    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
}
