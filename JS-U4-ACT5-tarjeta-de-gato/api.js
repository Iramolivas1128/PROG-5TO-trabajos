const apiUrl = 'https://api.thecatapi.com/v1/images';
const catImg = document.getElementById('cat-img');
const catName = document.getElementById('cat-name');
const catTemperament = document.getElementById('cat-temperament');
const catLifeExpectancy = document.getElementById('cat-life-expectancy');
const catDescription = document.getElementById('cat-description');
const catChildFriendly = document.getElementById('cat-child-friendly');
const catDogFriendly = document.getElementById('cat-dog-friendly');
const catOrigin = document.getElementById('cat-origin');
const linkExtraInfo = document.getElementById('link-extra-info');


const breedId = '0XYvRd7oD'; 


async function getCatDetails(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            headers: {
                'x-api-key': 'live_bc8C1zctTnR9iYnarcpriS6wgwMUEFTLwcWK7gFXtOVpPLAzBiCEFyT2UQxOUP61'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        displayCatDetails(data);
    } catch (error) {
        console.error('Error al obtener detalles del gato:', error);
    }
}

function displayCatDetails(cat) {
    catImg.src = cat.url || 'https://via.placeholder.com/200';
    catName.textContent = cat.breeds[0]?.name || 'No disponible';
    catTemperament.textContent = cat.breeds[0]?.temperament || 'No disponible';
    catLifeExpectancy.textContent = cat.breeds[0]?.life_span || 'No disponible';
    catDescription.textContent = cat.breeds[0]?.description || 'No disponible';
    catChildFriendly.textContent = cat.breeds[0]?.child_friendly || 'No disponible';
    catDogFriendly.textContent = cat.breeds[0]?.dog_friendly || 'No disponible';
    catOrigin.textContent = cat.breeds[0]?.origin || 'No disponible';
    linkExtraInfo.href = cat.breeds[0]?.wikipedia_url || '#';
    linkExtraInfo.textContent = 'Más información';
}


window.addEventListener('DOMContentLoaded', () => getCatDetails(breedId));
