// // route for artworks kuniyoshi
// app.get('/DiscoverArt', async (req, res) => {
//     const urlKuniyoshi = `https://www.rijksmuseum.nl/api/nl/collection?key=9c1DbBQC&involvedMaker=Utagawa+Kuniyoshi&ps=30`

//     const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='

//     const resultsData = dataSearchRijks + searchValue;


//     const options = {
//         method: 'GET'
//     }

//     const response = await fetch(resultsData, options)
//         .then(res => res.json())
//         .catch(e => {
//             console.error({
//                 'message': 'oh no',
//                 error: e,
//             })
//         })
//     console.log(response)
//     res.render('searchbar', {
//         data: response.artObjects
//     })
// })






// // route for home discover page with searchbar
// app.get('/DiscoverArt', async (req, res) => {
//     const APIlink = 'https://www.rijksmuseum.nl/api/en/collection?key=9c1DbBQC&ps=20';

//     const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='
//     const options = {
//         method: 'GET'
//     }

//     function mySearch() {
//         let fullCollection;
//         console.log('hi')
//         // Function fetching broad data base to search in
//         fetch(APIlink)
//             .then(function (response) {
//                 return response.json()
//             })

//             // Function logging the response of requested data 
//             .then(function (data) {
//                 fullCollection = data;
//                 console.log(data);
//             })
//     }

//     function searchDataRijks(searchValue) {

//         const resultsData = dataSearchRijks + searchValue;

//         fetch(resultsData)
//             .then(function (response) {
//                 return response.json();
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }


// })










// const APIlink = 'https://www.rijksmuseum.nl/api/en/collection?key=9c1DbBQC&ps=20';

// export const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='

// // function deleteResults() {
// //     let artworks = document.querySelectorAll('#home ul li') 

// //     artworks.forEach(artwork => {
// //         artwork.remove();
// //     })
// // }


// app.get('/DiscoverArt', async (req, res) => {

// function searchDataBase() {  
//     let fullCollection;

//     // Function fetching broad data base to search in
//     fetch (APIlink)
//         .then(function(response){
//             return response.json()
//         })

//         // Function logging the response of requested data 
//         .then(function(data) {
//             fullCollection = data;
//             console.log(data);               
//         })
// }

//  function searchDataRijks(searchValue) {
//     // deleteResults();

//     const resultsData = dataSearchRijks + searchValue;

//     fetch(resultsData)
//         .then(function(response) {
//             return response.json();
//         })
// }
// }) 




////////////////////


const APIlink = 'https://www.rijksmuseum.nl/api/en/collection?key=9c1DbBQC&ps=20';

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
    fetch(APIlink)
        .then(function (response) {
            return response.json()
        })

        // Function logging the response of requested data 
        .then(function (data) {
            fullCollection = data;
            console.log(data);

            // Function rendering objects to HTML if i want to have some default artworks on the homepage
            for (let i = 0; i < data.artObjects.length; i++) {
                const artwork = data.artObjects[i].webImage.url
                const artworkTitle = data.artObjects[i].longTitle
                const titleShort = data.artObjects[i].title
                document.querySelector('#home ul').insertAdjacentHTML(`beforeend`, `
                    <li>
                        <img src='${artwork.slice(0, -3) + '=s1000'}' alt='${titleShort}'>
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
        .then(function (response) {
            return response.json();
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






// route for artworks discover art
app.get('/DiscoverArt', async (req, res) => {

    const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='

    const resultsData = dataSearchRijks + searchValue;

    const options = {
        method: 'GET'
    }

    const response = await fetch(resultsData, options)
        .then(res => res.json())
        .catch(e => {
            console.error({
                'message': 'oh no',
                error: e,
            })
        })
    console.log(response)
    res.render('searchbar', {
        data: response.artObjects
    })
})

document.querySelector('form').addEventListener('submit', function (prevent) {
    prevent.preventDefault();
    const searchField = document.getElementById('searchField');
    let searchValue = searchField.value;
    searchDataRijks(searchValue);
})

