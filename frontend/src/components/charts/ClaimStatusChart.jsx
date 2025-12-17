import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
// Use CSS variables from globals.css for colors instead of JS constants.

const ClaimStatusChart = ({ claimStatusData, onStatusClick }) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
          Claim Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 p-2">
        {claimStatusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220} minWidth={200} minHeight={180}>
            <PieChart>
              <Pie
                data={claimStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                dataKey="count"
                nameKey="status"
                label={({ name, percent, cx, cy, midAngle, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="currentColor"
                      className="text-foreground"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      style={{ fontSize: '0.7rem', fill: 'var(--foreground)' }}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                onClick={onStatusClick}
                isAnimationActive={true}
              >
                {claimStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 8) + 1})`} />
                ))} // Use up to 8 chart color variables, cycle as needed.
              </Pie>
              <Tooltip
                formatter={(value) => formatNumber(value)}
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.375rem',
                  color: 'var(--card-foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-[var(--card)] rounded-md">
            <p className="text-[var(--card-foreground)]">No claim status data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimStatusChart;
