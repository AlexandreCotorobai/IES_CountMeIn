import React, { useState, useMemo, useCallback } from "react";

export interface RoomInfoContextProps {
    children: React.ReactNode;
}

export interface IRoomInfoContext {
    maxCapacity: number;
    setMaxCapacity: (maxCapacity: number) => void;
    currentOccupancy: number;
    setCurrentOccupancy: (currentOccupancy: number) => void;
    upTime: number;
    setUpTime: (upTime: number) => void;
}

export const RoomInfoContext = React.createContext<IRoomInfoContext>({} as IRoomInfoContext);

export const RoomInfoProvider: React.FC<RoomInfoContextProps> = ({ children }) => {
    const [maxCapacity, setMaxCapacity] = useState<number>(0);
    const [currentOccupancy, setCurrentOccupancy] = useState<number>(0);
    const [upTime, setUpTime] = useState<number>(0);

    //pode dar porcaria, se der é aqui!
    const handleSetMaxCapacity = useCallback((max: number) => setMaxCapacity(max), []);
    const handleSetCurrentOccupancy = useCallback((capacity: number) => setCurrentOccupancy(capacity), []);
    const handleSetUpTime = useCallback((time: number) => setUpTime(time), []);

    const value = useMemo(() => ({
        maxCapacity,
        setMaxCapacity: handleSetMaxCapacity,
        currentOccupancy,
        setCurrentOccupancy: handleSetCurrentOccupancy,
        upTime,
        setUpTime: handleSetUpTime,
    }), [maxCapacity, currentOccupancy, upTime, handleSetMaxCapacity, handleSetCurrentOccupancy, handleSetUpTime]);

    return (
        <RoomInfoContext.Provider value={value}>
            {children}
        </RoomInfoContext.Provider>
    );
}

export const useRoomInfoContext = () => {
    const context = React.useContext(RoomInfoContext);
    if (!context) {
        throw new Error('useRoomInfoContext must be used within a RoomInfoProvider');
    }
    return context;
}
