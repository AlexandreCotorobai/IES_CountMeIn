import { Button } from "@/components/ui/button"


export function NavBarButton({label}: Readonly<{label: string}>) {
    return (
        <div>
            <Button className='rounded-full btn-text bg-sky-900 hover:bg-sky-800 px-10 dark:text-white'>
                {label}
            </Button>
        </div>
    )
}