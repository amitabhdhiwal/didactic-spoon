const baseUrl = 'https://api.tvmaze.com';

//get url for show with embeded cast
function getUrl(id) {
    return `${baseUrl}/shows/${id}?embed=cast`;
}
let count = 0;
async function fetchShow(id, retryCount = 0) {
    try {
        const response = await fetch(getUrl(id));
        console.log(response.status, count++);
        //check if response is 200
        if (response.status === 200) {
            const body = await response.json();
            return body;
        }

        //check if response is 429
        if (response.status === 429) {
            //call again in 10 seconds
            await new Promise(resolve => setTimeout(resolve, 10000));
            return fetchShow(id);
        }
    } catch(e){
        if(retryCount === 2) return;
        retryCount = retryCount + 1;
        await new Promise(resolve => setTimeout(resolve, 10000));
        return fetchShow(id, retryCount);
    }
}

//get show and cast by id
export async function getShow(id) {
    let body = await fetchShow(id);
    if (!body) return;
    let cast = body._embedded.cast.map(cast => {
        return {
            id: cast.person.id,
            name: cast.person.name,
            birthday: cast.person.birthday
        }
    }).sort((a, b) => {
        return new Date(b.birthday) - new Date(a.birthday);
    });

    const show = {
        id: body.id,
        name: body.name,
        cast
    }
    return show;
}