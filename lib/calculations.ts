import { Alert, Device, EnergyReading, Tariff } from './types';
export const gbp = (value:number) => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(value);
export const kwhToImportSaving = (kwh:number, tariff:Tariff) => kwh * tariff.importPricePerKwh;
export const exportRevenue = (kwh:number, tariff:Tariff) => kwh * tariff.exportPricePerKwh;
export const totalFinancialBenefit = (usedAtHomeKwh:number, exportedKwh:number, tariff:Tariff) => kwhToImportSaving(usedAtHomeKwh, tariff) + exportRevenue(exportedKwh, tariff);
export const co2AvoidedKg = (kwh:number) => kwh * 0.162;
export const dailyAverage = (values:number[]) => values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0;
export const monthlyTotal = (values:number[]) => values.reduce((a,b)=>a+b,0);
export const percentageComparison = (current:number, previous:number) => previous ? ((current-previous)/previous)*100 : 0;
export function detectAnomalies(reading:EnergyReading, devices:Device[], now = new Date()): Alert[] { const alerts:Alert[]=[]; const hour=now.getHours(); if(reading.currentPowerKw===0 && hour>=10 && hour<=15){alerts.push({id:'zero-daylight',title:'Check generation',body:'Output is zero during a time when your system would usually be making power.',severity:'warning'});} devices.forEach(d=>{const mins=(now.getTime()-new Date(d.lastSeen).getTime())/60000; if(mins>20) alerts.push({id:`offline-${d.id}`,title:'Check connection',body:`We have not heard from your ${d.name.toLowerCase()} for ${Math.round(mins)} minutes.`,severity:'warning'});}); return alerts; }
