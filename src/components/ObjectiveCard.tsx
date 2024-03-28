import { useEffect, useState } from 'react';
import { IObjectiveItem, objective } from '../constants'
import axios from 'axios'

const ObjectiveCard = () => {
    const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                const { data: response } = await axios.get<IObjectiveItem[]>('https://localhost:7299/api/objective', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        setData(response.data);

                    });
            } catch (error) {
                console.error(error)
            }
            // setLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div className="container flex items-center justify-center">

            <div className='relative rounded-sm border-2 border-opacity-30 w-[25rem] h-[40rem]  border-solo bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#27486B] from-20% via-[#1F3044] via-60% to-[#121A22]' >
                <div className='absolute h-[1.5rem] w-[90%] bg-gradient-to-b from-solo from-1% blur-md left-5 top-[3rem]  ' />
                <div className='absolute h-[1.5rem] w-[90%] bg-gradient-to-t from-solo from-1% blur-md left-5 top-[4.9rem]  ' />
                <div className="text-primary-foreground pt-[3rem] px-[2rem]">
                    <div className="relative">
                        <div className="relative flex-col items-center justify-center">
                            <h3 className='flex justify-center w-full text-shadow-xl shadow-black'>
                                <div className="border-2 mt-1 mr-2 rounded-full text-lg w-[2rem] h-[2rem] text-red-200">!</div>
                                Quest Info
                            </h3>
                            <p className="mt-[2rem] uppercase font-medium text-sm text-shadow-lg shadow-black">
                                Daily Quest - Train to become<br /> a formidable combatant
                            </p>
                            <div className="mt-[3rem] font-bold text-green-500 text-shadow-lg shadow-black text-lg">
                                Goals
                            </div>
                            <ul className="">
                                {objective.map((item, key) => (
                                    <li
                                        key={key}
                                        className="text-shadow-xl shadow-black text-md font-normal uppercase"
                                    >
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                - {item.objectiveName}
                                            </div>
                                            <div>
                                                [{item.currentAmount}{`/`}{item.amountToComplete}]
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="relative">
                                <p className="absolute left-[3.7rem] top-[10rem] text-shadow-xl shadow-black text-sm uppercase"><span className='text-red-500 font-bold'>CAUTION!</span>- if the daily quest <br />remains incomplete, penalties,<br /> will be given accordingly</p>
                                <svg className='absolute left-[9rem] top-[16rem]' width={50} height={50} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObjectiveCard