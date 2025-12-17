import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { PRIMARY_COLOR } from '../../constants/colors';

const ReimbursementTimeDistributionChart = ({ reimbursementTimeData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" style={{ color: PRIMARY_COLOR }} />
          Reimbursement Time Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="dashboard-xs">
        {reimbursementTimeData && reimbursementTimeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220} minWidth={200} minHeight={180}>
            <BarChart
              data={reimbursementTimeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" label={{ value: 'Days', position: 'insideBottomRight', offset: -5, fill: 'currentColor' }} tick={{ fontSize: '0.7rem', fill: 'currentColor' }} className="text-foreground" />
              <YAxis label={{ value: 'Number of Claims', angle: -90, position: 'insideLeft', fill: 'currentColor' }} tick={{ fontSize: '0.7rem', fill: 'currentColor' }} className="text-foreground" />
              <Tooltip
                wrapperStyle={{ fontSize: '0.7rem' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card text-card-foreground p-2 border border-border shadow-md rounded-md">
                        {payload.map((item, index) => (
                          <div key={index}>
                            <span className="text-muted-foreground">{item.name}: </span>
                            <span className="text-card-foreground">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '0.7rem' }} className="dashboard-legend-xs compact" />
              <Bar dataKey="count" name="Number of Claims" fill="var(--chart-1)" isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-card rounded-md">
            <p className="text-muted-foreground">No reimbursement time data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReimbursementTimeDistributionChart;
