import React from "react";

interface LoaderProps {
    status: "loading" | "success" | "error" | "idle";
    children: React.ReactNode;
}

const Loading: React.FC<LoaderProps> = (props: LoaderProps) => {
    return (
        <>
            {props.status === "loading" &&
                <>
                    <p>Loading data...</p>
                </>
            }
            {props.status === "success" && props.children}
            {props.status === "error" && <p>Error</p>}
            {props.status === "idle" && props.children}
        </>
    );
};

export default Loading;