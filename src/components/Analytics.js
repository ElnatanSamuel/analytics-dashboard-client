import React, { useEffect, useState } from 'react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';

const MetricCard = ({ title, value, change, prefix = '' }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">
      {prefix}{value.toLocaleString()}
    </p>
    <p className={`mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
    </p>
  </div>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics');
        const formattedData = response.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
          conversionRate: (item.orders / item.visitors * 100).toFixed(2)
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  const latestData = data[0];
  const deviceData = [
    { name: 'Desktop', value: latestData.topDevices.desktop },
    { name: 'Mobile', value: latestData.topDevices.mobile },
    { name: 'Tablet', value: latestData.topDevices.tablet }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Detailed Analytics</h2>
      
      {/* User Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard 
          title="New Users" 
          value={latestData.newUsers}
          change={12}
        />
        <MetricCard 
          title="Returning Users" 
          value={latestData.returningUsers}
          change={-5}
        />
        <MetricCard 
          title="Conversion Rate" 
          value={parseFloat(latestData.conversionRate)}
          change={8}
          prefix="%"
        />
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Session Duration Trend</h3>
          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgSessionDuration" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Device Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;