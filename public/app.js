import { fetchArt } from  "./modules/fetchArt.js";
import { searchDataRijks } from "./modules/search.js";
import { mySearch } from "./modules/search.js";

fetchArt("Katsushika+Hokusai", "#hokusai");
fetchArt("Utagawa+Kuniyoshi", "#kuniyoshi");
mySearch();
searchDataRijks(); 

document.querySelector('form').addEventListener('submit', function(prevent) {
    prevent.preventDefault();
    const searchField = document.getElementById('searchField');
    let searchValue = searchField.value;
    searchDataRijks(searchValue);
})