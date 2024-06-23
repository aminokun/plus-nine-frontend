import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import UserSearch from '@/components/UserSearch'
import { useToast } from "./ui/use-toast"


interface FriendRequest {
    id: string;
    username: string;
}



const FriendRequestList: React.FC = () => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const { toast } = useToast()

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await axiosInstance.get<FriendRequest[]>('/friend/incommingrequests');
            setFriendRequests(response.data);
            console.log(response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return toast({
                        title: "Error sending friend request:",
                        description: error.response.data.message,
                        variant: "destructive"
                    });
                }
            }
        }
    };

    const handleAcceptFriendRequest = async (requestId: string) => {
        try {
            await axiosInstance.put(`/friend/accept/${requestId}`);
            console.log('Friend request accepted successfully');
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return toast({
                        title: "Error sending friend request:",
                        description: error.response.data.message,
                        variant: "destructive"
                    });
                }
            }
        }
    };

    const handleRejectFriendRequest = async (requestId: string) => {
        try {
            await axiosInstance.put(`/friend/reject/${requestId}`);
            console.log('Friend request rejected successfully');
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return toast({
                        title: "Error sending friend request:",
                        description: error.response.data.message,
                        variant: "destructive"
                    });
                }
            }
        }
    };

    return (
        <div className="items-center justify-center flex">

            <div className='flex flex-col justify-center py-5  min-w-[40rem] '>
                <div className="flex flex-row justify-between ">
                    <h2 className='mx-2'>Friend Requests</h2>
                    <UserSearch />
                </div>
                <ul >
                    {friendRequests.map((request) => (
                        <li
                            className='border-solo rounded-sm border-opacity-30 border my-1'
                            key={request.id}
                        >
                            <div className="flex flex-row justify-between p-2">
                                <p className="text-white">
                                    {request.username}
                                </p>
                                <div className="">
                                    <Button className='mx-2 text-white' variant="outline" onClick={() => handleAcceptFriendRequest(request.id)}>Accept</Button>
                                    <Button variant="destructive" onClick={() => handleRejectFriendRequest(request.id)}>Reject</Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FriendRequestList;