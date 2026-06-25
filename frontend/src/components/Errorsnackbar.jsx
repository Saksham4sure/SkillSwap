import { useState, useEffect } from "react";

export default function ErrorSnackbar({error}) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        if(!error) return
        setIsVisible(true);
        const timer = setTimeout(() => setIsVisible(false), 5000);
        return () => clearTimeout(timer); 
    }, [error]);

    if (!isVisible) return null;

    return (
        <div className="absolute top-4 right-4 bg-gray-100 flex items-center justify-center">
            <div className="flex items-start gap-3 bg-white border-l-4 border-rose-500 rounded-lg shadow-md px-4 py-3.5 w-80">
                <div className="shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Something went wrong</p>
                    <p className="text-xs text-gray-500 mt-0.5">{error}</p>
                </div>
            </div>
        </div>
    );
}