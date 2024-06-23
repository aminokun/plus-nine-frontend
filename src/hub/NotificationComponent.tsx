import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axiosInstance from '@/utils/axiosInstance';
import { useToast } from "../components/ui/use-toast"


const NotificationComponent = () => {
    const [connection, setConnection] = useState(null);
    const { toast } = useToast()


    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const response = await axiosInstance.get('/auth/jwtcheck', {
                    withCredentials: true,
                });
                const { token } = response.data;
                return token;
            } catch (error) {
                console.error('Failed to retrieve access token:', error);
                return null;
            }
        };

        const startConnection = async () => {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                console.error('Access token not available');
                return;
            }

            const connect = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:44365/friendHub', {
                    accessTokenFactory: () => accessToken,
                })
                .withAutomaticReconnect()
                .build();

            setConnection(connect);

            try {
                await connect.start();
                console.log('Connected!');

                connect.on('ReceiveFriendRequest', (message) => {
                    console.log('Received Friend Request:', message);
                    return toast({
                        description: "Received Friend Request",
                    });
                });
                connect.on('FriendRequestAccepted', (message) => {
                    console.log('Friend Request Accepted:', message);
                    return toast({
                        description: "Friend Request Accepted",
                    });
                });
                connect.on('FriendRequestRejected', (message) => {
                    console.log('Friend Request Rejected:', message);
                    return toast({
                        variant: "destructive",
                        description: "Friend Request Rejected",
                    });
                });
            } catch (error) {
                console.error('Connection failed:', error);
            }
        };

        startConnection();

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    return null;
};

export default NotificationComponent;