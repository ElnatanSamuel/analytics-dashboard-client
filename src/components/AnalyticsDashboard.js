import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';

const StatCard = ({ title, value, prefix = '' }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">
      {prefix}{value.toLocaleString()}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-800 text-lg font-medium mb-4">{title}</h3>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, analyticsRes] = await Promise.all([
          axios.get('/api/analytics/dashboard-stats'),
          axios.get('/api/analytics')
        ]);
        
        // Format dates for charts
        const formattedData = analyticsRes.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString()
        }));
        
        setStats(statsRes.data);
        setAnalyticsData(formattedData);
      } catch (error) {
        setError('Failed to fetch analytics data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex-1 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 p-8 dark:bg-gray-800">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={stats?.totalRevenue || 0} 
          prefix="$"
          trend={+15}
        />
        <StatCard 
          title="Total Orders" 
          value={stats?.totalOrders || 0}
          trend={+8} 
        />
        <StatCard 
          title="Conversion Rate" 
          value={(stats?.totalOrders / stats?.totalVisitors * 100).toFixed(2) || 0}
          suffix="%"
          trend={-2}
        />
        <StatCard 
          title="Avg Order Value" 
          value={(stats?.totalRevenue / stats?.totalOrders).toFixed(2) || 0}
          prefix="$"
          trend={+5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="New Users" 
          value={stats?.newUsers || 0}
          trend={+12}
        />
        <StatCard 
          title="Bounce Rate" 
          value={stats?.bounceRate || 0}
          suffix="%"
          trend={-3}
        />
        <StatCard 
          title="Avg Session Duration" 
          value={`${Math.floor((stats?.avgSessionDuration || 0) / 60)}m ${(stats?.avgSessionDuration || 0) % 60}s`}
          trend={+7}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Revenue Trend">
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ChartCard>

        <ChartCard title="Visitors vs Orders">
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="#8884d8" />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;