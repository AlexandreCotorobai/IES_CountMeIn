import React from "react";
import BlueLine from "@/assets/Background/blueLine.svg";
import LightLine from "@/assets/Background/lightLine.svg";
import NormalBlueLine from "@/assets/Background/normalBlueLine.svg";
import { LoginCard } from "./components/LoginCard";

export function Component() {
    return (
        <div className="relative flex flex-col min-h-screen justify-around pb-24">
            <div className="flex flex-col relative z-10 items-center">
                <LoginCard />
            </div>
            {/* Background lines */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${BlueLine})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'top 100px left 0' }}></div>
                <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${LightLine})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'top 100px left 0' }}></div>
                <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${NormalBlueLine})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'top 100px left 0' }}></div>
            </div>
        </div>
    )
}


