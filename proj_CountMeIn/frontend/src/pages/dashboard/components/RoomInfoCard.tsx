import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface RoomInfoCardProps {
    uptime: number;
    currentCapacity: number;
    maximumOccupancy: number;
}

const RoomInfoCard: React.FC<RoomInfoCardProps> = ({uptime, currentCapacity, maximumOccupancy}) => {

    const data = [
        {
            name: 'Current Occupancy',
            value: currentCapacity,
            fill: currentCapacity < maximumOccupancy * 0.5 ? '#82ca9d' : currentCapacity < maximumOccupancy * 0.75 ? '#FFBF00' : '#FF0000',
        },
        {
            name: 'Maximum Occupancy',
            value: maximumOccupancy,
            fill: '#82ca9d',
        },
    ];
    return (
        <Card className="items-center space-y-5 bg-sky-900 px-10">
            <CardHeader className="space-y-2 lg:text-start text-center">
                <CardTitle className="text-2xl font-semibold">General Info:</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-y-7 text-center font-semibold">
                <div>Uptime: {uptime} Hours</div>
                <div>Current Occupancy: {currentCapacity}</div>
                <div>Maximum Occupancy: {maximumOccupancy}</div>
            </CardContent>
            <CardFooter className='hidden lg:block'>
                <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                        innerRadius="10%"
                        outerRadius="80%"
                        data={data}
                        startAngle={190}
                        endAngle={-10}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ fill: '#fff', position: 'insideStart' }}
                            background
                            dataKey="value"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </CardFooter>
        </Card>
    );
};

export default RoomInfoCard;