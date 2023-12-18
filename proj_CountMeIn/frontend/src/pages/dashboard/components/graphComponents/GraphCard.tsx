import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Graph from '@/pages/dashboard/components/graphComponents/Graph';

interface GraphCardProps {
    roomId: number
}

const GraphCard: React.FC<GraphCardProps> = ({ roomId }) => {
    const [selectedValue, setSelectedValue] = useState('today');

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
    }
    return (
        <div className="flex flex-col items-center font-semibold shadow-xl dark:bg-sky-900 bg-cyan-100 p-3 rounded-md dark:text-sky-100 text-cyan-900 space-x-2">
            <div className='flex px-6 items-center justify-between w-full'>
                <div className='text-3xl font-bold rounded-md p-2'>
                    Graph View:
                </div>
                <Select onValueChange={handleValueChange}>
                        <SelectTrigger className="w-[180px] dark:bg-cyan-950 bg-cyan-300 dark:text-sky-100 text-cyan-900 rounded-full border-transparent">
                            <SelectValue placeholder="Today" defaultValue={"today"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="weekly">Weekly Max</SelectItem>
                            <SelectItem value="monthly">Monthly Max</SelectItem>
                        </SelectContent>
                </Select>
            </div>
            <div className='p-5 dark:bg-cyan-950 bg-cyan-300 rounded-lg'>
                {selectedValue === 'today' && <div><Graph value={"today"} roomId={roomId}/></div>}
                {selectedValue === 'weekly' && <div><Graph value={"weekly"} roomId={roomId}/></div>}
                {selectedValue === 'monthly' && <div><Graph value={"monthly"} roomId={roomId}/></div>}
            </div>
        </div>
    );
};

export default GraphCard;
