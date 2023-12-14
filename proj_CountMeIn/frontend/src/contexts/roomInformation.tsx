import React, { useState, useMemo, useCallback } from "react";

export interface RoomInfoContextProps {
    children: React.ReactNode;
}

export interface IRoomInfoContext {
    maxOccupancy: number;
    setMaxOccupancy: (maxOccupancy: number) => void;
    currentCapacity: number;
    setCurrentCapacity: (currentCapacity: number) => void;
    upTime: number;
    setUpTime: (upTime: number) => void;
}

export const RoomInfoContext = React.createContext<IRoomInfoContext>({} as IRoomInfoContext);

export const RoomInfoProvider: React.FC<RoomInfoContextProps> = ({ children }) => {
    const [maxOccupancy, setMaxOccupancy] = useState<number>(0);
    const [currentCapacity, setCurrentCapacity] = useState<number>(0);
    const [upTime, setUpTime] = useState<number>(0);

    //pode dar porcaria, se der é aqui!
    const handleSetMaxOccupancy = useCallback((max: number) => setMaxOccupancy(max), []);
    const handleSetCurrentCapacity = useCallback((capacity: number) => setCurrentCapacity(capacity), []);
    const handleSetUpTime = useCallback((time: number) => setUpTime(time), []);

    const value = useMemo(() => ({
        maxOccupancy,
        setMaxOccupancy: handleSetMaxOccupancy,
        currentCapacity,
        setCurrentCapacity: handleSetCurrentCapacity,
        upTime,
        setUpTime: handleSetUpTime,
    }), [maxOccupancy, currentCapacity, upTime, handleSetMaxOccupancy, handleSetCurrentCapacity, handleSetUpTime]);

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
