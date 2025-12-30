import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'

const ChartCard = ({ 
  title, 
  subtitle,
  data = [], 
  type = 'line',
  dataKey = 'value',
  xAxisKey = 'name',
  color = '#2563eb'
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={xAxisKey} stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        )
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={xAxisKey} stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
              }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={xAxisKey} stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
              }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartCard
