import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Callback = () =>{
    const clientId =import.meta.env.VITE_API_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const navigate = useNavigate();
    //console.log(code);
    useEffect(()=>{
        async function wait_token(){
            try{
                const token = await getAccessToken(clientId, code);
                //console.log(token);

                const profile = await fetchProfile(token);
                console.log(profile);
                if(token){
                    console.log("happy");
                    navigate('/');
                }
            }catch(error){
                console.log('error',error);
            }
        }
        wait_token();
    },[]);
    //const navigate = useNavigate();

    async function getAccessToken(clientId, code) {
        console.log(code);
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173/callback");
        params.append("code_verifier", verifier);
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token } = await result.json();
        localStorage.setItem("accessToken",access_token);
        return access_token;
    }
    async function fetchProfile(token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        return await result.json();  
        // TODO: Call Web API
    }
    return(
        <div>
            Hello World
        </div>
    )
}
export default Callback;