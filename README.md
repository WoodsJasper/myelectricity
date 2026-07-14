# my electricity

A production-quality MVP for **my electricity** — a UK consumer web/PWA for homeowners with solar panels, small wind turbines, or hybrid renewable systems.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Build with:

```bash
npm run build
```

## App structure

- `app/` — Next.js App Router pages for landing, dashboard, history, insights, system, setup, and settings.
- `components/` — reusable UI such as AppShell, EnergyOrb, MetricCard, StatusPill, charts, badges, and navigation.
- `lib/types.ts` — Supabase-style TypeScript model for users, sites, devices, readings, tariffs, insights, alerts, and providers.
- `lib/mock-data.ts` — realistic demo readings for a UK hybrid solar/wind home.
- `lib/calculations.ts` — savings, export revenue, CO₂, averages, comparisons, and simple anomaly detection.
- `lib/integrations/adapters.ts` — compatibility layer for inverter integrations.

## Mock data

The MVP uses local mock data: current generation of 2.4 kW, 8.7 kWh today, realistic tariff assumptions of £0.28/kWh import and £0.15/kWh export, source split, device status, and historical generation.

## Adding real inverter integrations

Real providers should implement `InverterAdapter` in `lib/integrations/adapters.ts`:

```ts
interface InverterAdapter {
  providerName: string;
  connectionType: 'cloud_api' | 'local_network' | 'modbus' | 'ct_clamp' | 'manual';
  fetchCurrentReading(siteId: string): Promise<EnergyReading>;
  fetchHistoricalReadings(siteId: string, range: DateRange): Promise<EnergyReading[]>;
}
```

Add manufacturer cloud, local network, Modbus TCP/RS485, CT clamp, smart-meter, or manual adapters behind this interface, then persist readings in Supabase tables that mirror `lib/types.ts`.

## Production next steps

1. Add Supabase auth and row-level-security-backed tables.
2. Implement first real inverter providers.
3. Add postcode/weather-aware expected generation models.
4. Ship push notifications for plain-English alerts.
5. Add CSV export and GDPR data deletion workflows.
6. Add app icons and install prompts for full PWA polish.
