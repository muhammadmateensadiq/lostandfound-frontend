"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function VerifyClient({
    uid,
    token,
}: {
    uid: string;
    token: string;
}) {
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            try {
                await api.get(`/accounts/auth/verify-email/${uid}/${token}/`);
                setMessage("Email verified successfully!");
            } catch {
                setMessage("Invalid or expired link");
            }
        };

        verify();
    }, [uid, token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-8 text-center w-[400px]">

                <h1 className="text-xl font-semibold mb-2 text-gray-800">
                    FindIt
                </h1>

                <p className="text-gray-600">{message}</p>

            </div>
        </div>
    );
}