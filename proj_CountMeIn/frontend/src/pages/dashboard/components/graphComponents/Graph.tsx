import { useEffect } from "react";
import { API_URLS } from "@/lib/urls";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthContext } from "@/contexts/auth";
interface GraphProps {
    value: string;
}

const Graph: React.FC<GraphProps> = ({ value }) => {
  
    const { token } = useAuthContext();

    useEffect(() => {
        let url;
        switch (value) {
            case "today":
                url = API_URLS.todayGraph;
                break;
            case "weekly":
                url = API_URLS.weekGraph;
                break;
            case "monthly":
                url = API_URLS.monthGraph;
                break;
            default:
                url = API_URLS.todayGraph;
                break;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
        , [value]);

    const data3 = [
            {
              name: 'Page A',
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: 'Page B',
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: 'Page C',
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: 'Page D',
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: 'Page E',
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: 'Page F',
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
            {
              name: 'Page G',
              uv: 3490,
              pv: 4300,
              amt: 2100,
            },
          ];

          return (
            <div className="rounded-lg p-5 bg-gray-800" style={{ width: '100%', height: '620px' }}>
                <AreaChart
                    width={1220}
                    height={590}
                    data={data3}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#72B7E6" fill="rgba(70, 130, 180, 0.5)"/>
                </AreaChart>
            </div>
        );
};

export default Graph;