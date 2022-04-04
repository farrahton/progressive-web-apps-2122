// script/app.js file
// If supported, install the service worker.
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js")
            .then(function (registration) {
                return registration.update()
            })
            .catch(function (error) {
                console.log(error)
            })

        // If the offline page is shown, fill the search bar with the query.
        if ($(".instructions a")) {
            const url = new URL(window.location.href)
            $("form input[type=\"text\"]").value = url.searchParams.get("q")
        }
    })
}

// sw file:
// / caches index.ejs as HTML.
const CORE_FILES = [
    "/fonts/Lato-Bold.ttf",
    "/fonts/Lato-Regular.ttf",
    "/fonts/Playlist-Script.otf",
    "/images/background.jpg",
    "/images/placeholder.png",
    "/images/search.png",
    "/scripts/script.js",
    "/styles/style.css",
    "/",
    "/offline"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("core-cache").then(function (cache) {
            return cache.addAll(CORE_FILES)
        })
    )
    console.log("Service worker installed.")
})

self.addEventListener("activate", function (_event) {
    console.log("Service worker activated.")
})

self.addEventListener("fetch", function (event) {
    const url = new URL(event.request.url)
    // Check if any of the requested files already exists in the core-cache.
    if (event.request.method === "GET" && CORE_FILES.includes(url.pathname)) {
        event.respondWith(
            caches.open("core-cache")
                .then(cache => cache.match(event.request.url))
        )
        // Only cache the HTML file.
    } else if (event.request.method === "GET" && (event.request.headers.get("accept") !== null && event.request.headers.get("accept").includes("text/html"))) {
        event.respondWith(
            // Stale-while-revalidate (see https://web.dev/offline-cookbook/#stale-while-revalidate).
            caches.open("dynamic-cache").then(function (cache) {
                return cache.match(event.request)
                    .then(function (response) {
                        var fetchPromise = fetch(event.request).then(function (networkResponse) {
                            cache.put(event.request, networkResponse.clone())
                            return networkResponse
                        })
                        return response || fetchPromise
                    })
                    .catch(_error => {
                        return caches.open("core-cache")
                            .then(cache => cache.match("/offline"))
                    })
            }),
        )
    }
    console.log("Service worker fetched.")
})


// server file:
// Import Express.
import express from "express"
// Import node-fetch.
import fetch from "node-fetch"

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to EJS.
app.set("view engine", "ejs")

// Set the port for Express.
app.listen(8080)

// Listen to all GET requests on /.
app.get("/", function (_req, res) {
    res.render("index")
})

// Listen to all GET requests on /search.
app.get("/search", async function (req, res) {
    // Boolean which shows if the search query is a barcode.
    const barcode = /^\d+$/.test(req.query.q)

    // Save the correct URL based on if the search query is a barcode or not.
    const url = barcode ? `https://world.openfoodfacts.org/cgi/search.pl?code=${req.query.q}&search_simple=1&action=process&json=1&page=${req.query.p}`
        : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.query.q}&search_simple=1&action=process&json=1&page=${req.query.p}`

    // Get the products from the API.
    const response = await fetch(url)
    const data = await response.json()

    if (data.products == 0) {
        // Assign a name to the search query type.
        const type = barcode ? "barcode" : "name"
        res.render("error", { query: req.query.q, type: type })
    } else {
        res.render("results", { query: req.query.q, products: data.products, page: data.page, pages: Math.ceil(data.count / data.page_size) })
    }
})

// Listen to all GET requests on /offline.
app.get("/offline", function (_req, res) {
    res.render("offline")
})