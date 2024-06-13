import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axiosInstance from '@/utils/axiosInstance';

const NotificationComponent = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await axiosInstance.get('/auth/jwtcheck', {
                    withCredentials: true,
                });
                const { token } = response.data;

                const connect = new signalR.HubConnectionBuilder()
                    .withUrl('https://localhost:44365/friendHub', {
                        accessTokenFactory: () => token,
                    })
                    .withAutomaticReconnect()
                    .build();

                setConnection(connect);

                connect.start()
                    .then(() => {
                        console.log('Connected!');
                        connect.on('ReceiveTestMessage', (message) => {
                            console.log('Received test message:', message);
                        });
                    })
                    .catch(err => console.error('Connection failed: ', err));
            } catch (error) {
                console.error('Failed to fetch access token:', error);
            }
        };

        fetchAccessToken();

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    return null;
};

export default NotificationComponent;