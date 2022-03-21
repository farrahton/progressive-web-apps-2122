//1 variables
// my API-key: 9c1DbBQC 
import { renderHTML } from "./renderHTML.js";
// import { renderData } from "./details.js";
export function fetchArt(involvedMaker, selector) {

    const artworksArtists = `https://www.rijksmuseum.nl/api/nl/collection?key=9c1DbBQC&involvedMaker=${involvedMaker}&ps=30` ;
    const loader = document.querySelector('#loaderContain');
    const errorState = document.querySelector('.error');
    loader.classList.remove('hidden'); 
    // empty.classList.remove('hidden');

    // console.log('hi');
    //2 the story
    giveArt();
    
    //3 fuction
    function giveArt() {
        fetch (artworksArtists)
            .then(function(response){
                loader.classList.add('hidden');
                console.log(response.status) 
                // this is a ternary operator it checks if the response is between 200 and 299. >= stands for bigger than or equal and && stands for both >=  <=  should be true. For future reference: another possible option could be ||, which would mean 'or'.
                return response.status >= 200 && response.status <= 299 ? response.json() : console.log('error')  
            })
            .then(function(items){
                renderHTML(items, selector);
            })
            .catch((error) => {
                loader.classList.add('hidden')
                console.log(error);
                errorState.insertAdjacentHTML(

                    "beforeend",
                     
                    ` <div class="error">
                    <h3> Er ging helaas iets fout. Probeer het opnieuw!<h3>
                    </div>
                    `
                );
            });
            
    }
    // function giveDetails(collection) {
    //     for(let i=0; i < collection.length; i++) {
    //         fetch('https://www.rijksmuseum.nl/api/nl/collection/' +
    //         collection[i].objectNumber + '?key=xvdOJegg&ps=10imgonly=true')
    //         .then(function(response){
    //             return response.json();
    //         }).then(function(details){
    //             renderData(details)
    //         })
    //         .catch((error)=> {
    //             console.log(error);
    //         });
    //     }
    // }

}
    export function $(element) {
        return document.querySelector(element)
    }






