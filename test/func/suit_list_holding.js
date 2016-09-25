

var thing = {
    suites: {
        //suites for checking functionality of webdriverIO
        sanity: [
            './test/func/sanity/**'
        ],
        //Due to it giving me a problem running tests by suite
        MainPage: [
            './test/func/mainPage/**'
        ],
        navMenu: [
            './test/func/menu/**'
        ],
        pages: [
            './test/func/pages/**',
            './test/func/pages/background.spec.js'
        ]
    },


    thing: {}
}

/**
 * Complete passing Integration Test Files:
 *  panelElements.spec.js
 *  attachmentPoints.spec.js
 *  IconDisplayAnimations.spec.js
 *
 *
 *
 * */