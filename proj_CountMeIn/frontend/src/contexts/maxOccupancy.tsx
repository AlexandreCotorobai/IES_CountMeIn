import React, { useState, useMemo } from "react";

export interface maxOccupancyProps {
    children: React.ReactNode;
}

export interface IMaxOccupancyContext {
    maxOccupancy: number;
    setMaxOccupancy: (occupancy: () => number) => void;
}

export const maxOccupancyContext = React.createContext<IMaxOccupancyContext>({} as IMaxOccupancyContext);

export const maxOccupancyProvider: React.FC<maxOccupancyProps> = ({children}: React.PropsWithChildren<{}>) => {
    const [maxOccupancy, setMaxOccupancy] = useState<number>(0);

    const maxOccupancyCtx = useMemo<IMaxOccupancyContext>(():IMaxOccupancyContext => ({
        maxOccupancy,
        setMaxOccupancy: (occupancy) => setMaxOccupancy(occupancy())
    }), [maxOccupancy]);

    return (
        <maxOccupancyContext.Provider value={maxOccupancyCtx}>
            {children}
        </maxOccupancyContext.Provider>
    );
}

export const useMaxOccupancyContext = () => {
    const context = React.useContext(maxOccupancyContext);
    if (context === undefined) {
        throw new Error('usemaxOccupancyContext must be used within a maxOccupancyProvider');
    }
    return context;
}
