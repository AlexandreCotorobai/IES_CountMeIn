import { useEffect } from "react";
import { API_URLS } from "@/lib/urls";

interface GraphProps {
    value: string;
}

const Graph: React.FC<GraphProps> = ({ value }) => {

    useEffect(() => {
        let url;
        switch (value) {
            case "today":
                url = API_URLS.todayGraph;
                break;
            case "weekly":
                url = API_URLS.weekGraph
                break;
            case "monthly":
                url = "http://localhost:8000/api/room/monthly";
                break;
            default:
                url = "http://localhost:8000/api/room/today";
                break;
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
        , [value]);

    return (
        // Your component JSX
        // ...
        <div>Graph</div>
    );
};

export default Graph;