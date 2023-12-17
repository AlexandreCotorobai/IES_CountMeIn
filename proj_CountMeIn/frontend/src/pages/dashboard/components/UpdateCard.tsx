import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRoomInfoContext } from '@/contexts/roomInformation';

interface UpdateCardProps {
}

const UpdateCard: React.FC<UpdateCardProps> = () => {

    const {lastUpdate} = useRoomInfoContext();

    const lastUpdated = lastUpdate? new Date(lastUpdate).toLocaleString() : "No updates yet";


    return (
        <Card className="items-center border-sky-900 shadow-xl bg-sky-900 px-10 lg:h-auto h-full">
                <CardHeader className="space-y-1">
                </CardHeader>
                <CardContent className="flex items-center text-center pt-10 lg:p-0 justify-around gap-4">
                <div className="flex flex-col items-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Last Update</CardTitle>
                        <span className="text-2xl font-bold">{lastUpdated}</span>
                    </div>
                </CardContent>
                <CardFooter className='hidden lg:block space-y-1'>
                    <div className="min-h-[1rem]"></div>
                </CardFooter>
                
        </Card>
    );
};

export default UpdateCard;