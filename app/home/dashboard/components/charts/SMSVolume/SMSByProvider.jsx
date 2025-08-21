/**
 * SMS By Provider Chart Component
 *
 * Displays SMS volume by service provider as a basic Bar chart.
 * Styling mirrors Overall SMS (gradient fill, tooltip style).
 * Props: data?: Array<{ provider: string, value: number }>
 */
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_CONFIG, SMS_COLORS } from '../../sms-volume-chart/constants';
import { formatNumber } from '../../sms-volume-chart/utils';
import ChartInsight, { PRESET_INSIGHTS } from '../../ChartInsight';

function ProviderTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  const value = payload[0]?.value ?? 0;
  return (
    <div
      className="inline-flex flex-col gap-1 p-[7.6px] rounded-[3.8px] border border-[#DADADA] bg-white shadow-md"
      style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11.4px' }}
    >
      <p className="text-gray-900 font-medium mb-1">Provider: {label}</p>
      <div className="flex items-center justify-between gap-1">
        <span style={{ color: SMS_COLORS.TOTAL.solid }}>Volume:</span>
        <span style={{ color: SMS_COLORS.TOTAL.solid }}>{formatNumber(value)}</span>
      </div>
    </div>
  );
}

export default function SMSByProvider({ data, gradientId = "provider-gradient", gradientStops }) {
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length) return data;
    return [
      { provider: 'Twilio', value: 45000 },
      { provider: 'Amazon SNS', value: 35000 },
      { provider: 'MessageBird', value: 25000 },
      { provider: 'Vonage', value: 18000 },
      { provider: 'Others', value: 12000 },
    ];
  }, [data]);

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">SMS Volume by Provider</h3>
      <div className="h-80" aria-label="SMS volume by provider" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: CHART_CONFIG.MARGIN.TOP, right: CHART_CONFIG.MARGIN.RIGHT, left: CHART_CONFIG.MARGIN.LEFT, bottom: 40 }}>
            <CartesianGrid strokeDasharray={CHART_CONFIG.GRID_DASH} />
            <XAxis dataKey="provider" angle={-20} textAnchor="end" interval={0} height={50} />
            <YAxis tickFormatter={(v) => formatNumber(v)} />
            <Tooltip content={<ProviderTooltip />} />
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                {(gradientStops && gradientStops.length ? gradientStops : SMS_COLORS.TOTAL.stops).map((s, i) => (
                  <stop key={i} offset={s.offset} stopColor={s.color} />
                ))}
              </linearGradient>
            </defs>
            <Bar dataKey="value" fill={`url(#${gradientId})`} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartInsight message={PRESET_INSIGHTS.allServicesOperational} variant="success" />
    </div>
  );
}
