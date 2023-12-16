import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Graph from '@/pages/dashboard/components/graphComponents/Graph';

const GraphCard: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState('today');

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
    }
    return (
        <div className="flex flex-col items-center font-semibold shadow-xl bg-sky-900 p-3 rounded-md text-white space-x-2">
            <div className='flex px-6 items-center justify-between w-full'>
                <div className='text-3xl font-bold rounded-md p-2'>
                    Graph View:
                </div>
                <Select onValueChange={handleValueChange}>
                        <SelectTrigger className="w-[180px] bg-cyan-950 rounded-full border-transparent">
                            <SelectValue placeholder="Today" defaultValue={"today"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="weekly">Weekly Max</SelectItem>
                            <SelectItem value="monthly">Monthly Max</SelectItem>
                        </SelectContent>
                </Select>
            </div>
            <div className='p-5 bg-cyan-950 rounded-lg'>
                {selectedValue === 'today' && <div><Graph value={"today"}/></div>}
                {selectedValue === 'weekly' && <div><Graph value={"weekly"}/></div>}
                {selectedValue === 'monthly' && <div><Graph value={"monthly"}/></div>}
            </div>
        </div>
    );
};

export default GraphCard;
