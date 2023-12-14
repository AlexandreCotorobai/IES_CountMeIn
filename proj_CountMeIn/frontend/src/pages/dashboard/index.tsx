import Sidebar from '@/pages/dashboard/components/Sidebar';
import RoomInfoCard from '@/pages/dashboard/components/RoomInfoCard';
import GraphCard from '@/pages/dashboard/components/GraphCard';
import SubNavbar from '@/pages/dashboard/components/SubNavbar';
import UpdateCard from '@/pages/dashboard/components/UpdateCard';
import { useEffect, useState } from 'react';
// Importe outros componentes necessários

export function Component() {

  const [roomInfo, setRoomInfo] = useState<number[]>([]);

  useEffect(() => {
    // generate a array with size 720 with random numbers between 1 and 15
    const randomArray = Array.from({length: 720}, () => Math.floor(Math.random() * 15) + 1);

    setRoomInfo(randomArray)
  }, []); 

  return (
    <div className="min-h-screen-85 bg-dark">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* Conteúdo principal */}
      <div className="flex-col p-4 md:flex">
        <div className='border-b border-blue-400'>
          <div className='flex h-16 bg-blue-400 justify-between rounded-t-sm items-center px-4'>
            {/* Ser alterado depois quando fizer o contexto */}
            <div className='text-2xl font-bold rounded-md bg-sky-900 p-2'>
                Room Information
            </div>
            <SubNavbar status='Online'/>
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
              asad
            </div>
            <div className='lg:order-3 order-2'>
              <RoomInfoCard/>
              {/* Segundo card da primeira coluna */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
