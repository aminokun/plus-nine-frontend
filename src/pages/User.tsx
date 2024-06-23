import ActivityCalendar from "react-activity-calendar";
import { useContext, useState, useEffect } from 'react';
import { defaultObjectiveResponse } from '@/constants';
import { AuthContext } from "@/context/AuthContext";
import { IObjectiveDataResponse } from '@/types/objective.type';
import axiosInstance from '@/utils/axiosInstance';

const User = () => {
    const authContext = useContext(AuthContext);
    const [objective, setObjective] = useState(defaultObjectiveResponse)
    const user = authContext.user

    useEffect(() => {
        return () => {
            const fetchObjective = async (): Promise<IObjectiveDataResponse> => {
                const response = await axiosInstance.get("/objective/completed");
                const responseData: any = response.data;
                setObjective(responseData);
                console.log(responseData)
                return responseData;
            }
            fetchObjective();
        }
    }, [10])

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center pt-10">
                <div className=""><div className='relative flex flex-col rounded-sm border border-opacity-30 min-h-[10rem] min-w-[23rem] w-[25rem] border-solo ' >
                    <div className="text-primary-foreground pt-[1rem] px-[2rem]">
                        <div className="relative">
                            <div className="relative flex flex-col  items-center justify-center overflow-auto">
                                <h3 className='flex justify-center w-full text-shadow-xl dark:text-white shadow-black'>
                                    User Info
                                </h3>
                                <ul className="text-white pt-2 justify-center flex flex-col">
                                    <li className="">
                                        Name: {user.username}
                                    </li>
                                    <li className="">
                                        Role: {user.role}
                                    </li>
                                    <li>
                                        Email: {user.email}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="flex pt-2">
                        <div className='relative rounded-sm border border-opacity-30 min-h-[10rem] min-w-[23rem] w-[25rem] border-solo bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#27486B] from-20% via-[#1F3044] via-60% to-[#121A22]' >
                            <div className="text-primary-foreground py-2 px-[2rem]">
                                <div className="relative">
                                    <div className="relative flex flex-col items-center justify-center">
                                        <h2 className="text-white">Completed Tasks</h2>
                                        <ul className="overflow-hidden container overflow-y-auto scroll-smooth rounded-sm border-y-2 border-opacity-30 max-h-[14.5rem] min-h-[10.5rem] border-solo">
                                            {objective.map((item, key) => (
                                                <a
                                                    className=""
                                                    key={key}
                                                >
                                                    <li
                                                        className="text-shadow-xl dark:text-white pointer-events-auto cursor-pointer shadow-black xs:text-md 2xs:text-sm font-normal uppercase"
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
                                                </a>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center item-center">
                    <div className="text-white border border-solo border-opacity-30 rounded-sm p-2 m-2">
                        <ActivityCalendar
                            blockMargin={2}
                            blockRadius={1}
                            blockSize={8}
                            theme={{
                                "light": [
                                    "#ffffff",
                                    "#90e0ef",
                                    "#00b4d8",
                                    "#0077b6",
                                    "#03045e"
                                ],
                                "dark": [
                                    "#ffffff",
                                    "#90e0ef",
                                    "#00b4d8",
                                    "#0077b6",
                                    "#03045e"
                                ]
                            }}
                            data={[

                                {
                                    count: 0,
                                    date: "2023-12-31",
                                    level: 0
                                },
                                {
                                    count: 3,
                                    date: "2024-04-21",
                                    level: 1
                                },
                                {
                                    count: 1,
                                    date: "2024-12-31",
                                    level: 1
                                }
                            ]}
                            labels={{
                                legend: {
                                    less: "Less",
                                    more: "More"
                                },
                                months: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec"
                                ],
                                totalCount: "{{count}} total activities",
                                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                            }}
                        />
                    </div>
                    <div className="text-white border border-solo border-opacity-30 rounded-sm p-2 m-2">
                        <ul className="overflow-hidden container overflow-y-auto scroll-smooth border-opacity-30 max-h-[14.5rem] min-h-[10.5rem]">
                            {objective.map((item, key) => (
                                <a
                                    className=""
                                    key={key}
                                >
                                    <li
                                        className="text-shadow-xl dark:text-white pointer-events-auto cursor-pointer shadow-black xs:text-md 2xs:text-sm font-normal uppercase"
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
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User