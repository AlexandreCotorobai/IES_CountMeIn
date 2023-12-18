import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { LoginForm } from "./LoginForm";
import { Button } from "@/components/ui/button";


export function LoginCard() {


    return (
        <Card className="items-center dark:bg-cyan-950 bg-sky-100 shadow-lg px-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center dark:text-sky-100 text-cyan-900 md:text-3xl sm:text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <LoginForm />
            </CardContent>
            <CardFooter>
                <Button variant="link" className="dark:text-sky-100 text-cyan-900">Having problems? Contact Us</Button>
            </CardFooter>
        </Card>
    );
}
