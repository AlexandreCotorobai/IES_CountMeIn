import { Button } from "@/components/ui/button"


export function NavBarButton({label}: Readonly<{label: string}>) {
    return (
        <div>
            <Button className='rounded-full font-semibold btn-text dark:bg-sky-900 dark:hover:bg-sky-800 bg-cyan-600 hover:bg-cyan-700 px-10 dark:text-white'>
                {label}
            </Button>
        </div>
    )
}