import axios from 'axios';

const clientId =import.meta.env.VITE_API_CLIENT_ID; // Replace with your client ID
const params = new URLSearchParams(window.location.search);

const LoginButton=()=>{
    const token = localStorage.getItem("spotifyToken");

    return(
        <button className="px-[120px] py-[16px] bg-green-login hover:bg-green-hoverLogin text-white font-bold  rounded-[16px] mb-[25px]" onClick={()=>{handleLogin()}}>使用Spotify帳號登入</button> 
    )
}
async function handleLogin(){
    const code = params.get("code");
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        console.log(accessToken);
        const profile = await fetchProfile(accessToken);
        console.log(profile);
    }  
}
export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);   
    localStorage.setItem("verifier", verifier);    
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
export async function getAccessToken(clientId, code) {
    try{
        const verifier = localStorage.getItem("verifier");       
        const params = new URLSearchParams();
        const url = "https://accounts.spotify.com/api/token";
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173/callback");
        params.append("code_verifier", verifier);
        const headers = {
            "Content-Type":"application/x-www-form-urlencoded",
        }
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
        // const result = await axios.post(
        //     url,
        //     params,
        //     {headers}
        // );
        console.log(result.data);
        const { access_token} = await result.json();
        localStorage.setItem("spotifyToken",access_token);
        console.log({access_token});
        localStorage.setItem("refreshToken",result.refresh_token);
        console.log(localStorage);
        return access_token;
    }catch(error){
        console.error('Error during fetch Token:', error.message);
    }
}
async function fetchProfile(token) {
    console.log(token);
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();  
    // TODO: Call Web API
}
export default LoginButton;