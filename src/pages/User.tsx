import { useContext, useState, useEffect } from 'react';
import { defaultObjectiveResponse } from '@/constants';
import { AuthContext } from "@/context/AuthContext";
import { IObjectiveDataResponse } from '@/types/objective.type';
import axiosInstance from '@/utils/axiosInstance';
import ObjectiveActivityCalendar from '@/components/ObjectiveActivityCalendar';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { FriendObjective } from '@/components/FriendObjective';


interface IFriendResponse {
    friendId: string,
    username: string,
}

const defaultFriendResponse: IFriendResponse[] = [
    {
        friendId: "00000000-0000-0000-0000-000000000000",
        username: "",
    },
]

const User = () => {
    const authContext = useContext(AuthContext);
    const [objective, setObjective] = useState(defaultObjectiveResponse)
    const [friendName, setFriendName] = useState("")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [friendObjective, setFriendObjective] = useState(defaultObjectiveResponse)
    const [friends, setFriends] = useState(defaultFriendResponse)
    const { toast } = useToast();
    const user: any = authContext.user

    const viewFriendObjective = async (friendId: string, username: string) => {
        try {
            const response = await axiosInstance.get(`/Premium/GetFriendObjective?friendId=${friendId}`);
            const responseData: any = response.data;
            setFriendObjective(responseData);
            setFriendName(username);
            // console.log("friends", responseData);
            setIsEditModalOpen(true);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return toast({
                        title: "Error getting friend quest:",
                        description: error.response.data.message,
                        variant: "destructive"
                    });
                }
            }
        }
    }

    useEffect(() => {
        return () => {
            const fetchObjective = async (): Promise<IObjectiveDataResponse> => {
                const response = await axiosInstance.get("/objective/completed");
                const responseData: any = response.data;
                setObjective(responseData);
                // console.log(responseData)
                return responseData;
            }

            fetchObjective();
            const fetchFriends = async (): Promise<IFriendResponse> => {
                const response = await axiosInstance.get("/friend/getfriends");
                const responseData: any = response.data;
                setFriends(responseData);
                // console.log(responseData)
                return responseData;
            }
            fetchFriends();
        }
    }, [10])

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center pt-2">
                <div className=""><div className='relative flex flex-col rounded-sm border border-opacity-30 min-h-[10rem] min-w-[23rem] w-[25rem] border-solo ' >
                    <div className="text-primary-foreground pt-[1rem] px-[2rem]">
                        <div className="relative">
                            <div className="relative flex flex-col  items-center justify-center overflow-auto">
                                <h2 className='flex justify-center w-full text-shadow-xl dark:text-white shadow-black'>
                                    User Info
                                </h2>
                                <ul className="text-white pt-2 justify-center flex flex-col">
                                    <li className="">
                                        Name: {user.username}
                                    </li>
                                    <li className={`${user.role == "Premium" ? "text-orange-200" : "text-white"}`}>
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
                    <div className="text-white border border-solo border-opacity-30 rounded-sm p-2 mt-2 ">
                        <h2 className="flex justify-center">Friendlist</h2>
                        <ul className="overflow-hidden container overflow-y-auto scroll-smooth border-opacity-30 h-[14.8rem] w-[100%] p-0 ">
                            {friends.map((item, key) => (
                                <li
                                    className='border-solo rounded-sm border-opacity-30 border mb-1'
                                    key={item.friendId}
                                >
                                    <div className="flex flex-row justify-between p-2 ">
                                        <p className="text-white ">
                                            {item.username}
                                        </p>
                                        <div className={`${user.role == "Premium" ? "block" : "hidden"}`}>
                                            <Button className=' text-white' variant="outline" onClick={() => viewFriendObjective(item.friendId, item.username)}>View Objectives</Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-center item-center">
                    <div className="flex ml-2 ">
                        <div className='relative  rounded-sm border border-opacity-30 h-[17rem] overflow-hidden min-w-[23rem] w-[34.7rem] border-solo bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#27486B] from-20% via-[#1F3044] via-60% to-[#121A22]' >
                            <div className="text-primary-foreground py-2 px-[2rem]">
                                <div className="relative">
                                    <div className="relative flex flex-col items-center justify-center">
                                        <h2 className="text-white">Completed Objectives</h2>
                                        <ul className="overflow-hidden container overflow-y-auto scroll-smooth rounded-sm border-y-2 border-opacity-30 max-h-[14.5rem] pb-4  border-solo">
                                            {objective.map((item, key) => (
                                                <li
                                                    key={key}
                                                    className="text-shadow-xl text-green-500 pointer-events-auto cursor-pointer shadow-black xs:text-md 2xs:text-sm font-normal uppercase"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="text-white border border-solo border-opacity-30 rounded-sm p-2 m-2">
                        <ObjectiveActivityCalendar
                            startDate="2023-06-23T08:24:02.137Z"
                            endDate="2024-06-23T08:24:02.137Z"
                        />
                    </div>
                </div>
            </div>
            <FriendObjective
                className=""
                friendObjective={friendObjective}
                friendName={friendName}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    )
}

export default User