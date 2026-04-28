"use client"
import { useState, useEffect } from "react";
import { API } from "@/lib/api";
import Link from "next/link";

export default function GradingResponse(){
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        async function getResponse() {
            const response = await API.get('/api/get-ai-response') // Works right now because Ai response for both survey response and survey grading use the same field on the db
            setHtmlContent(response.data)
        }
        getResponse()
    }, [])

    return (
        <div className="p-10 pl-20 pr-20 font-roboto">
            <Link href="/" className="text-indigo-600 hover:underline mb-5 inline-block">&larr; Back to Input</Link>

            {htmlContent ? (
                // Safely inject the HTML string returned by the API
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <div>
                    <h1>No response found</h1>
                    <p>Please submit student response and rubric in the previous page.</p>
                </div>
            )}
        </div>
    )
}
