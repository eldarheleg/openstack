sequenceDiagram
    participiant browser 
    participiant server

    //fetching Notes page
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server activate
    server->>browser: HTMl document
    server deactivate

    //fetching styles
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server activate
    server->>browser: CSS document
    server deactivate

    //fetching JS script, fetching JSON format data
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server activate
    server->>browser: JS document
    server deactivate

    //getting data
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server activate
    server->>browser: Data (JSON)
    server deactivate

    Note right of browser: The browser executes the callback function that renders the notes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server activate
    server->>browser: Redirected to HTML page again
    server deactivate

    //REDIRECTING CAUSED 3 MORE GET REQUESTS
    browser->>server: GET main.css, main.js, data.json
    server activate
    server->>browser: Redirected to HTML page again
    server deactivate

     Note right of browser: The browser executes the callback function that renders the notes


