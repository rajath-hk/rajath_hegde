'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Thermometer, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Weather = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock weather data
  const weatherData = {
    location: 'Bengaluru, India',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 7,
    hourlyForecast: [
      { time: 'Now', temp: 28, condition: 'Partly Cloudy' },
      { time: '1 PM', temp: 30, condition: 'Sunny' },
      { time: '2 PM', temp: 31, condition: 'Sunny' },
      { time: '3 PM', temp: 30, condition: 'Partly Cloudy' },
      { time: '4 PM', temp: 29, condition: 'Cloudy' },
      { time: '5 PM', temp: 28, condition: 'Cloudy' },
      { time: '6 PM', temp: 27, condition: 'Partly Cloudy' },
      { time: '7 PM', temp: 26, condition: 'Cloudy' },
    ],
    weeklyForecast: [
      { day: 'Today', high: 31, low: 24, condition: 'Partly Cloudy' },
      { day: 'Tue', high: 29, low: 23, condition: 'Rainy' },
      { day: 'Wed', high: 27, low: 22, condition: 'Cloudy' },
      { day: 'Thu', high: 28, low: 23, condition: 'Sunny' },
      { day: 'Fri', high: 30, low: 24, condition: 'Sunny' },
      { day: 'Sat', high: 29, low: 24, condition: 'Partly Cloudy' },
      { day: 'Sun', high: 28, low: 23, condition: 'Rainy' },
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="h-12 w-12 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="h-12 w-12 text-gray-500" />;
      case 'snowy':
        return <CloudSnow className="h-12 w-12 text-blue-200" />;
      case 'partly cloudy':
        return <Cloud className="h-12 w-12 text-gray-400" />;
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />;
    }
  };

  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Weather</h1>
      
      {/* Current Weather */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{weatherData.location}</span>
            </div>
            <span className="text-sm font-normal">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              {getWeatherIcon(weatherData.condition)}
              <div>
                <div className="text-6xl font-light">{weatherData.temperature}°</div>
                <div className="text-muted-foreground">{weatherData.condition}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-sm text-muted-foreground">Humidity</div>
                <div>{weatherData.humidity}%</div>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="h-5 w-5 text-gray-500 mb-1" />
                <div className="text-sm text-muted-foreground">Wind</div>
                <div>{weatherData.windSpeed} km/h</div>
              </div>
              <div className="flex flex-col items-center">
                <Eye className="h-5 w-5 text-gray-500 mb-1" />
                <div className="text-sm text-muted-foreground">Visibility</div>
                <div>{weatherData.visibility} km</div>
              </div>
              <div className="flex flex-col items-center">
                <Thermometer className="h-5 w-5 text-red-500 mb-1" />
                <div className="text-sm text-muted-foreground">UV Index</div>
                <div>{weatherData.uvIndex}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Hourly Forecast */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {weatherData.hourlyForecast.map((hour, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px]">
                <div className="text-sm text-muted-foreground">{hour.time}</div>
                <div className="my-2">
                  {getWeatherIcon(hour.condition)}
                </div>
                <div className="font-medium">{hour.temp}°</div>
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
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="w-16 font-medium">{day.day}</div>
                <div className="flex items-center gap-2">
                  {getWeatherIcon(day.condition)}
                  <span className="text-sm text-muted-foreground capitalize">{day.condition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-muted-foreground">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;