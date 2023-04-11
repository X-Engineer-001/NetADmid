import services from "../services";
import { useState } from 'react';
export default function View() {
    const [data, setData] = useState([]);
    services.user.getAll().then((gotData) => setData(gotData));
    return (
        <div>
        {data.map((value,index) => <p key={value.id}>{value.name}</p>)}
        </div>
    );
}