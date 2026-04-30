"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API } from "@/lib/api";
import Link from "next/link";
import Navbar from "../components/navbar";

type responseJson = {
    "Criteria": string,
    "Score": string,
    "Justification": string
}
export default function GradingResponse(){
    const [response, setResponse] = useState<responseJson[]>([]);
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid')
    useEffect(() => {
        async function getResponse() {
            const response = await API.get('/api/get-ai-grading', {params: {uuid: uuid}});
            console.log(response.data)
            setResponse(response.data)
        }
        getResponse()
    }, [])

    return (
        <div><Navbar />
        <div className="p-10 pl-20 pr-20 font-roboto">  
            <div className="p-10 pl-20 pr-20 font-roboto">
                        {response!.length > 0 && response?.map((data:responseJson, key)=>(
                            <div key={key} className="flex flex-col gap-2">
                            <span>Criteria: {data.Criteria}</span>
                            <span>Score: {data.Score}</span>
                            <span>Justification: {data.Justification}</span>
                        </div>))}
                    </div>
        </div>
        </div>
    )
}
