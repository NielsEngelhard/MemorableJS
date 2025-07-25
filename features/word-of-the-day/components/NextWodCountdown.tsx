import Badge from '@/components/ui/Badge';
import { useState, useEffect } from 'react';

export default function NextWodCountdown() {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            
            // Calculate next UTC midnight
            const nextMidnight = new Date(utcNow);
            nextMidnight.setUTCHours(24, 0, 0, 0);
            
            const timeDiff = nextMidnight.getTime() - utcNow.getTime();
            
            if (timeDiff > 0) {
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                const h = hours.toString().padStart(2, '0');
                const m = minutes.toString().padStart(2, '0');
                const s = seconds.toString().padStart(2, '0');
                
                setTimeLeft(`${h}:${m}:${s}`);
            } else {
                setTimeLeft('00:00:00');
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (

        <Badge variant="primaryLight">
            Reset in: {timeLeft}
        </Badge>
    )
}