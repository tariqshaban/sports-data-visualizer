Data Visualization on Scraped Sports Website
==============================
This is a submission of **assignment 1** for the **CIS726** course.

It contains the code necessary to view plots from a Tableau public server.

This projects merely provide a preview of the saved plots on the Tableau server.

Getting Started
------------
Clone the project from GitHub

`$ git clone https://github.com/tariqshaban/sports-data-visualizer.git`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

API setup
------------
The machine learning section mandates a working API to retrieve the results, clone the following project from GitHub and setup a local server, Python must be installed since it operates on FastAPI.
`$ git clone https://github.com/tariqshaban/machine-learning-model-server.git`


Configure `api-endpoint.service.ts` properties as necessary to identify the API endpoints.

Make sure to handle the CORS policy if the server is running locally.

Development server
------------
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Due to the nature of Angular's pyplot.js packaging, when building a release, the --optimization flag must be set to false, otherwise, the library will falsely indicate that OpenGL is not installed and the plot will not show.

--------