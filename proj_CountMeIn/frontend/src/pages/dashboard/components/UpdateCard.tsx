import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

interface UpdateCardProps {
    lastUpdated: string;
    fetchUpdate: () => void;
}

const UpdateCard: React.FC<UpdateCardProps> = ({lastUpdated, fetchUpdate}) => {
    return (
        <Card className="items-center border-sky-900 shadow-xl bg-sky-900 px-10 lg:h-auto h-full">
                <CardHeader className="space-y-1">
                </CardHeader>
                <CardContent className="flex items-center text-center pt-10  lg:p-0 justify-around gap-4">
                    <div className="flex flex-col space-y-2">
                        <CardTitle className="text-2xl font-bold">Last Update</CardTitle>
                        <span className="text-2xl font-bold">{lastUpdated}</span>
                    </div>
                    <Button onClick={fetchUpdate} className="bg-cyan-950 rounded-full hover:bg-cyan-900 text-white font-bold py-2 px-4">Fetch Update</Button>
                </CardContent>
                <CardFooter className='hidden lg:block'>
                </CardFooter>
                
        </Card>
    );
};

export default UpdateCard;