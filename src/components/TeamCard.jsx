import React from 'react'
import { useEffect, useState } from 'react';

const TeamCard = () => {
    onst[teamsData, setTeamsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7299/api/Teams');
                setTeamsData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className=' items-center justify-center align-content flex'>
            <div className="bg-white border rounded-md border-gray-400 w-[20rem] h-[40rem]">
                {teamsData.map((items) => (
                    <div className="">
                        {items.Name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamCard