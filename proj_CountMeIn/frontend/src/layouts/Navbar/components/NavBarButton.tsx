import React from "react";
import { Button } from "@/components/ui/button"


export function NavBarButton({label}: {label: string}) {
    return (
        <>  
            <div>
                <Button className='rounded-full btn-text px-10 dark:text-white'>
                    {label}
                </Button>
            </div>
        </>
    )
}