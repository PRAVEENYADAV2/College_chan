"use client";  // This ensures the component is rendered on the client side

import { useEffect } from "react";

export default function TrackIP({ threadId }: { threadId: number }) {
    useEffect(() => {
        // Check if the current thread ID matches the one we want to track (4 in your case)
        // Fetch IP address from an external API
        const fetchIPAddress = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get-api');
                const data = await response.json();
                const ipAddress = data.ip;

                // Store the IP address in localStorage
                localStorage.setItem('visitor_ip', ipAddress);

                console.log('IP address stored:', ipAddress);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchIPAddress();
    }, [threadId]);

    return null;  // This component doesn't render anything
}
