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
        //console.log(res);
        //console.log(res.data);
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
       // console.log(res.data);
        return res.data;
    }).catch(err=>{
        console.log(err)
    })
    return result;
}

export async function saveUserShow(token,ids){
    let result = await axios.get(`https://api.spotify.com/v1/me/shows?ids=${ids}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        console.log(res.data);
        return res.data;
    }).catch(err=>{
        console.log(err)
    })
    return result;
}

export async function getShow_Ep(token,show_id){
    let result = await axios.get(`https://api.spotify.com/v1/shows/${show_id}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err)
    })
    return result;   
}
export async function deleteUserShow(token,show_id){
    let result = await axios.delete(`https://api.spotify.com/v1/me/shows?ids=${show_id}`,{
        headers: { Authorization: `Bearer ${token}`}
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
    return result
}
//My love Ep
export async function getUserSaveEp(token){
    let result = await axios.get(`https://api.spotify.com/v1/me/episodes`,{
        headers: { Authorization: `Bearer ${token}`}
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
    return result   
}
//save EP
export async function saveEpForUser(token,ep_ids){
    let result = await axios.put(`https://api.spotify.com/v1/me/episodes`,{
        ids:[ep_ids]
    },{
        headers: { Authorization: `Bearer ${token}`},
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
    return result   
}

export async function removeEpForUser(token,ep_ids){
    console.log(ep_ids)
    let result = await axios.delete(`https://api.spotify.com/v1/me/episodes`,{
        headers: { Authorization: `Bearer ${token}`},
        ids:[
            ep_ids
        ]
    }).then(res=>{
        getUserSaveEp(token);
        return res.data;
    }).catch(err=>{
        console.log(err);
    })
    return result   
}