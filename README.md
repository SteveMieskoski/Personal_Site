**Note: I registered the key I use previously on another github account prior to creating this account, and have not yet spent the time to correct, but I am behind both accounts**

# Introduction
Here is a breakdown of my personal site. (This README is still a work in progress, so pardon the scattered presentation at the moment)

# Table of Contents

- [Introduction](#introduction)
- [Highlighted Strategies or Patterns used](#highlighted-strategies-or-patterns-used)
- [Packages and Libraries](#packages-and-libraries)
- [Testing](#testing)
- [Structure](#structure)



## Highlighted Strategies or Patterns used


# Packages and Libraries


# Testing
**Unit tests run in browser**

Libraries: SinonJS, SquireJS, RequireJS, jQuery, Mocha, Chai, WebDriverIO

As an example in test/unit/createPageContent.spec.js I used:

-SinonJs: mockServer, spy, stub
-SquireJS: Dependency injection

And implemented:
-SinonJS's fake server to control the response of the xmlHttpRequest implemented in the method to return a prepared html file.
-SinonJs's spy method on CSS3DRenderer (globally loaded in the test setup (i.e. the html file used)). Using this setup I attached a sinon spy to CSS3DRenderer to spy on the values passed to it and used these for some of my assertions. 
-SinonJs's stub method was used to pass faked functions defined in an overall beforeEach block.


- I am aware of the browser errors indicating:
 -      describe is not defined(anonymous function)
 -    define is not defined(anonymous function)
 -    require is not defined
-however, the tests 'appeared' to operate correctly and I did not further investigate these errors.  I have some thoughts as to the reason these errors occur, but I did not create an environment to provide concrete confirmation.


# Structure
```
   ├──index.html
   ├──src                                 <- source code of the application
   │   ├── config.js                      <- requireJS configuration
   │   ├── main.js                        <- initial entry point (simply passes off to setup.js)
   │   ├── store.js                       <- handler for many of the variables and functions used throughout the site (psudo reactive structure)
   │   ├── urlHandler.js                  <- handler for interpreting the initial content to display, browser history, and use of the back button
   │   ├── app
   │   │    └── setup.js                  <- Initial setup for the site (also handles via callback the back button)
   │   ├── scripts
   │   │    ├── 
   │   │    ├── background_placer.js
   │   │    ├── buttonControl.js          <- handler for explicit buttons (most event triggers are handled by jquerytop)
   │   │    ├── cameras.js                <- set up ThreeJS cameras
   │   │    ├── lights.js                 <- set up ThreeJS scene lighting
   │   │    ├── renderers.js              <- set up ThreeJS renderers 
   │   │    ├── print.js                  <- set
   │   │    ├── download.js               <- set
   │   │    ├── removePage.js             <- set
   │   │    ├── createNewPage.js          <- set
   │   │    ├── createPageContent.js      <- set
   │   │    ├── runCreateOrDestroy.js     <- method container for calling various methods to create or destroy the page/item content centrally displayed
   │   │    └── tweenAnimate.js
   │   ├── top
   │   │    ├── createPanel.js            <- set
   │   │    ├── data.js                   <- set
   │   │    ├── displayFrame.js           <- set
   │   │    ├── jqueryTop.js              <- set
   │   │    ├── setupTop.js               <- set
   │   │    ├── topControls.js            <- set
   │   │    ├── tweenObjects.js           <- set
   │   │    └──windowResize.js
   │   ├── page
   │   │    ├── templates
   │   │    │    ├── lib
   │   │    │    ├── aboutMe.html
   │   │    │    ├── background.html
   │   │    │    ├── dataInput.html
   │   │    │    ├── education.html
   │   │    │    ├── experience.html
   │   │    │    ├── introduction.html
   │   │    │    ├── main.pdf
   │   │    │    ├── preparation.html
   │   │    │    ├── print.html
   │   │    │    ├── priorCareer.html
   │   │    │    ├── programming.html
   │   │    │    └── whyProgramming.html
   │   │    └──createPageObjects.js
   │   ├── css
   │   │    └── main.css
   │   └── lib
   ├──test
   ├──CNAME
   ├──index.html
   ├──bash_scripts
   ├──img
   ├──node_modules
   ├──package.json
   ├──readme
   ├──server.js
   ├──wdio.conf.js
   ├──.gitignore
```   



