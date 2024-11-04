import { useEffect, useState } from 'react';
import { useRouter } from "next/router"

function useSession() {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        async function fetchSession() {
            const res = await fetch('/api/session');
            if (res.ok) {
                const data = await res.json();
                setSessionData(data);
                setLoading(false);
            }else{
                router.push('/auth/login')
            }
        }

        fetchSession();
    }, []);

    return { sessionData, loading };
}

export default useSession;