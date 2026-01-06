sequenceDiagram
    participiant browser 
    participiant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server activate
    server->>browser: HTMl document
    server deactivate

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server activate
    server->>browser: CSS document
    server deactivate

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server activate
    server->>browser: JS document
    server deactivate

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server, rendering notes on the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server activate
    server->>browser: Data (JSON)
    server deactivate


