# Olist Challanger [LINK](https://work-at-olist-jeff-test.netlify.com/)


Today, security is everything, but users still have the bad habit of creating accounts with weak passwords, and it is essential that we can offer the user ways to keep them safe. So, we must do our best to ensure the safety of our users.

For this, you should implement a new account page, composed of Name, Email and Password with a strength measure indicator and Password confirmation. All these fields are required.

### Built With
 - Web Components
 - Webpack
 - Jest

### Prerequisites
Make sure you have Node installed on you machine. Open the application folder on the terminal and run:


### Setting up Dev

Before run the application, make sure to install the project dependencies runnnig:

```shell
npm install
```

### Run
This command will run  the applicaton locally:
```shell
npm start
```

### Build
The build command creates the ```dist``` folder creating the application bundle making some Javascript an CSS optimizations: 

```shell
npm run build
```

## Tests
The application had use an BDD approach, so run the unit and integration test with thwe command:

```shell
npm run test:u
```

Ypu also can check the tests coverage running:

```shell
npm run test:co
```

### Continuous Integration
The project is configured with a CI workflow connecting the repositorie to [CircleCI](https://circleci.com) to run the tests and builds, and [Netlify](https://netlify.com) to automatic build the application.
