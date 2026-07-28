"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  TreePine, Wind, Droplets, Waves, Leaf, Activity, Factory, 
  Sun, TrendingUp, ShieldCheck 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import { getAirQualityData } from "@/lib/weather";
import { SkeletonCard, ErrorState } from "@/components/ui/shared";

export default function EnvironmentPage() {
  const [mounted, setMounted] = useState(false);
  const [aqiData, setAqiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchAqi = async () => {
      try {
        const data = await getAirQualityData(6.9271, 79.8612); // Colombo
        if (data) {
          setAqiData(data);
        } else {
          setError("Failed to fetch air quality data");
        }
      } catch (err) {
        setError("Error connecting to AQI service");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAqi();
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <PageHeader title="Environmental Intelligence" description="Loading real-time environmental telemetry..." />
        <SkeletonCard rows={10} />
      </div>
    );
  }

  if (error || !aqiData) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <PageHeader title="Environmental Intelligence" description="Data unavailable" />
        <ErrorState title="Telemetry Offline" message={error || "Could not connect to Open-Meteo Air Quality API."} />
      </div>
    );
  }

  const currentAqi = aqiData.current.european_aqi;
  const pm10 = aqiData.current.pm10;
  const pm25 = aqiData.current.pm2_5;
  const ozone = aqiData.current.ozone;

  // 1. Air Quality Gauge
  const aqiOptions = {
    tooltip: { formatter: '{a} <br/>{b} : {c}' },
    series: [
      {
        name: 'European AQI',
        type: 'gauge',
        startAngle: 180, endAngle: 0,
        center: ['50%', '75%'], radius: '100%',
        min: 0, max: 100, // European AQI typically 0-100
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.2, '#10B981'], // Good
              [0.4, '#EAB308'], // Fair
              [0.6, '#F97316'], // Moderate
              [0.8, '#EF4444'], // Poor
              [1, '#8B5CF6']    // Very Poor
            ]
          }
        },
        pointer: { icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z', length: '12%', width: 10, offsetCenter: [0, '-60%'], itemStyle: { color: 'auto' } },
        axisTick: { length: 12, lineStyle: { color: 'auto', width: 2 } },
        splitLine: { length: 20, lineStyle: { color: 'auto', width: 5 } },
        axisLabel: { color: '#94A3B8', distance: -40, fontSize: 10 },
        title: { offsetCenter: [0, '-20%'], fontSize: 14, color: '#94A3B8' },
        detail: { fontSize: 30, offsetCenter: [0, '0%'], valueAnimation: true, formatter: '{value}', color: '#fff', fontWeight: 'bold' },
        data: [{ value: currentAqi, name: 'European AQI' }]
      }
    ]
  };

  // 2. Reservoir Levels Bar Chart
  const reservoirOptions = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: ['Victoria', 'Randenigala', 'Kotmale', 'Samanala', 'Castlereagh'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8', interval: 0, rotate: 30 } },
    yAxis: { type: 'value', max: 100, axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value}%', color: '#94A3B8' } },
    series: [{
      data: [85, 78, 92, 72, 65],
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#2563EB' }, { offset: 1, color: '#38BDF8' }] }
      }
    }]
  };

  // 3. Carbon Emissions Stacked Area
  const carbonOptions = {
    tooltip: { trigger: 'axis', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    legend: { data: ['Transport', 'Industry', 'Energy', 'Agriculture'], textStyle: { color: '#94A3B8' }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value} Mt', color: '#94A3B8' } },
    series: [
      { name: 'Transport', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, itemStyle: { color: '#EF4444' }, data: [12, 13, 14, 15, 16, 13, 14, 15, 16, 17] },
      { name: 'Industry', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, itemStyle: { color: '#F97316' }, data: [8, 8, 9, 9, 10, 9, 10, 11, 11, 12] },
      { name: 'Energy', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, itemStyle: { color: '#EAB308' }, data: [15, 16, 17, 18, 19, 18, 19, 20, 21, 21] },
      { name: 'Agriculture', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, itemStyle: { color: '#10B981' }, data: [5, 5, 6, 6, 6, 6, 7, 7, 7, 8] }
    ]
  };

  // 4. Forest Coverage Donut
  const forestOptions = {
    tooltip: { trigger: 'item', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    legend: { orient: 'vertical', left: 'right', textStyle: { color: '#94A3B8' } },
    series: [
      {
        name: 'Coverage',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#0F172A', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: '18', fontWeight: 'bold', color: '#fff' } },
        labelLine: { show: false },
        data: [
          { value: 29.7, name: 'Dense Forest', itemStyle: { color: '#10B981' } },
          { value: 15.3, name: 'Open Forest', itemStyle: { color: '#38BDF8' } },
          { value: 8.4, name: 'Plantations', itemStyle: { color: '#EAB308' } },
          { value: 46.6, name: 'Non-Forest', itemStyle: { color: '#334155' } }
        ]
      }
    ]
  };

  // 5. Pollutants Radar
  const pollutantsRadar = {
    tooltip: { backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    radar: {
      indicator: [
        { name: 'PM10', max: 100 },
        { name: 'PM2.5', max: 100 },
        { name: 'Ozone', max: 100 },
        { name: 'CO', max: 1000 },
        { name: 'NO2', max: 100 },
        { name: 'SO2', max: 100 }
      ],
      axisName: { color: '#94A3B8', fontSize: 10 },
      splitLine: { lineStyle: { color: ['#334155'] } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#334155' } }
    },
    series: [
      {
        name: 'Colombo Pollutants',
        type: 'radar',
        data: [
          { 
            value: [pm10, pm25, ozone, aqiData.current.carbon_monoxide, aqiData.current.nitrogen_dioxide, aqiData.current.sulphur_dioxide], 
            name: 'Current Levels', 
            itemStyle: { color: '#38BDF8' }, 
            areaStyle: { opacity: 0.3 } 
          }
        ]
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader 
        title="Environmental Intelligence" 
        description="Monitor Sri Lanka's ecological health, emissions, and natural resource stability in real-time."
        icon={<TreePine className="h-8 w-8 text-safe" />} 
      />

      {/* Top Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <StatCard title="National AQI" value={currentAqi} unit="EAQI" icon={Wind} color="text-safe" />
        <StatCard title="PM 2.5 Level" value={pm25} unit="μg/m³" icon={Activity} color="text-warning" />
        <StatCard title="Ozone Level" value={ozone} unit="μg/m³" icon={Wind} color="text-secondary" />
        <StatCard title="Forest Cover" value="29.7" unit="%" icon={Leaf} color="text-safe" />
        <StatCard title="Avg Sea Lvl Rise" value="+3.2" unit="mm/yr" icon={TrendingUp} color="text-danger" className="col-span-2 md:col-span-4 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Air Quality (Gauge) */}
        <Card className="glass-card border-white/5 lg:col-span-1 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Wind className="h-5 w-5 text-safe" /> Live Air Quality (Colombo)
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Real-time European AQI fetched from Open-Meteo.</p>
            <div className="flex-1 min-h-[200px] -mt-4">
              <ReactECharts option={aqiOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Reservoir Levels (Bar) */}
        <Card className="glass-card border-white/5 lg:col-span-2 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Major Reservoir Capacities
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Tracking hydroelectric and irrigation storage levels against maximum capacity.</p>
            <div className="flex-1 min-h-[250px]">
              <ReactECharts option={reservoirOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Carbon & GHG Emissions (Area) */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Factory className="h-5 w-5 text-warning" /> Carbon & GHG Emissions Profile
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Historical tracking of MT CO2 equivalent across major national sectors.</p>
            <div className="h-[300px] w-full">
              <ReactECharts option={carbonOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Pollutants (Radar) */}
        <Card className="glass-card border-white/5 lg:col-span-1">
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-secondary" /> Atmospheric Pollutants
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Real-time breakdown of major air pollutants (μg/m³).</p>
            <div className="flex-1 min-h-[250px]">
              <ReactECharts option={pollutantsRadar} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Forest Coverage (Donut) */}
        <Card className="glass-card border-white/5 md:col-span-2">
          <CardContent className="p-6 flex flex-col h-full">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <TreePine className="h-5 w-5 text-safe" /> National Forest Coverage
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Satellite-derived classification of land usage.</p>
            <div className="flex-1 min-h-[200px] flex items-center">
              <div className="w-full h-full relative">
                <ReactECharts option={forestOptions} style={{ height: '100%', width: '100%' }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white block">29.7%</span>
                    <span className="text-xs text-muted-foreground">Forested</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biodiversity Index */}
        <Card className="glass-card border-safe/20 bg-safe/5 relative overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col justify-center relative z-10">
            <Leaf className="h-10 w-10 text-safe mb-4 opacity-80" />
            <h3 className="font-semibold text-white text-lg mb-1">Biodiversity Health Index</h3>
            <div className="text-4xl font-bold text-white mb-2">82.4 <span className="text-lg text-safe">/ 100</span></div>
            <p className="text-sm text-safe/80">Ecosystem stability remains strong in the central highlands.</p>
          </CardContent>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <TreePine className="h-48 w-48 text-safe" />
          </div>
        </Card>

        {/* Heat Islands */}
        <Card className="glass-card border-danger/20 bg-danger/5 relative overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col justify-center relative z-10">
            <Sun className="h-10 w-10 text-danger mb-4 opacity-80" />
            <h3 className="font-semibold text-white text-lg mb-1">Urban Heat Islands</h3>
            <div className="text-4xl font-bold text-white mb-2">+4.2°C</div>
            <p className="text-sm text-danger/80">Colombo metro area records significantly higher thermal retention.</p>
          </CardContent>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <Sun className="h-48 w-48 text-danger" />
          </div>
        </Card>

      </div>

    </div>
  );
}

function StatCard({ title, value, unit, icon: Icon, color, className = "" }: any) {
  return (
    <Card className={`glass-card border-white/5 ${className}`}>
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className={`text-xs font-semibold ${color}`}>{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
