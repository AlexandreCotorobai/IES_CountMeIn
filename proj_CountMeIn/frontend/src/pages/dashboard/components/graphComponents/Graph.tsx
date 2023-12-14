import { useEffect } from "react";
import { API_URLS } from "@/lib/urls";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthContext } from "@/contexts/auth";
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
                url = API_URLS.weekGraph;
                break;
            case "monthly":
                url = API_URLS.monthGraph;
                break;
            default:
                url = API_URLS.todayGraph;
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