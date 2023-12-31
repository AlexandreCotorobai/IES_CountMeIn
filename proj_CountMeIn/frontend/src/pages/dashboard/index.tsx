import RoomInfoCard from '@/pages/dashboard/components/RoomInfoCard';
import GraphCard from '@/pages/dashboard/components/graphComponents/GraphCard';
import SubNavbar from '@/pages/dashboard/components/SubNavbar';
import UpdateCard from '@/pages/dashboard/components/UpdateCard';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuthContext } from '@/contexts/auth';
import { useQuery } from 'react-query';
import { API_URLS } from '@/lib/urls';
import axios from 'axios';
import {Room} from '@/lib/types';
import { useRoomInfoContext } from '@/contexts/roomInformation';


export function Component() {

  const {token} = useAuthContext();

  const {roomId, setRoomId, locked, setLocked, setLastUpdate} = useRoomInfoContext();

  const {data: rooms } = useQuery<Partial<Room[]>>({
    queryKey: 'rooms',
    queryFn: async () => {
      const { data } = await axios.get(API_URLS.rooms, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data[0] && data.length > 0) {
        if(roomId === 0){ // só acontece na primeira vez que o componente é renderizado
          setRoomId(data[0].id);
          setLocked(data[0].locked);
        }
      }
    },
    onError: () => {
      console.log("Error");
    },
  });

  useEffect(() => {
    console.log(`Room ID changed: ${roomId}`);
    setLastUpdate(new Date().toISOString());
  }, [roomId]);

  const [isOpen, setIsOpen] = useState(true);




return (
    <div className="min-h-screen-85 flex">
      {/* Sidebar */}
      <div className={`relative pt-4 ${isOpen ? 'w-[200px]' : 'w-[40px]'}`}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={`absolute ${isOpen ? 'w-[200px]' : 'w-[40px]'}`} 
        >
          <div className={`flex items-center rounded-tr-lg bg-sky-400`}>
            <CollapsibleTrigger asChild>
                <Button className='bg-trasnparent hover:bg-transparent' size="sm">
                  {isOpen ? <ChevronLeft strokeWidth={3} className="h-4 w-4 font-bold text-sky-100" /> : <ChevronRight strokeWidth={3} className="h-4 w-4 font-bold text-sky-100" />}
                  <span className="sr-only">Toggle</span>
                  <div className={`text-2xl text-white font-bold p-5 ${isOpen ? 'block' : 'hidden'}`}>
                      Room List
                  </div>
                </Button>
            </CollapsibleTrigger>
          </div>
          <div className={`dark:bg-cyan-950 bg-cyan-200 rounded-br-lg ${isOpen ? 'h-auto' : 'h-[40px]'}`}>
          {isOpen && (
            <>
              {rooms?.map((room, index) => {
                if (room) {
                  return (
                    <div key={room.id} 
                    className={`px-4 py-2 dark:text-sky-100 text-cyan-900 font-semibold text-center dark:hover:bg-sky-900 hover:bg-cyan-100 cursor-pointer text-xl shadow-sm relative ${roomId === room.id ? 'dark:bg-sky-900 bg-cyan-100' : ''} ${index === rooms.length - 1 ? 'rounded-br-xl' : ''}`} 
                    onClick={() => {
                        setRoomId(room.id);
                        setLocked(room.locked);
                      }} 
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          setRoomId(room.id);
                          setLocked(room.locked);
                        }
                    }}
                    tabIndex={0}>
                      {room.name}
                      <span className={`h-3 w-3 absolute rounded-full top-1/3 right-4 animate-glow ${!room.locked ? 'bg-green-500 shadow-green' : 'bg-red-500 shadow-red'}`} />
                      {roomId === room.id && <div className="absolute rounded-r-xl left-0 top-0 bottom-0 w-2 bg-sky-400"></div>}
                    </div>
                  )
                }
              })}
            </>
          )}
        </div>
          <CollapsibleContent className="space-y-2 bg-cyan-950 rounded-br-lg">
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* Conteúdo principal */}
      {roomId !== 0 && (
        <div className={`flex-grow p-4 md:flex flex-col ${isOpen ? 'w-[calc(100%-200px)]' : 'w-[calc(100%-40px)]'}`}>
          <div className='border-b border-sky-400'>
            <div className='flex h-16 bg-sky-400 justify-between rounded-t-sm items-center px-4'>
              <div className='text-2xl font-bold rounded-md bg-sky-900 text-sky-100 p-2'>
                  Room Information
              </div>
              <SubNavbar roomId={roomId} locked={locked} />
            </div>
          </div>
          {/* Conteúdo */}
          <div className="flex-grow dark:bg-cyan-950 bg-cyan-200 rounded-b-sm p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pl-3 pt-3">
              {/* Cartões de informação */}
              <div className="order-1">
                <UpdateCard/>
                {/* Primeiro card da primeira coluna */}
              </div>
              <div className="order-3 col-span-2 lg:col-span-3 lg:row-span-3 lg:order-2">
                {/* Card que ocupa as duas colunas */}
                <GraphCard roomId={roomId}/>
              </div>
              <div className='lg:order-3 order-2'>
                <RoomInfoCard roomId={roomId}/>
                {/* Segundo card da primeira coluna */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default Component;
