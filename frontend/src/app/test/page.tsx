'use client'

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Testing = () => {

    const { data : session, status } = useSession();
    const [problems, setProblems] = useState<any>({});

    useEffect(()=>{
        const fetch = async ()=>{
            try{    
                const res = await axios.get('http://localhost:3000/api/problems', {
                    withCredentials : true
                });
                const problems = res.data.problems;
                setProblems({...problems});
            } catch {
                console.log("error");
            }
        }
        fetch();
    }, [])

    return(
        <>
            <div>
                <h1> This is a Tesing Public </h1>
                <pre> {JSON.stringify(session, null, 2)} </pre>
                <p> {JSON.stringify(problems)} </p>
                <button onClick={()=>signOut()}> sign out </button>
            </div>
        </>
    )
}
export default Testing;