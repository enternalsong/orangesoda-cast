import axios from 'axios';

export async function fetchProfile(token){
        let result = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
            }).then(res =>{
                return  res.data;
            }).catch(err=>{
                console.log(err);
            })  
        return(result);
}

export async function getUserTop(token){
    let result = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5",{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res);
        console.log(res.data);
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export async function getUserPlayerList(token){
    let result = await axios.get("https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res);
        console.log(res.data);
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export async function Search(token,text){
    let result = await axios.get(`https://api.spotify.com/v1/search?q=${text}&type=show`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res.data);
        return res.data;
    }).catch(err=>{
        console.log(err)
    })
    return result;
}
