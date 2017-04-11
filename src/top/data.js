

    var dataArray = [
        {
            title: "About Me", // keep color
            loc: 'aboutMe',
            name: 'aboutMe',
            icon: 'perm_identity',
            id: 0,
            color: 0xfffa8a,
            caption: 'A little bit about me and my drives.',
            template: './src/page/templates/aboutMe.html',
            col: 2,
            row: 1
        },
        {
            title: "Programming Experience",
            loc: 'programming',
            name: 'programming',
            icon: 'code',
            id: 1,
            color: 0xb1ffde,
            caption: 'What I have built and know.',
            template: './src/page/templates/programming.html ',
            col: 1,
            row: 2
        },
        {
            title: "Education", // keep color
            loc: 'education',
            name: 'education',
            icon: 'school',
            id: 2,
            color: 0xd6c6b9,
            caption: 'My Education.',
            template: './src/page/templates/education.html',
            col: 1,
            row: 1
        },
        {
            title: "Past Career", // keep color
            loc: 'pastCareer',
            name: 'priorCareer',
            icon: 'reply',
            id: 3,
            color: 0xC5CCD8,
            caption: 'The legal world from which I came.',
            template: './src/page/templates/priorCareer.html',
            col: 2,
            row: 3
        },
        {
            title: "Languages", // keep color
            loc: 'languages',
            name: 'languages',
            icon: 'help_outline',
            id: 4,
            color: 0xb2e1ff,
            caption: 'Content is Under Construction.',
            template: './src/page/templates/languages.html',
            col: 2,
            row: 2
        },
        {
            title: "Preparation",
            loc: 'preparation',
            name: 'preparation',
            icon: 'build',
            id: 5,
            color: 0x34c497,
            caption: 'A showcase of a sort.',
            template: './src/page/templates/preparation.html',
            col: 1,
            row: 3
        }
    ];

    var reverseId = {
        MainPage: 9999,
        aboutMe: 0,
        programming: 1,
        education: 2,
        pastCareer: 3,
        languages: 4,
        preparation: 5
    };

    function createDataObject(arrayData) {
        var holdingVariable = {};
        for (var i = 0; i < arrayData.length; i++) {
            var j = arrayData[i].id;
            holdingVariable[j] = arrayData[i];
        }
        return holdingVariable;
    }

    var dataObject = createDataObject(dataArray);

    module.exports = {dataArray: dataArray, dataObject: dataObject, reverseId: reverseId};
