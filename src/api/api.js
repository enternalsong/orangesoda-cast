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
    return result;
}

export async function getUserShow(token){
    let result = await axios.get(`https://api.spotify.com/v1/me/shows`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res);
        console.log(res.data);
        return res.data
    }).catch(err=>{
        console.log(err)
    })
    return result;
}

export async function search(token,text){
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

export async function getEp(token,href){
    let result = await axios.get(`${href}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res.data);
        return res.data;
    }).catch(err=>{
        console.log(err)
    })
    return result;
}
