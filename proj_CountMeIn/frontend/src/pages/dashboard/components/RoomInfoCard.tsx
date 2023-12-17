/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell , ResponsiveContainer } from 'recharts';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from 'react-query';
import { API_URLS } from '@/lib/urls';
import axios from 'axios';
import { useAuthContext } from '@/contexts/auth';
import { useRoomInfoContext } from '@/contexts/roomInformation';
import { RoomSettings } from '@/lib/types';
import Loading from "@/components/Loading";

interface RoomInfoCardProps {
    roomId: number
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({roomId}) => {

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const {token} = useAuthContext();
    const {maxCapacity, setMaxCapacity, currentOccupancy, setCurrentOccupancy, upTime, setUpTime} = useRoomInfoContext();

    //apagar isto depois
    // useEffect(() => {
    //     setMaxCapacity(20);
    // }, [setMaxCapacity]);

    const {data, status} = useQuery<RoomSettings>({
        queryKey: ['roomSettings', roomId],
        queryFn: async () => {
            const { data } = await axios.get(API_URLS.generalInfo, {
                headers: { Authorization: `Bearer ${token}` },
                params: { room_id: roomId },
            });
            return data;
        },
        onSuccess: (data) => {
            setCurrentOccupancy(data.currentOccupancy);
            setUpTime(data.upTime);
            setMaxCapacity(data.maxCapacity);
        },
        onError: () => {
            console.log("Error");
        },
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (status === 'success') {
          setMaxCapacity(data?.maxCapacity);
          setCurrentOccupancy(data?.currentOccupancy);
          setUpTime(data?.upTime);
        }
      }, [status, data]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          const { width, height } = entries[0].contentRect;
          setContainerSize({ width, height });
        });
      
        const container = document.querySelector('.recharts-responsive-container');
        if (container) {
          resizeObserver.observe(container);
        }
      
        return () => {
          if (container) {
            resizeObserver.unobserve(container);
          }
        };
      }, []);

    const RADIAN = Math.PI / 180;

    const data2 = [
        {
            id: 'A',
            name: 'A',
            maxValue: maxCapacity*0.6,
            color: '#82ca9d',
        },
        {
            id: 'B',
            name: 'B',
            maxValue: maxCapacity*0.2,
            color: '#ffc658',
        },
        {
            id: 'C',
            name: 'C',
            maxValue: maxCapacity*0.1,
            color: '#ff0000',
        },
    ];


    const cx = containerSize.width / 2;
    const cy = containerSize.height / 2;
    const iR = Math.min(containerSize.width, containerSize.height) * 0.2;
    const oR = Math.min(containerSize.width, containerSize.height) * 0.4;
    const value = data?.currentOccupancy ?? currentOccupancy //se não tiver dados, pega o valor do contexto

    const needle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number, color: string | undefined) => {
        let total = 0;
        data.forEach((v: { maxValue: number; }) => {
          total += v.maxValue;
        });
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin ;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;
      
        return [
          <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
          <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} strokeWidth={2} />,
          <text key="text" x={cx} y={cy + 40} fill="#ffffff" fontSize={"20"} textAnchor="middle">{`${currentOccupancy}/${maxCapacity}`}</text>
        ];
      };

    
    return (
        // <Loading status={status}>
            <Card className="items-center border-transparent shadow-xl space-y-5 bg-sky-900 px-10">
                <CardHeader className="space-y-2 lg:text-start text-center">
                    <CardTitle className="text-2xl font-semibold">General Info:</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-y-7 text-center font-semibold text-2xl">
                    <div>Uptime: {data?.upTime} Hours</div>
                    <div>Current Occupancy: {data?.currentOccupancy}</div>
                    <div>Maximum Occupancy: {data?.maxCapacity}</div>
                </CardContent>
                <CardFooter className='hidden lg:block'>
                    <ResponsiveContainer width="100%" height={230} className={"bg-cyan-950 rounded-lg"}>
                        <PieChart width={400} height={500} className='translate-y-6'>
                            <Pie
                            dataKey="maxValue"
                            startAngle={180}
                            endAngle={0}
                            data={data2}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            fill="#8884d8"
                            stroke="none"
                            >
                            {data2.map((entry) => (
                                <Cell key={entry.id} fill={entry.color} />
                            ))}
                            </Pie>
                            {needle(value, data2, cx, cy, iR, oR, '#FFFAFA')}
                        </PieChart>
                    </ResponsiveContainer>
                </CardFooter>
            </Card>
        // </Loading>
    );
};

export default RoomInfoCard;