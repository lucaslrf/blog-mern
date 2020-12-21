import api from "../services/api";

export default async function getAutor(id) {
    console.log(id);
    try{
        const dataProfile = await api.get( `api/profile/bycreator/${id}`);
        console.log(dataProfile);
        return dataProfile && dataProfile.data ? dataProfile.data.profile.username : "Desconhecido";
    }catch(error){
        return "Desconhecido";
    }
}