
const clientId =import.meta.env.VITE_API_CLIENT_ID; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const LoginButton=()=>{
    return(
        <button className="px-[120px] py-[16px] bg-green-login hover:bg-green-hoverLogin text-white font-bold  rounded-[16px] mb-[25px]" onClick={()=>{handleLogin()}}>使用Spotify帳號登入</button> 
    )
};
async function handleLogin(){
    const code = params.get("code");
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    }
}
async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);   
    localStorage.setItem("verifier", verifier);    
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    //local
    //params.append("redirect_uri", "http://localhost:5173/callback");
    //deploy
    params.append("redirect_uri", "https://alfacast.netlify.app/callback");
    params.append("scope", `user-read-private 
                            user-read-email
                            user-read-playback-state
                            playlist-read-private
                            playlist-modify-public playlist-modify-private user-library-read user-library-modify` 
                 );
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
export default LoginButton;