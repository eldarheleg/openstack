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

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server activate
    server->>browser: Data (JSON)
    server deactivate

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server activate
    server->>browser: 201 Note created
    server deactivate

    Note right of browser: When user submits form, note is created and sent to the server,notes list is reloaded, preventing full page reload as the main purpose of the SPA

    Note right of browser: The browser executes the callback function that renders the notes


