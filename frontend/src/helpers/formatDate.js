
export default function formatDate(dataInput) {
    if(dataInput){
        const data = new Date(dataInput);
        return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'}) +' '+ data.toLocaleTimeString('pt-BR', {timeZone: 'UTC'});
    }
}