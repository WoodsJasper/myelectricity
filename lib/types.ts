export type EnergySource = 'solar' | 'wind' | 'hybrid';
export type ConnectionType = 'cloud_api'|'local_network'|'modbus'|'ct_clamp'|'manual';
export type InverterStatus = 'normal'|'warning'|'offline'|'fault';
export type ConnectionStatus = 'online'|'offline'|'degraded';
export interface User { id:string; name:string; email:string; }
export interface Site { id:string; userId:string; name:string; postcode?:string; source:EnergySource; installedCapacityKw:number; }
export interface Device { id:string; siteId:string; name:string; type:'inverter'|'solar_array'|'wind_turbine'|'battery'|'grid_meter'; status:ConnectionStatus; lastSeen:string; firmware?:string; connectionType:ConnectionType; plainStatus:string; }
export interface Inverter extends Device { type:'inverter'; manufacturer:string; model:string; }
export interface Tariff { importPricePerKwh:number; exportPricePerKwh:number; standingChargePerDay?:number; currency:'GBP'; }
export interface EnergyReading { timestamp:string; currentPowerKw:number; energyTodayKwh:number; energyLifetimeKwh:number; sourceBreakdown:{solarKw:number; windKw:number}; importedKwh:number; exportedKwh:number; batterySoc?:number; inverterStatus:InverterStatus; connectionStatus:ConnectionStatus; }
export interface Insight { id:string; title:string; body:string; tone:'good'|'neutral'|'warning'; confidence:string; }
export interface Alert { id:string; title:string; body:string; severity:'info'|'warning'|'critical'; }
export interface IntegrationProvider { id:string; providerName:string; connectionTypes:ConnectionType[]; supports:EnergySource[]; }
export interface DateRange { from:Date; to:Date; granularity?:'hour'|'day'|'week'|'month'; }
