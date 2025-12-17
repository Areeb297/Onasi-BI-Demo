import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
// Use CSS variables from globals.css for colors instead of JS constants.
import SaudiRiyalSymbol from '../SaudiRiyalSymbol';

const DenialAnalysisChart = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
          Denial Analysis - Pareto Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="dashboard-xs">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={220} minWidth={200} minHeight={180}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="compact" />
              <XAxis dataKey="reasonCode" tick={{ fontSize: '0.7rem', fill: 'currentColor' }} className="text-foreground" />
              <YAxis yAxisId="left" orientation="left" tick={{ fill: 'currentColor' }} className="text-foreground" />
              <YAxis yAxisId="right" orientation="right" unit="%" tick={{ fill: 'currentColor' }} className="text-foreground" />
              <Tooltip
                wrapperStyle={{ fontSize: '0.7rem' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card text-card-foreground p-2 border border-border shadow-md rounded-md">
                        <p className="text-muted-foreground">{payload[0].payload.reasonCode}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-card-foreground font-medium">
                            <span style={{ color: entry.color }}>{entry.name}: </span>
                            {entry.name === 'Denied Amount' ? (
                              <span className="flex items-center">
                                {formatCurrency(entry.value)}
                                <SaudiRiyalSymbol className="ml-1" size={14} />
                              </span>
                            ) : `${entry.value}%`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar yAxisId="left" dataKey="deniedAmount" fill="var(--chart-1)" name="Denied Amount" barSize={30} isAnimationActive={true} />
              <Line yAxisId="right" dataKey="cumulative" stroke="var(--chart-2)" name="Cumulative %" activeDot={{ r: 8 }} />
              <Legend wrapperStyle={{ fontSize: '0.7rem' }} className="dashboard-legend-xs" />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-[var(--card)] rounded-md">
            <p className="text-[var(--card-foreground)]">No denial data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DenialAnalysisChart;
