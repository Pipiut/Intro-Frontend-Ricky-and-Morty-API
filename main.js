//Declaracion de variables
const container = document.getElementById("container");
const maleFilter= document.getElementById("male");
const femaleFilter= document.getElementById("female");
const genderlessFilter= document.getElementById("genderless");
const unknownFilter= document.getElementById("unknown");
const pageInfo = document.getElementById('pageInfo');
const countInfo = document.getElementById("total-characters");
const start = document.getElementById("first-page");
const prev = document.getElementById("previus-page");
const next = document.getElementById("next-page");
const end = document.getElementById("last-page");
let totalPage= 0;
let pageNumber= 1;
let currentPage = 1;

// Funciones para traer las cards y filtrar por genero 
const getCharacters = (pageNumber) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
        characters(data)
        totalPage = data.info.pages  
    });
};
const characters = (data) => {
    container.innerHTML = "";
    data.results.forEach(character => {
    container.innerHTML +=
    `<div class="card" tabindex="0">
        <div class= "container-img"> 
            <img src="${character.image}" alt="${character}.name"> 
        </div>
        <div class= "container-text">    
            <h2>${character.name}</h2> 
            <p>Gender: ${character.gender}</p>
            <p>Spicies: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <p>Origin: ${character.origin.name}</p>  
            <p>Location:${character.location.name}</p>
        </div>
        <div class="more_info">
        <!--  💪 Desafíos extra (opcionales)
        ● Agregar la funcionalidad del botón “Ver más” donde muestre la información
        específica del personaje sobre el que se hizo click:
        https://rickandmortyapi.com/documentation/#get-a-single-character -->
            <button class= "info">
                <a href="https://rickandmortyapi.com/api/character/${character.id}" id="character/${character.id}" target="_blank" tabindex="-1">See more...</a>
            </button>                 
        </div>
    </div>
    `
    });       
    countInfo.innerText = data.info.count;      
};
const filterGender= (valueParam)=>{
    fetch(`https://rickandmortyapi.com/api/character/?gender=${valueParam}`)
    .then(res => res.json())
    .then(data=>characters(data))    
    totalPage = data.info.pages   
};
//Eventos para filtrar por genero y para la paginacion
femaleFilter.addEventListener("click", () => {
    filterGender("female")
});
maleFilter.addEventListener("click" , () => {
    filterGender("male")
});
genderlessFilter.addEventListener("click", () => {
    filterGender("genderless")
});
unknownFilter.addEventListener("click", () => {
    filterGender("unknown")
});
start.addEventListener("click", () => {
    getCharacters(1);
    pageInfo.innerText = `1`;
    prev.setAttribute("disabled", true)
    next.removeAttribute("disabled", false)
    currentPage = 1
});
next.addEventListener("click", () => {
    if (currentPage <= 1){
        start.removeAttribute("disabled", false)
        currentPage++;
    } else if (currentPage >1 && currentPage < totalPage){
        prev.removeAttribute("disabled", false)
        currentPage++;
    }else {
        next.setAttribute("disabled", true)
    }
    pageInfo.innerText = `${currentPage} - ${totalPage}`;
    getCharacters(currentPage);
});
prev.addEventListener("click", () => {
    if (currentPage <= 1){
        prev.setAttribute("disabled", true)
    } else if (currentPage >1 && currentPage < totalPage){
        currentPage--;
        next.removeAttribute("disabled", false)
    } 
    else{
        next.setAttribute("disabled", true)
        currentPage--;
    }
    pageInfo.innerText = `${currentPage} - ${totalPage}`;
    getCharacters(currentPage);
});
end.addEventListener("click", () => {
    getCharacters(totalPage);
    pageInfo.innerText = `${totalPage}`;
    next.setAttribute("disabled", true)
    prev.removeAttribute("disabled", false)
    currentPage = totalPage
});
//Se ejecuta la funcion para traer las cards
getCharacters();
pageInfo.innerText = 1;