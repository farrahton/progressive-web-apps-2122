const APIlink = 'https://www.rijksmuseum.nl/api/en/collection?key=9c1DbBQC&ps=20';
const loader = document.querySelector('#loaderContain');
loader.classList.remove('hidden'); 

export const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='

function deleteResults() {
    let artworks = document.querySelectorAll('#home ul li') 

    artworks.forEach(artwork => {
        artwork.remove();
    })
}

export function mySearch() {  
    let fullCollection;

    // Function fetching broad data base to search in
    fetch (APIlink)
        .then(function(response){
            loader.classList.add('hidden');
            return response.json()
        })

        // Function logging the response of requested data 
        .then(function(data) {
            fullCollection = data;
            console.log(data);
        
        // Function rendering objects to HTML if i want to have some default artworks on the homepage
            for (let i = 0; i <data.artObjects.length; i++) {
                const  artwork = data.artObjects[i].webImage.url
                const  artworkTitle = data.artObjects[i].longTitle
                const  titleShort = data.artObjects[i].title
                document.querySelector('#home ul').insertAdjacentHTML(`beforeend` ,`
                    <li>
                        <img src='${artwork.slice(0, -3)+'=s1000'}' alt='${titleShort}'>
                        <section>
                            <h2>${artworkTitle}</h2>   
                        </section>

                    </li>`
                )  
                console.log(data.artObjects[i]);              
            }                
        })
}

export function searchDataRijks(searchValue) {
    deleteResults();
    
    const resultsData = dataSearchRijks + searchValue;
    
    fetch(resultsData)
        .then(function(response) {
            loader.classList.add('hidden');
            return response.json();
        })

        .then(function(resultsData){
            loader.classList.add('hidden');
            renderDataForSearch(resultsData);
        })

        .catch((error) => {
            console.log(error);
            console.log('An error occured, please try again.')
            loader.classList.add('hidden')
            errorState.insertAdjacentHTML("beforeend",     
            ` 
                <div class="error">
                    <h3> An error occured. Please, try again!<h3>
                </div>
            `
            );
        })
}


export function renderDataForSearch(resultsData) {
    
    const results = document.querySelector('#home ul');  
    
    for(let i=0; i < resultsData.artObjects.length; i++) {
        results.insertAdjacentHTML('beforeend',       
        `     
        <li>
            <img src='${resultsData.artObjects[i].webImage.url.slice(0, -3)+'=s1000'}' alt='${resultsData.artObjects[i].longTitle}'>
            <section>
                <h2>${resultsData.artObjects[i].longTitle}</h2>  
            </section>
        </li> `
        )}
 
    }
