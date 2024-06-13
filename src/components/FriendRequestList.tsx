import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface FriendRequest {
    id: string;
    senderUserName: string;
}

const FriendRequestList: React.FC = () => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await axiosInstance.get<FriendRequest[]>('/friend/requests');
            setFriendRequests(response.data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };

    const handleAcceptFriendRequest = async (requestId: string) => {
        try {
            await axiosInstance.put(`/friends/accept/${requestId}`);
            console.log('Friend request accepted successfully');
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleRejectFriendRequest = async (requestId: string) => {
        try {
            await axiosInstance.put(`/friend/reject/${requestId}`);
            console.log('Friend request rejected successfully');
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            <ul>
                {friendRequests.map((request) => (
                    <li key={request.id}>
                        {request.senderUserName}
                        <button onClick={() => handleAcceptFriendRequest(request.id)}>Accept</button>
                        <button onClick={() => handleRejectFriendRequest(request.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequestList;