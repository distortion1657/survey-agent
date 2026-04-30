'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import Navbar from "../components/navbar";


export default function AIResponse() {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        async function getResponse() {
            const response = await API.get('/api/get-ai-response')
            setHtmlContent(response.data)
        }
        getResponse()
    }, [])

    return (
        <div><Navbar />
        <div className="p-10 pl-20 pr-20 font-roboto">

            {htmlContent ? (
                // Safely inject the HTML string returned by the API
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <div>
                    <h1>No response found</h1>
                    <p>Please submit a scenario and rubric from the home page first.</p>
                </div>
            )}
        </div>
        </div>
    )
}