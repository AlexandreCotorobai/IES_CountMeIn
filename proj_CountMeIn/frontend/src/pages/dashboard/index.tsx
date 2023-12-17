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

  const {roomId, setRoomId, locked, setLocked} = useRoomInfoContext();

  const {data: rooms , status} = useQuery<Partial<Room[]>>({
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
  }, [roomId]);

  const [isOpen, setIsOpen] = useState(true);


return (
    <div className="min-h-screen-85 flex bg-dark">
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
                  {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="sr-only">Toggle</span>
                  <div className={`text-2xl font-bold p-5 ${isOpen ? 'block' : 'hidden'}`}>
                      Room List
                  </div>
                </Button>
            </CollapsibleTrigger>
          </div>
          <div className={`bg-cyan-950 rounded-br-lg ${isOpen ? 'h-auto' : 'h-[40px]'}`}>
          {isOpen && (
            <>
              {rooms?.map((room, index) => {
                if (room) {
                  return (
                    <div key={room.id} 
                    className={`px-4 py-2 text-center cursor-pointer text-xl shadow-sm relative ${roomId === room.id ? 'bg-sky-900' : ''} ${index === rooms.length - 1 ? 'rounded-br-xl' : ''}`} 
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
              {/* Ser alterado depois quando fizer o contexto */}
              <div className='text-2xl font-bold rounded-md bg-sky-900 p-2'>
                  Room Information
              </div>
              <SubNavbar roomId={roomId} locked={locked} />
            </div>
          </div>
          {/* Conteúdo */}
          <div className="flex-grow border bg-cyan-950 rounded-b-sm p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pl-3 pt-3">
              {/* Cartões de informação */}
              <div className="order-1">
                <UpdateCard lastUpdated='12:00:00' fetchUpdate={() => console.log('Fetch Update')} />
                {/* Primeiro card da primeira coluna */}
              </div>
              <div className="order-3 col-span-2 lg:col-span-3 lg:row-span-3 lg:order-2">
                {/* Card que ocupa as duas colunas */}
                <GraphCard/>
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
