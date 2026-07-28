"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  Cloud, Search, MapPin, Thermometer, Wind, Droplets, Activity, 
  Eye, Sun, Moon, Sunrise, Sunset, CloudLightning, ShieldCheck, CloudRain
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactECharts from "echarts-for-react";
import { geocodeLocation, getWeatherData } from "@/lib/weather";
import { SkeletonCard, ErrorState } from "@/components/ui/shared";

export default function WeatherPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const [locationName, setLocationName] = useState("Colombo, Western Province");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Default to Colombo
  const fetchWeather = async (lat = 6.9271, lng = 79.8612, locName = "Colombo, Western Province") => {
    setIsSearching(true);
    setError(null);
    try {
      const data = await getWeatherData(lat, lng);
      if (data) {
        setWeatherData(data);
        setLocationName(locName);
      } else {
        setError("Unable to fetch weather data.");
      }
    } catch (err) {
      setError("An error occurred while fetching weather data.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchWeather(); // Fetch for Colombo initially
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const result = await geocodeLocation(`${searchQuery}, Sri Lanka`);
      if (result) {
        const nameParts = [result.name];
        if (result.admin1) nameParts.push(result.admin1);
        if (result.country && result.country !== "Sri Lanka") nameParts.push(result.country);
        
        await fetchWeather(result.lat, result.lng, nameParts.join(", "));
      } else {
        setError(`Location "${searchQuery}" not found. Try a different city in Sri Lanka.`);
      }
    } catch (err) {
      setError("Failed to geocode location.");
    } finally {
      setIsSearching(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <PageHeader 
          title="Weather Intelligence" 
          description="Real-time, hyper-local weather predictions and atmospheric conditions."
          icon={<Cloud className="h-8 w-8 text-secondary" />} 
        />
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any location in Sri Lanka..."
            className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md transition-all"
          />
          <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-8" disabled={isSearching}>
            {isSearching ? "Searching..." : "Locate"}
          </Button>
        </form>
      </div>

      {error && (
        <ErrorState title="Error" message={error} onRetry={() => fetchWeather()} />
      )}

      {isSearching && !weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
             <SkeletonCard rows={5} />
          </div>
          <div className="lg:col-span-8">
             <SkeletonCard rows={10} />
          </div>
        </div>
      )}

      {!isSearching && weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Current Weather Focus */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <Card className="glass-card border-primary/20 flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-white">{locationName}</h2>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-6xl font-bold text-white tracking-tighter mb-2">
                      {Math.round(weatherData.current.temperature_2m)}°
                    </div>
                    <div className="text-lg text-secondary font-medium">
                      {weatherData.current.cloud_cover > 50 ? "Cloudy" : weatherData.current.precipitation > 0 ? "Rainy" : "Mostly Sunny"}
                    </div>
                  </div>
                  {weatherData.current.precipitation > 0 ? (
                    <CloudRain className="h-24 w-24 text-primary animate-pulse" />
                  ) : weatherData.current.cloud_cover > 50 ? (
                    <Cloud className="h-24 w-24 text-muted-foreground" />
                  ) : (
                    <Sun className="h-24 w-24 text-warning animate-[spin_60s_linear_infinite]" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Thermometer className="h-3 w-3" /> Feels Like</span>
                    <span className="text-xl font-semibold text-white">{Math.round(weatherData.current.apparent_temperature)}°C</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</span>
                    <span className="text-xl font-semibold text-white">{weatherData.current.relative_humidity_2m}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</span>
                    <span className="text-xl font-semibold text-white">{weatherData.current.wind_speed_10m} km/h</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Activity className="h-3 w-3" /> Pressure</span>
                    <span className="text-xl font-semibold text-white">{weatherData.current.surface_pressure} hPa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Astro Data */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card border-white/5">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                  <Sunrise className="h-8 w-8 text-warning mb-2" />
                  <span className="text-lg font-bold text-white">
                    {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs text-muted-foreground">Sunrise</span>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/5">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                  <Sunset className="h-8 w-8 text-primary mb-2" />
                  <span className="text-lg font-bold text-white">
                    {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs text-muted-foreground">Sunset</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Charts & Timeline */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <MetricCard title="Visibility" value={`${(weatherData.current.visibility / 1000).toFixed(1)} km`} icon={Eye} />
               <MetricCard title="Cloud Cover" value={`${weatherData.current.cloud_cover}%`} icon={Cloud} />
               <MetricCard title="UV Index" value={weatherData.daily.uv_index_max[0]} icon={Sun} color="text-warning" />
               <MetricCard title="Precipitation" value={`${weatherData.current.precipitation} mm`} icon={Droplets} color="text-primary" />
            </div>

            <Card className="glass-card border-white/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-white text-lg">Hourly Forecast (Next 24h)</h3>
                  <div className="flex items-center gap-2 bg-safe/20 text-safe px-3 py-1 rounded-full text-xs font-medium border border-safe/30">
                    <ShieldCheck className="h-3 w-3" /> Live API Data
                  </div>
                </div>
                <div className="h-[250px] w-full">
                  <ReactECharts 
                    option={{
                      tooltip: { trigger: 'axis', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
                      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                      xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: weatherData.hourly.time.slice(0, 24).map((t: string) => new Date(t).toLocaleTimeString('en-US', { hour: 'numeric' })),
                        axisLine: { lineStyle: { color: '#334155' } },
                        axisLabel: { color: '#94A3B8' }
                      },
                      yAxis: {
                        type: 'value',
                        axisLine: { show: false },
                        splitLine: { lineStyle: { color: '#334155', type: 'dashed' } },
                        axisLabel: { color: '#94A3B8', formatter: '{value} °C' }
                      },
                      series: [
                        {
                          name: 'Temperature',
                          type: 'line',
                          smooth: true,
                          data: weatherData.hourly.temperature_2m.slice(0, 24),
                          itemStyle: { color: '#38BDF8' },
                          areaStyle: {
                            color: {
                              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                              colorStops: [{ offset: 0, color: 'rgba(56,189,248,0.5)' }, { offset: 1, color: 'rgba(56,189,248,0)' }]
                            }
                          }
                        },
                        {
                          name: 'Rain Prob (%)',
                          type: 'bar',
                          yAxisIndex: 0,
                          data: weatherData.hourly.precipitation_probability.slice(0, 24),
                          itemStyle: { color: 'rgba(37,99,235,0.3)' }
                        }
                      ]
                    }} 
                    style={{ height: '100%', width: '100%' }} 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 7-Day Forecast */}
              <Card className="glass-card border-white/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white text-lg mb-6">7-Day Outlook</h3>
                  <div className="space-y-4">
                    {weatherData.daily.time.slice(0, 7).map((time: string, i: number) => {
                      const max = Math.round(weatherData.daily.temperature_2m_max[i]);
                      const min = Math.round(weatherData.daily.temperature_2m_min[i]);
                      const dayName = new Date(time).toLocaleDateString('en-US', { weekday: 'short' });
                      const isRainy = weatherData.daily.precipitation_probability_max?.[i] > 40;
                      const DayIcon = isRainy ? CloudRain : Sun;

                      return (
                        <div key={time} className="flex items-center justify-between">
                          <span className="w-10 text-muted-foreground font-medium">{i === 0 ? "Today" : dayName}</span>
                          <DayIcon className="h-5 w-5 text-white" />
                          <div className="flex-1 mx-4 h-1.5 bg-black/40 rounded-full overflow-hidden flex">
                             <div className="h-full bg-secondary/50 rounded-l-full" style={{ width: `${(min / 40) * 100}%` }} />
                             <div className="h-full bg-warning rounded-r-full" style={{ width: `${((max - min) / 40) * 100}%` }} />
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-muted-foreground">{min}°</span>
                            <span className="text-white font-bold">{max}°</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Radar Mini-map (Simulated) */}
              <Card className="glass-card border-white/5 relative overflow-hidden group">
                <CardContent className="p-0 h-full min-h-[300px]">
                   <div className="absolute top-4 left-4 z-10">
                     <h3 className="font-semibold text-white text-lg bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md">Live Radar</h3>
                   </div>
                   <div className="absolute inset-0 bg-[#0F172A]">
                      <div className="absolute inset-0 opacity-50 bg-[url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/8/125/185')] bg-cover bg-center filter grayscale contrast-150" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/40 rounded-full blur-2xl animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-danger/50 rounded-full blur-xl animate-ping" />
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 justify-center bg-black/60 backdrop-blur-md p-2 rounded-xl">
                     <span className="h-2 w-8 rounded-full bg-safe/50"></span>
                     <span className="h-2 w-8 rounded-full bg-warning/50"></span>
                     <span className="h-2 w-8 rounded-full bg-danger/50"></span>
                     <span className="h-2 w-8 rounded-full bg-extreme/50"></span>
                   </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color = "text-primary" }: any) {
  return (
    <Card className="glass-card border-white/5">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div className="text-xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
