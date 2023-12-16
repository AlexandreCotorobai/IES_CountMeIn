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
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';


export function Component() {

  const [isOpen, setIsOpen] = useState(false);

  const [roomInfo, setRoomInfo] = useState<number[]>([]);

  useEffect(() => {
    // generate a array with size 720 with random numbers between 1 and 15
    const randomArray = Array.from({length: 720}, () => Math.floor(Math.random() * 15) + 1);

    setRoomInfo(randomArray)
  }, []); 

  return (
    <div className="min-h-screen-85 flex bg-dark">
      {/* Sidebar */}
      <div className={`relative pt-4 ${isOpen ? 'w-[200px]' : 'w-[40px]'}`}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={`absolute ${isOpen ? 'w-[200px]' : 'w-[40px]'}`} 
        >
          <div className={`flex items-center justify-between ${isOpen ? 'rounded-tr-lg' : 'rounded-r-lg'} bg-blue-400`}>
            <CollapsibleTrigger asChild>
              <Button className='bg-trasnparent hover:bg-transparent' size="sm">
                {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 bg-cyan-950 rounded-br-lg">
            <div className="rounded-md px-4 py-2 font-mono text-sm shadow-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md px-4 py-2 font-mono text-sm shadow-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* Conteúdo principal */}
      <div className={`flex-grow p-4 md:flex flex-col ${isOpen ? 'w-[calc(100%-200px)]' : 'w-[calc(100%-40px)]'}`}>
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
              <GraphCard/>
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
