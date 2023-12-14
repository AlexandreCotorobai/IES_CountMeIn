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
        <div className="flex flex-col items-center font-semibold bg-sky-900 p-3 rounded-md text-white space-x-2">
            <div className='flex items-center justify-between w-full'>
                <div className='text-2xl font-bold rounded-md p-2'>
                    Room Information
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
            <div>
                {selectedValue === 'today' && <div><Graph value={"today"}/></div>}
                {selectedValue === 'weekly' && <div>Conteúdo para 'Weekly Max'</div>}
                {selectedValue === 'monthly' && <div>Conteúdo para 'Monthly Max'</div>}
            </div>
        </div>
    );
};

export default GraphCard;
