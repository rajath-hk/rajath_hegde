'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets,
  Eye,
  Thermometer,
  Gauge
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Weather = () => {
  const [location, setLocation] = useState('Bengaluru, IN');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 7,
    feelsLike: 32,
    sunrise: '06:15',
    sunset: '18:45',
    hourlyForecast: [
      { time: 'Now', temp: 28, condition: 'Sunny' },
      { time: '1 PM', temp: 30, condition: 'Sunny' },
      { time: '2 PM', temp: 31, condition: 'Sunny' },
      { time: '3 PM', temp: 32, condition: 'Partly Cloudy' },
      { time: '4 PM', temp: 31, condition: 'Partly Cloudy' },
      { time: '5 PM', temp: 29, condition: 'Cloudy' },
      { time: '6 PM', temp: 27, condition: 'Cloudy' },
    ],
    weeklyForecast: [
      { day: 'Today', high: 32, low: 24, condition: 'Sunny' },
      { day: 'Tue', high: 30, low: 23, condition: 'Partly Cloudy' },
      { day: 'Wed', high: 29, low: 22, condition: 'Rainy' },
      { day: 'Thu', high: 27, low: 21, condition: 'Rainy' },
      { day: 'Fri', high: 28, low: 22, condition: 'Partly Cloudy' },
      { day: 'Sat', high: 30, low: 23, condition: 'Sunny' },
      { day: 'Sun', high: 31, low: 24, condition: 'Sunny' },
    ]
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case 'cloudy':
        return <Cloud className="w-10 h-10 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="w-10 h-10 text-blue-300" />;
      default:
        return <Sun className="w-10 h-10 text-yellow-500" />;
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemp = (temp: number) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Weather</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{location}</span>
          <Button variant="outline" size="sm" onClick={toggleUnit}>
            °{unit}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Weather */}
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                {getWeatherIcon(weatherData.condition)}
                <div className="ml-4">
                  <div className="text-5xl font-bold">
                    {convertTemp(weatherData.temperature)}°{unit}
                  </div>
                  <div className="text-muted-foreground">
                    Feels like {convertTemp(weatherData.feelsLike)}°{unit}
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-2xl font-semibold">{weatherData.condition}</div>
                <div className="text-muted-foreground">Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hourly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto pb-2 space-x-4">
              {weatherData.hourlyForecast.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[60px]">
                  <div className="text-sm text-muted-foreground">{hour.time}</div>
                  <div className="my-2">
                    {getWeatherIcon(hour.condition)}
                  </div>
                  <div className="font-medium">
                    {convertTemp(hour.temp)}°{unit}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Weekly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.weeklyForecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="w-16 font-medium">{day.day}</div>
                  <div className="flex-1 flex items-center justify-center">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="w-24 text-right">
                    <span className="font-medium">
                      {convertTemp(day.high)}°{unit}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {convertTemp(day.low)}°{unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Weather Details */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div className="font-medium">{weatherData.humidity}%</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Wind className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Wind</div>
                  <div className="font-medium">{weatherData.windSpeed} km/h</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-medium">{weatherData.visibility} km</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Gauge className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Pressure</div>
                  <div className="font-medium">{weatherData.pressure} hPa</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">UV Index</div>
                  <div className="font-medium">{weatherData.uvIndex}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <div className="text-sm text-muted-foreground">Sunrise/Sunset</div>
                  <div className="font-medium">{weatherData.sunrise}/{weatherData.sunset}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;