import React from "react";
import BlueLine from "@/assets/Background/blueLine.svg";
import LightLine from "@/assets/Background/lightLine.svg";
import NormalBlueLine from "@/assets/Background/normalBlueLine.svg";
import { LoginCard } from "./components/LoginCard";

export function Component() {
    return (
        <div className="relative flex flex-col justify-center mt-28">
            <div className="flex flex-col relative z-10 justify-center items-center">
                <LoginCard />
            </div>
            {/* Background lines */}
            <div className="absolute inset-0 z-0">
                <img src={BlueLine} alt="Linha azul" className="absolute left-0 w-full" />
                <img src={LightLine} alt="Linha clara" className="absolute left-0 w-full" />
                <img src={NormalBlueLine} alt="Linha azul normal" className="absolute left-0 w-full" />
            </div>
        </div>
    )
}

