import React, {useEffect} from 'react';
import { Settings } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {SettingsFormSchema, SettingsSchema} from "@/lib/types"
import { set, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/contexts/auth';
import axios from 'axios';
import { API_URLS } from '@/lib/urls';
import { useMutation, useQueryClient } from 'react-query';
import { useRoomInfoContext } from '@/contexts/roomInformation';


interface SubNavbarProps {
    roomId: number;
    locked: boolean;
}


const SubNavbar: React.FC<SubNavbarProps> = ({roomId, locked}) => {

    const {token} = useAuthContext();
    const {setMaxCapacity, maxCapacity, setLocked, setLastUpdate} = useRoomInfoContext();
    const queryClient = useQueryClient();

    
    const form = useForm<SettingsSchema>({
        resolver: zodResolver(SettingsFormSchema),
        defaultValues: {
            roomId: roomId,
            locked: locked,
        },
    });
    
    useEffect(() => {
        console.log("useEffect");
        console.log(locked);
        form.reset({
          roomId: roomId,
          locked: locked,
        });
      }, [roomId, locked, form]);

    const mutation = useMutation( async (data: SettingsSchema) => {
        const response = await axios.put(API_URLS.settings, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    {
        onSuccess: () => {
            console.log("Success");
            setMaxCapacity(form.getValues('maxCapacity') ?? maxCapacity);
            setLocked(form.getValues('locked'));
            queryClient.invalidateQueries('rooms'); // Invalida a consulta 'rooms'
            setLastUpdate(new Date().toISOString());
        },
        onError: () => {
            console.log("Error");
        }
    }
    );

    function onSubmit(data: SettingsSchema) {
        if (!data.maxCapacity){
            data.maxCapacity = maxCapacity;
        }
        console.log(data);
        mutation.mutate(data);
    }



    return (
        <div className="flex items-center font-semibold bg-sky-900 p-3 rounded-md text-white space-x-2">
            <span>Status: {locked ? 'Offline' : 'Online'}</span>
            <span className={`h-3 w-3 rounded-full animate-glow ${!locked ? 'bg-green-500 shadow-green' : 'bg-red-500 shadow-red'}`} />
            <Dialog>
                <DialogTrigger>
                    <Settings/>
                </DialogTrigger>
                <DialogContent className='bg-cyan-950 justify-center rounded-xl'>
                    <DialogHeader className=''>
                        <DialogTitle className='text-center pb-8 text-4xl'>Settings</DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                               <form onSubmit={form.handleSubmit(onSubmit)} className='w-full text-center space-y-12'>
                                    <FormField
                                        control={form.control}
                                        name="maxCapacity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-2xl font-semibold">Maximum Occupancy</FormLabel>
                                                <FormControl className='w-1/3 translate-x-24'>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        console.log("Input value:", e.target.value);
                                                        field.onChange(Number(e.target.value));
                                                    }} 
                                                />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="locked"
                                    render={({ field }) => (
                                        <FormItem className='grid grid-cols-1'>
                                            <FormLabel className="font-semibold">Locked:</FormLabel>
                                            <FormControl className="translate-x-28">
                                            <Switch 
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                                localStorage.setItem('locked', JSON.stringify(value));
                                            }}                                            
                                            />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                    <div className="text-center space-x-4">
                                        <Button 
                                            type="submit" 
                                            className="rounded-full px-10 text-white"
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant={'destructive'}
                                            className="rounded-full px-10 text-white"
                                            onClick={() => {
                                                form.reset();
                                                localStorage.removeItem('lock_unlock');
                                            }}
                                        > Cancel
                                        </Button>
                                    </div>
                                </form> 
                            </Form>                                                                    
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubNavbar;