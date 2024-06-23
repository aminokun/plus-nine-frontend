import React, { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import axiosInstance from '@/utils/axiosInstance';

interface ActivityCalendarEntry {
    count: number;
    date: string;
    level: number;
}

const ObjectiveActivityCalendar: React.FC<{ startDate: string, endDate: string }> = ({ startDate, endDate }) => {
    const [activityData, setActivityData] = useState<ActivityCalendarEntry[]>([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await axiosInstance.post<ActivityCalendarEntry[]>(`/Objective/Activity`, {
                    startDate,
                    endDate
                });
                setActivityData(response.data);
            } catch (error) {
                console.error('Failed to fetch activity data', error);
            }
        };

        fetchActivityData();
    }, [startDate, endDate]);

    return (
        <ActivityCalendar
            data={activityData}
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
    );
};

export default ObjectiveActivityCalendar;
