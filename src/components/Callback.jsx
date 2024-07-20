import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {checkFirebase_user} from '../api/firebase';
import { getUserShow } from '../api/api';
const Callback = () =>{
    const clientId =import.meta.env.VITE_API_CLIENT_ID;
    const clientSecret = import.meta.VITE_API_SECRET_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const navigate = useNavigate();
    //console.log(code);
    useEffect(()=>{
        async function wait_token(){
            try{
                const token = await getAccessToken(clientId, code,clientSecret);
                const profile = await fetchProfile(token);
                const user_save_show = await getUserShow(token)  
                console.log(user_save_show.items);
                if(user_save_show.items===null){
                    user_save_show.items=[""];
                }
                const cg_set =[{"Spotify已收藏節目":user_save_show.items}];
                if(token){
                    getRefreshToken(clientId);
                    checkFirebase_user(`${profile.id}`,`${profile.display_name}`,`${profile.email}`,`${profile.product}`,cg_set,false);
                    navigate('/');
                }
            }catch(error){
                console.log('error',error);
            }
        }
        wait_token();
    },[]);
    //const navigate = useNavigate();

    async function getAccessToken(clientId, code,clientSecret) {
        //console.log(code);
        const verifier = localStorage.getItem("verifier");
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        //local
        //params.append("redirect_uri", "http://localhost:5173/callback");
        //deploy
        params.append("redirect_uri", "https://orangesodacast.netlify.app/callback");
        //
        params.append("code_verifier",verifier);
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
        const { access_token,refresh_token } = await result.json();
        console.log(access_token);
        //console.log(access_token);
        localStorage.setItem("accessToken",access_token);
        localStorage.setItem("refreshToken",refresh_token);
        return access_token;
    }

     
    async function fetchProfile(token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        return await result.json();  
    }
    return(
<div className="position-relative">
      <div
        className="position-absolute d-flex flex-column justify-center items-center w-100"
      >
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
       
      </div>
    </div>
    )
}
export const getRefreshToken = async (clientId) => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refreshToken');
    const url = "https://accounts.spotify.com/api/token";
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: clientId
       }),
     }
     const result = await fetch(url, payload);
     console.log(result);
     const {access_token,refresh_token}  = await result.json();
     localStorage.setItem('accessToken', access_token);
     localStorage.setItem('refreshToken', refresh_token);
   }
export default Callback;