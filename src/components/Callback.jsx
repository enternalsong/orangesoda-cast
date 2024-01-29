import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {checkFirebase_user} from '../api/firebase';
import { getUserShow } from '../api/api';

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
                console.log(token);
                const profile = await fetchProfile(token);
                console.log(profile); 
                const user_save_show = await getUserShow(token)
                
                console.log(user_save_show.items);
                if(user_save_show.items===null){
                    user_save_show.items=[""];
                }
                const cg_set =[{"Spotify已收藏節目":user_save_show.items}];
                if(token){
                    checkFirebase_user(`${profile.id}`,`${profile.display_name}`,`${profile.email}`,`${profile.product}`,cg_set,false);
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
        //local
        //params.append("redirect_uri", "http://localhost:5173/callback");
        //deploy
        params.append("redirect_uri", "https://alfacast.netlify.app/callback");
        params.append("code_verifier", verifier);
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token } = await result.json();
        console.log(access_token);
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
            Callback Error Loading
        </div>
    )
}
export default Callback;