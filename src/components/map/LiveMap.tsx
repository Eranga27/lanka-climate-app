"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  ThermometerSun, Droplets, Wind, Activity, Sun, AlertTriangle, 
  Map as MapIcon, Cloud, CloudLightning, Waves, X, Layers, Maximize, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Fix leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Base map options
const BASE_MAPS = {
  satellite: { name: "Satellite", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" },
  dark: { name: "Dark Mode", url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" },
  terrain: { name: "Terrain", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}" },
  road: { name: "Roadmap", url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" }
};

const LAYERS = [
  { id: "temp", name: "Temperature", icon: ThermometerSun, color: "text-warning" },
  { id: "rain", name: "Rainfall", icon: Droplets, color: "text-primary" },
  { id: "humidity", name: "Humidity", icon: Cloud, color: "text-secondary" },
  { id: "wind", name: "Wind", icon: Wind, color: "text-muted-foreground" },
  { id: "pressure", name: "Pressure", icon: Activity, color: "text-white" },
  { id: "cloud", name: "Cloud Cover", icon: Cloud, color: "text-white/70" },
  { id: "lightning", name: "Lightning", icon: CloudLightning, color: "text-warning" },
  { id: "flood", name: "Flood Risk", icon: Waves, color: "text-primary" },
  { id: "landslide", name: "Landslide Risk", icon: AlertTriangle, color: "text-danger" },
  { id: "heat", name: "Heat Index", icon: Sun, color: "text-elevated" },
  { id: "aqi", name: "Air Quality", icon: Activity, color: "text-safe" },
  { id: "uv", name: "UV Index", icon: Sun, color: "text-warning" },
  { id: "oceanTemp", name: "Ocean Temperature", icon: ThermometerSun, color: "text-primary" },
  { id: "currents", name: "Ocean Currents", icon: Waves, color: "text-secondary" },
  { id: "cyclone", name: "Cyclone Paths", icon: Wind, color: "text-extreme" },
];

const DISTRICTS = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612, temp: 31, rain: 0, aqi: 45, alert: "None" },
  { name: "Galle", lat: 6.0328, lng: 80.2170, temp: 29, rain: 5, aqi: 30, alert: "High Tide" },
  { name: "Kandy", lat: 7.2906, lng: 80.6337, temp: 26, rain: 2, aqi: 20, alert: "None" },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255, temp: 34, rain: 0, aqi: 50, alert: "Heat Advisory" },
  { name: "Trincomalee", lat: 8.5811, lng: 81.2330, temp: 33, rain: 0, aqi: 40, alert: "None" },
  { name: "Nuwara Eliya", lat: 6.9497, lng: 80.7839, temp: 18, rain: 15, aqi: 15, alert: "Heavy Rain" },
  { name: "Ratnapura", lat: 6.6828, lng: 80.3992, temp: 30, rain: 25, aqi: 25, alert: "Flood Warning" },
  { name: "Anuradhapura", lat: 8.3114, lng: 80.4037, temp: 35, rain: 0, aqi: 35, alert: "Drought Risk" },
  { name: "Batticaloa", lat: 7.7170, lng: 81.6970, temp: 32, rain: 0, aqi: 32, alert: "None" },
  { name: "Badulla", lat: 6.9934, lng: 81.0550, temp: 24, rain: 5, aqi: 18, alert: "None" },
  { name: "Kurunegala", lat: 7.4818, lng: 80.3609, temp: 33, rain: 0, aqi: 42, alert: "None" },
  { name: "Matara", lat: 5.9549, lng: 80.5420, temp: 30, rain: 10, aqi: 28, alert: "High Surf" },
  { name: "Puttalam", lat: 8.0330, lng: 79.8260, temp: 34, rain: 0, aqi: 38, alert: "None" },
  { name: "Hambantota", lat: 6.1248, lng: 81.1185, temp: 32, rain: 0, aqi: 26, alert: "Strong Winds" },
  { name: "Mannar", lat: 8.9810, lng: 79.9044, temp: 33, rain: 0, aqi: 45, alert: "None" },
];

// Custom HTML Bubble Marker
const createTemperatureIcon = (temp: number, alert: string) => {
  const isDanger = alert.includes("Warning") || alert.includes("Heavy") || alert.includes("Heat") || alert.includes("Risk");
  const bgColor = isDanger ? "bg-red-500" : "bg-blue-500/80";
  const glow = isDanger ? "shadow-[0_0_15px_rgba(239,68,68,0.7)]" : "shadow-[0_0_15px_rgba(59,130,246,0.5)]";
  
  return L.divIcon({
    className: "custom-div-icon bg-transparent border-none",
    html: `<div class="flex items-center justify-center w-10 h-10 rounded-full ${bgColor} ${glow} text-white font-bold text-sm border-2 border-white/50 backdrop-blur-md transition-transform hover:scale-110">
             ${temp}°
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Helper to pan to location
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);

  useEffect(() => {
    // Force Leaflet to recalculate container size
    map.invalidateSize();
    const timeout = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}

export default function LiveMap() {
  const [baseMap, setBaseMap] = useState<keyof typeof BASE_MAPS>("satellite");
  const [activeLayers, setActiveLayers] = useState<string[]>(["temp"]);
  const [selectedDistrict, setSelectedDistrict] = useState<typeof DISTRICTS[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([7.8731, 80.7718]);
  const [mapZoom, setMapZoom] = useState(7);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleDistrictClick = (district: typeof DISTRICTS[0]) => {
    setSelectedDistrict(district);
    setMapCenter([district.lat, district.lng]);
    setMapZoom(10);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className={`absolute inset-0 bg-[#0F172A] overflow-hidden ${isFullscreen ? 'z-[100]' : 'z-0'}`}>
      
      {/* Left Sidebar - Layer Controls */}
      <div className="absolute left-4 top-20 bottom-4 w-64 z-[1000] flex flex-col gap-4 pointer-events-none hidden md:flex">
        
        {/* Base Map Selector */}
        <div className="glass-card rounded-2xl p-4 pointer-events-auto border border-white/10">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-primary" /> Map View
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(BASE_MAPS).map(([key, map]) => (
              <button
                key={key}
                onClick={() => setBaseMap(key as keyof typeof BASE_MAPS)}
                className={`text-xs py-1.5 px-2 rounded-md transition-all ${
                  baseMap === key ? "bg-primary text-white shadow-md" : "bg-black/20 text-muted-foreground hover:text-white hover:bg-white/10"
                }`}
              >
                {map.name}
              </button>
            ))}
          </div>
        </div>

        {/* Data Layers */}
        <div className="glass-card rounded-2xl p-4 pointer-events-auto border border-white/10 flex-1 overflow-y-auto no-scrollbar mask-edges pb-8">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2 sticky top-0 bg-[#1E293B]/90 backdrop-blur-md pt-1 pb-2 z-10">
            <Layers className="h-4 w-4 text-secondary" /> Data Layers
          </h3>
          <div className="space-y-1">
            {LAYERS.map((layer) => {
              const isActive = activeLayers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <layer.icon className={`h-4 w-4 ${isActive ? layer.color : ""}`} />
                  <span className="text-sm font-medium text-left flex-1">{layer.name}</span>
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={[7.8731, 80.7718]} 
          zoom={7} 
          zoomControl={false}
          className="w-full h-full bg-[#0F172A]"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <TileLayer
            url={BASE_MAPS[baseMap].url}
            attribution='Map data &copy; <a href="https://www.google.com/maps">Google</a>'
          />
          <ZoomControl position="bottomright" />
          <MapController center={mapCenter} zoom={mapZoom} />
          
          {/* District Markers */}
          {DISTRICTS.map((district) => (
            <Marker 
              key={district.name} 
              position={[district.lat, district.lng]}
              icon={createTemperatureIcon(district.temp, district.alert)}
              eventHandlers={{
                click: () => handleDistrictClick(district)
              }}
            >
              <Popup className="bg-[#1E293B] border border-white/10 text-white rounded-xl shadow-2xl">
                <div className="p-1">
                  <h4 className="font-bold text-lg mb-1">{district.name}</h4>
                  <div className="text-sm space-y-1">
                    <p>Temp: <span className="text-warning font-semibold">{district.temp}°C</span></p>
                    <p>Rain: <span className="text-primary font-semibold">{district.rain}mm</span></p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground border-t border-white/10 pt-2">Click marker to open panel</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* El Nino / Ocean Temperature Anomalies */}
          {(activeLayers.includes("oceanTemp") || activeLayers.includes("currents")) && (
            <>
              {/* Warm anomaly off the east/south coast */}
              <Circle 
                center={[5.5, 82.0]} 
                radius={150000} 
                pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.3, weight: 0 }} 
              />
              <Circle 
                center={[4.0, 81.0]} 
                radius={250000} 
                pathOptions={{ color: '#F97316', fillColor: '#F97316', fillOpacity: 0.2, weight: 0 }} 
              />
              <Circle 
                center={[7.0, 78.0]} 
                radius={100000} 
                pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.2, weight: 0 }} 
              />
            </>
          )}

          {/* Simulated Animated Radar Overlay (when Temp/Rain layers are active) */}
          {activeLayers.includes("rain") && (
            <div className="leaflet-pane leaflet-overlay-pane pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000">
               {/* This is a simulated visual overlay using SVG for the map */}
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <circle cx="50" cy="50" r="30" fill="url(#rainRad)" className="animate-pulse" />
                  <defs>
                    <radialGradient id="rainRad">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
               </svg>
            </div>
          )}
        </MapContainer>

        {/* Global Map Controls (Top Right) */}
        <div className="absolute top-20 right-4 z-[1000] flex flex-col gap-2">
          <Button variant="secondary" size="icon" onClick={toggleFullscreen} className="bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white rounded-xl shadow-lg">
            <Maximize className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => { setMapCenter([7.8731, 80.7718]); setMapZoom(7); }} className="bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white rounded-xl shadow-lg">
            <Globe className="h-5 w-5" />
          </Button>
        </div>

        {/* District Information Panel */}
        <AnimatePresence>
          {selectedDistrict && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-4 top-20 bottom-4 w-[350px] z-[1000] glass-card rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            >
              {/* Panel Header */}
              <div className="p-5 border-b border-white/5 bg-black/20 flex items-start justify-between relative">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1 block">District Intelligence</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{selectedDistrict.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapIcon className="h-3 w-3" /> {selectedDistrict.lat}, {selectedDistrict.lng}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Panel Content Scrollable */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Primary Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <ThermometerSun className="h-3 w-3" /> Current Temp
                    </div>
                    <div className="text-2xl font-bold text-white">{selectedDistrict.temp}°C</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Droplets className="h-3 w-3 text-primary" /> Precipitation
                    </div>
                    <div className="text-2xl font-bold text-white">{selectedDistrict.rain}mm</div>
                  </div>
                </div>

                {/* Warnings / Alerts */}
                {selectedDistrict.alert !== "None" && (
                  <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-danger">Active Warning</h4>
                      <p className="text-xs text-danger/80 mt-1">{selectedDistrict.alert} reported for this sector. Emergency protocols on standby.</p>
                    </div>
                  </div>
                )}

                {/* Extended Stats */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Environmental Indicators</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Air Quality (AQI)</span>
                      <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${selectedDistrict.aqi > 40 ? 'bg-warning/20 text-warning' : 'bg-safe/20 text-safe'}`}>
                        {selectedDistrict.aqi}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Humidity</span>
                      <span className="text-sm font-semibold text-white">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Wind Speed</span>
                      <span className="text-sm font-semibold text-white">12 km/h</span>
                    </div>
                  </div>
                </div>

                {/* Historical Comparison */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-secondary" /> Historical Comparison
                  </h4>
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Temperature is <span className="text-danger font-semibold">+1.2°C</span> higher than the 10-year historical average for this month. Rainfall deficit is at <span className="text-warning font-semibold">15%</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
