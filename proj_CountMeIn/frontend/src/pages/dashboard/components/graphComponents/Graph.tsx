import { useEffect, useState } from "react";
import { API_URLS } from "@/lib/urls";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuthContext } from "@/contexts/auth";
import axios from "axios";
import { useQuery } from "react-query";
import { RoomData } from "@/lib/types";


interface GraphProps {
    value: string;
    roomId: number;
}

const Graph: React.FC<GraphProps> = ({ value, roomId }) => {
  
    const { token } = useAuthContext();
    const[url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        switch (value) {
            case "today":
              setUrl(API_URLS.todayGraph);
                break;
            case "weekly":
              setUrl(API_URLS.weekGraph);
                break;
            case "monthly":
              setUrl(API_URLS.monthGraph);
                break;
            default:
              setUrl(API_URLS.todayGraph);
                break;
        }
    }
        , [value]);

    const {data: graphData} = useQuery<RoomData[]>({
          queryKey: ['graphData', url, roomId],
          queryFn: async () => {
            const { data} = await axios.get(url!, {
              headers: { Authorization: `Bearer ${token}` },
              params: { room_id: roomId },
            });
            return data;
          },
          enabled:!!url,
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log(error);
          },
          refetchInterval: 5000,
        });

        return (
            <div className="rounded-lg p-5 dark:bg-gray-800 bg-cyan-600" style={{ width: '100%', height: '620px' }}>
                <AreaChart
                    width={1220}
                    height={590}
                    data={graphData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(str) => {
                            const date = new Date(str);
                            if (value === "today"){
                              return date.toLocaleTimeString();
                            } else {
                              return date.toLocaleDateString();
                            }
                          }} 
                          />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{backgroundColor: '#1F2937', color: '#fff'}}
                          itemStyle={{color: '#fff'}}
                          labelFormatter={(str) => {
                            const date = new Date(str);
                            if (value === "today"){
                              return date.toLocaleTimeString();
                            } else {
                              return date.toLocaleDateString();
                            }
                          }}
                        />
                        <Area type="monotone" dataKey="room_count" stroke="#72B7E6" fill="rgba(70, 130, 180, 0.5)"/>
                </AreaChart>
            </div>
        );
};

export default Graph;