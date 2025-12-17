import React from 'react';
import {
  FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import SaudiRiyalSymbol from '../SaudiRiyalSymbol';

// Funnel colors that work well in both light and dark mode
const FUNNEL_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-4)',
];

// Saudi Riyal SVG path for inline rendering
const RiyalPath = "M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24ZM1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z";

const RevenueCycleFunnel = ({ funnelData }) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
          Revenue Cycle Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 p-2">
        {funnelData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220} minWidth={200} minHeight={180}>
            <FunnelChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card p-2 border border-border shadow-md rounded-md">
                        <p className="text-muted-foreground">{payload[0].name}</p>
                        <p className="text-card-foreground font-medium flex items-center">
                          {formatCurrency(payload[0].value)}
                          <SaudiRiyalSymbol className="ml-1" size={14} />
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Funnel
                data={funnelData}
                dataKey="value"
                nameKey="name"
                isAnimationActive={true}
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                ))}
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  content={(props) => {
                    const { x, y, width, height, value } = props;
                    const centerX = x + width / 2;
                    const centerY = y + height / 2;
                    return (
                      <g>
                        <text
                          x={centerX - 8}
                          y={centerY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize="14"
                          fontWeight="500"
                        >
                          {formatCurrency(value)}
                        </text>
                        <svg
                          x={centerX + 35}
                          y={centerY - 7}
                          width="14"
                          height="14"
                          viewBox="0 0 1124.14 1256.39"
                        >
                          <path d={RiyalPath} fill="#fff" />
                        </svg>
                      </g>
                    );
                  }}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-card rounded-md">
            <p className="text-muted-foreground">No funnel data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueCycleFunnel;
