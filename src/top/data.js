define([], function () {

    var dataArray = [
        {
            title: "About Me",
            loc: 'aboutMe',
            name: 'aboutMe',
            icon: 'perm_identity',
            id: 0,
            color: 0x6497FF,
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
            color: 0x7EA9FF,
            caption: 'What I have built and know.',
            template: './src/page/templates/programming.html ',
            col: 1,
            row: 2
        },
        {
            title: "Education",
            loc: 'education',
            name: 'education',
            icon: 'school',
            id: 2,
            color: 0x8A8077,
            caption: 'My formal education.',
            template: './src/page/templates/education.html',
            col: 1,
            row: 1
        },
        {
            title: "Past Career",
            loc: 'pastCareer',
            name: 'priorCareer',
            icon: 'reply',
            id: 3,
            color: 0x7EB2C0,
            caption: 'The legal world from which I came.',
            template: './src/page/templates/priorCareer.html',
            col: 2,
            row: 3
        },
        {
            title: "Languages",
            loc: 'languages',
            name: 'languages',
            icon: 'help_outline',
            id: 4,
            color: 0x55D1FF,
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
        console.log('holding variable to create dataObject', holdingVariable); // todo remove debug item
        return holdingVariable;
    }

    var dataObject = createDataObject(dataArray);

    var data = {dataArray: dataArray, dataObject: dataObject, reverseId: reverseId};
    return data;
})

/*
 NEAT QUOTE:
 "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
 "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
 */

//===================SCAPS & BKUPS ====================================
/*

 // =================================== MEGA PLACEHOLDING DATA LIST ===============================================
 {title: "Background", id: 0, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 1,row: 1},
 {title: "Experiance", id: 1, caption: 'Integer a ante et justo varius lacinia.', col: 2,row: 3},
 {title: "About Me", id: 2, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', col: 3,row: 1},
 {title: "Programming", id: 3, caption: 'Duis commodo tortor et quam malesuada, non congue nibh consequat.', col: 1,row: 2},
 {title: "Introduction", id: 4, caption: 'Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.', col: 2,row: 2},
 {title: "Education", id: 5, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 2,row: 1},
 {title: "Prior Career", id: 6, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 3},
 {title: "Why Programming", id: 7, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 2},
 {title: "Preparation", id: 8, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 1,row: 3},
 {title: "Background", id: 0, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 1,row: 1},
 {title: "Experiance", id: 1, caption: 'Integer a ante et justo varius lacinia.', col: 2,row: 3},
 {title: "About Me", id: 2, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', col: 3,row: 1},
 {title: "Programming", id: 3, caption: 'Duis commodo tortor et quam malesuada, non congue nibh consequat.', col: 1,row: 2},
 {title: "Introduction", id: 4, caption: 'Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.', col: 2,row: 2},
 {title: "Education", id: 5, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 2,row: 1},
 {title: "Prior Career", id: 6, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 3},
 {title: "Why Programming", id: 7, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 2},
 {title: "Preparation", id: 8, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 1,row: 3},
 {title: "Background", id: 0, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 1,row: 1},
 {title: "Experiance", id: 1, caption: 'Integer a ante et justo varius lacinia.', col: 2,row: 3},
 {title: "About Me", id: 2, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', col: 3,row: 1},
 {title: "Programming", id: 3, caption: 'Duis commodo tortor et quam malesuada, non congue nibh consequat.', col: 1,row: 2},
 {title: "Introduction", id: 4, caption: 'Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.', col: 2,row: 2},
 {title: "Education", id: 5, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 2,row: 1},
 {title: "Prior Career", id: 6, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 3},
 {title: "Why Programming", id: 7, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 3,row: 2},
 {title: "Preparation", id: 8, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 1,row: 3}


 // ======================== OLDER (FIRST GO) DATA LIST =============================================
 {title: "Background", id: 0, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 6,row: 3},
 {title: "Experiance", id: 1, caption: 'Integer a ante et justo varius lacinia.', col: 10,row: 4},
 {title: "About Me", id: 2, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', col: 14,row: 5},
 {title: "Programming", id: 3, caption: 'Duis commodo tortor et quam malesuada, non congue nibh consequat.', col: 10,row: 6},
 {title: "Introduction", id: 4, caption: 'Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.', col: 6,row: 7},
 {title: "Education", id: 5, caption: 'Suspendisse commodo sem eget fermentum interdum.', col: 10,row: 8},
 {title: "Prior Career", id: 6, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 14,row: 9},
 {title: "Why Programming", id: 7, caption: 'Nulla cursus massa eu nisi aliquam finibus.', col: 6,row: 9}


 // original hardcoded dataObject
 var dataObject = {
 0: {title: "Background", id: 0, caption: 'Suspendisse commodo sem eget fermentum interdum.', template:'./src/page/templates/background.html', col: 1,row: 1},
 1: {title: "Experiance", id: 1, caption: 'Integer a ante et justo varius lacinia.', template:'./src/page/templates/experience.html',  col: 2,row: 3},
 2: {title: "About Me", id: 2, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', template:'./src/page/templates/aboutMe.html',  col: 3,row: 1},
 3: {title: "Programming", id: 3, caption: 'Duis commodo tortor et quam malesuada, non congue nibh consequat.', template:'./src/page/templates/programming.html ',  col: 1,row: 2},
 4: {title: "Introduction", id: 4, caption: 'Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.', template:'./src/page/templates/introduction.html',  col: 2,row: 2},
 5: {title: "Education", id: 5, caption: 'Suspendisse commodo sem eget fermentum interdum.', template:'./src/page/templates/education.html',  col: 2,row: 1},
 6: {title: "Prior Career", id: 6, caption: 'Nulla cursus massa eu nisi aliquam finibus.', template:'./src/page/templates/priorCareer.html',  col: 3,row: 3},
 7: {title: "Why Programming", id: 7, caption: 'Nulla cursus massa eu nisi aliquam finibus.', template:'./src/page/templates/whyProgramming.html',  col: 3,row: 2},
 8: {title: "Preparation", id: 8, caption: 'Nulla cursus massa eu nisi aliquam finibus.', template:'./src/page/templates/preperation.html',  col: 1,row: 3}
 };



 var Data = [

 'Background',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor nec enim vitae ornare. Pellentesque scelerisque velit odio, quis facilisis turpis maximus sit amet. Nullam sed nisl pretium, laoreet sapien id, bibendum magna. Praesent malesuada gravida erat at pulvinar. Nunc orci lorem, tincidunt in metus eget, bibendum lacinia arcu. Donec ac sagittis velit. Sed leo metus, dapibus id dui a, ullamcorper bibendum risus. Suspendisse volutpat finibus augue vitae rhoncus. Cras turpis diam, vestibulum et sagittis et, faucibus non diam. Mauris interdum ipsum sit amet aliquet congue. Suspendisse mattis at orci eu hendrerit. Ut pellentesque mattis leo et pretium. Donec diam neque, molestie at finibus vitae, venenatis id justo. Nulla nec nulla cursus, mollis lacus nec, sodales ante. Suspendisse potenti.',  ['Suspendisse commodo sem eget fermentum interdum.', 'Integer a ante et justo varius lacinia.', 'Nulla cursus massa eu nisi aliquam finibus.'],

 'Experiance',
 'Morbi ac condimentum est. Proin vulputate tempus commodo. Aenean ut porttitor metus, sit amet finibus nunc. Suspendisse pretium efficitur dui sit amet auctor. Morbi pulvinar semper mi, eget semper purus fermentum sit amet. Proin luctus est purus, id mollis turpis cursus vitae. Ut finibus est vitae nisi ultrices, id scelerisque justo pellentesque. Quisque laoreet ultrices magna vitae maximus. Duis eleifend vestibulum pharetra. Duis vulputate fermentum orci, eget consequat magna malesuada eget. Suspendisse scelerisque nec nunc quis ultrices. Morbi tincidunt tincidunt tristique.', ['Cras maximus justo vel urna pellentesque fermentum.','Fusce sed neque sollicitudin, consequat eros nec, dignissim mauris.','Vivamus pellentesque elit sed ante feugiat, ac sollicitudin neque varius.','Vestibulum ut velit sit amet ante feugiat finibus pellentesque in lectus.','Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.'],

 'About Me',
 'Nulla sed lectus placerat, sagittis massa viverra, bibendum velit. Ut consectetur nibh ac nunc condimentum egestas. Cras lectus orci, auctor laoreet accumsan a, venenatis tempor neque. Sed feugiat lectus eget sem hendrerit, nec efficitur mi tincidunt. Nam quis ex in metus pulvinar luctus. Aliquam tempor nisi vitae vestibulum interdum. Quisque eu est sed lorem vulputate ullamcorper. Proin volutpat lorem at purus blandit mollis. Vivamus non dui in purus maximus tempor ac a justo. Sed imperdiet, lorem id placerat iaculis, nisi quam sagittis arcu, in efficitur ex sem et est. Phasellus at augue a quam semper tincidunt. Nunc ipsum nunc, tempus non enim in, faucibus egestas est. Aenean at rhoncus quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec mattis suscipit nunc, id pellentesque massa lacinia ac. Quisque quis viverra sem, vitae venenatis massa.',  ['Suspendisse commodo sem eget fermentum interdum.', 'Integer a ante et justo varius lacinia.', 'Nulla cursus massa eu nisi aliquam finibus.'],

 'Programming',
 'Suspendisse velit lorem, malesuada ac libero et, bibendum sodales turpis. Integer pulvinar pulvinar orci, eu luctus ipsum molestie ac. Suspendisse potenti. Duis eget diam felis. Nulla leo est, interdum eu vulputate quis, vehicula sit amet mi. Aliquam at massa elementum, ornare libero id, porta nisl. Duis ut erat vitae tortor viverra convallis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam lobortis placerat porttitor. Donec laoreet magna arcu. Cras ut ipsum eget mi elementum malesuada id ut lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam facilisis imperdiet mauris fermentum consequat. Etiam ullamcorper leo non tortor ullamcorper, tincidunt efficitur est lacinia. Sed efficitur ante at pellentesque finibus.',  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Duis commodo tortor et quam malesuada, non congue nibh consequat.'],

 'Introduction' , 'Nam euismod ex at mauris euismod consectetur. Duis dictum purus in turpis porta lacinia. Aliquam sit amet tincidunt massa. Aliquam a consequat massa. Mauris sit amet condimentum ex. Nunc interdum pretium nunc in pulvinar. Ut convallis, augue quis placerat pulvinar, ligula quam tincidunt nunc, sit amet sollicitudin neque nibh eu justo. Maecenas vestibulum odio et nunc dignissim finibus. Donec finibus ex neque, nec vulputate nulla lobortis ac.'



 ]


 {title: 'Background', text:
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor nec enim vitae ornare. Pellentesque scelerisque velit odio, quis facilisis turpis maximus sit amet. Nullam sed nisl pretium, laoreet sapien id, bibendum magna. Praesent malesuada gravida erat at pulvinar. Nunc orci lorem, tincidunt in metus eget, bibendum lacinia arcu. Donec ac sagittis velit. Sed leo metus, dapibus id dui a, ullamcorper bibendum risus. Suspendisse volutpat finibus augue vitae rhoncus. Cras turpis diam, vestibulum et sagittis et, faucibus non diam. Mauris interdum ipsum sit amet aliquet congue. Suspendisse mattis at orci eu hendrerit. Ut pellentesque mattis leo et pretium. Donec diam neque, molestie at finibus vitae, venenatis id justo. Nulla nec nulla cursus, mollis lacus nec, sodales ante. Suspendisse potenti.', outline: ['Suspendisse commodo sem eget fermentum interdum.', 'Integer a ante et justo varius lacinia.', 'Nulla cursus massa eu nisi aliquam finibus.']},

 {title:'Experiance', text:
 'Morbi ac condimentum est. Proin vulputate tempus commodo. Aenean ut porttitor metus, sit amet finibus nunc. Suspendisse pretium efficitur dui sit amet auctor. Morbi pulvinar semper mi, eget semper purus fermentum sit amet. Proin luctus est purus, id mollis turpis cursus vitae. Ut finibus est vitae nisi ultrices, id scelerisque justo pellentesque. Quisque laoreet ultrices magna vitae maximus. Duis eleifend vestibulum pharetra. Duis vulputate fermentum orci, eget consequat magna malesuada eget. Suspendisse scelerisque nec nunc quis ultrices. Morbi tincidunt tincidunt tristique.', outline: ['Cras maximus justo vel urna pellentesque fermentum.','Fusce sed neque sollicitudin, consequat eros nec, dignissim mauris.','Vivamus pellentesque elit sed ante feugiat, ac sollicitudin neque varius.','Vestibulum ut velit sit amet ante feugiat finibus pellentesque in lectus.','Vestibulum scelerisque sem sit amet enim aliquet, eu ullamcorper turpis porta.']},

 {title:'About Me',text:
 'Nulla sed lectus placerat, sagittis massa viverra, bibendum velit. Ut consectetur nibh ac nunc condimentum egestas. Cras lectus orci, auctor laoreet accumsan a, venenatis tempor neque. Sed feugiat lectus eget sem hendrerit, nec efficitur mi tincidunt. Nam quis ex in metus pulvinar luctus. Aliquam tempor nisi vitae vestibulum interdum. Quisque eu est sed lorem vulputate ullamcorper. Proin volutpat lorem at purus blandit mollis. Vivamus non dui in purus maximus tempor ac a justo. Sed imperdiet, lorem id placerat iaculis, nisi quam sagittis arcu, in efficitur ex sem et est. Phasellus at augue a quam semper tincidunt. Nunc ipsum nunc, tempus non enim in, faucibus egestas est. Aenean at rhoncus quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec mattis suscipit nunc, id pellentesque massa lacinia ac. Quisque quis viverra sem, vitae venenatis massa.', outline: ['Suspendisse commodo sem eget fermentum interdum.', 'Integer a ante et justo varius lacinia.', 'Nulla cursus massa eu nisi aliquam finibus.']},

 {title:'Programming', text:
 'Suspendisse velit lorem, malesuada ac libero et, bibendum sodales turpis. Integer pulvinar pulvinar orci, eu luctus ipsum molestie ac. Suspendisse potenti. Duis eget diam felis. Nulla leo est, interdum eu vulputate quis, vehicula sit amet mi. Aliquam at massa elementum, ornare libero id, porta nisl. Duis ut erat vitae tortor viverra convallis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam lobortis placerat porttitor. Donec laoreet magna arcu. Cras ut ipsum eget mi elementum malesuada id ut lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam facilisis imperdiet mauris fermentum consequat. Etiam ullamcorper leo non tortor ullamcorper, tincidunt efficitur est lacinia. Sed efficitur ante at pellentesque finibus.', outline: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Duis commodo tortor et quam malesuada, non congue nibh consequat.']},

 {title: 'Introduction' , text:'Nam euismod ex at mauris euismod consectetur. Duis dictum purus in turpis porta lacinia. Aliquam sit amet tincidunt massa. Aliquam a consequat massa. Mauris sit amet condimentum ex. Nunc interdum pretium nunc in pulvinar. Ut convallis, augue quis placerat pulvinar, ligula quam tincidunt nunc, sit amet sollicitudin neque nibh eu justo. Maecenas vestibulum odio et nunc dignissim finibus. Donec finibus ex neque, nec vulputate nulla lobortis ac.'}


 Just a bunch of Lorem Ipsum Paragraphs.

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla magna metus, blandit eget nulla vitae, placerat dapibus leo. Pellentesque magna orci, aliquet at augue sed, fermentum tempor nisi. Donec ut leo congue, efficitur augue vitae, bibendum urna. Mauris magna lacus, bibendum sed lectus sit amet, pellentesque scelerisque leo. Aliquam erat volutpat. Ut scelerisque facilisis ornare. Curabitur a felis gravida, hendrerit odio sed, ornare quam. Aliquam pellentesque id nunc nec vehicula.

 Etiam elementum enim ut quam fringilla ornare. In auctor ex at ante dignissim, vitae luctus erat interdum. Maecenas nulla massa, efficitur quis est pellentesque, dictum sagittis risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus egestas luctus felis eget fringilla. Integer id odio accumsan tellus posuere vulputate. Nunc tortor ante, accumsan vel rhoncus ut, efficitur et metus. Suspendisse potenti. Quisque fringilla dui non dapibus lobortis. Ut eget neque posuere dolor egestas faucibus. In malesuada urna sit amet lorem bibendum rhoncus. Duis id sodales turpis. Curabitur pharetra purus nec nibh tincidunt, vitae vehicula erat sagittis. Cras nec tempus sapien, sit amet sagittis ipsum.

 Praesent a rhoncus sapien. Nullam a viverra massa, et luctus neque. Fusce interdum orci at enim finibus, eget fermentum risus tincidunt. In quis commodo neque. Praesent nec mauris fermentum, fermentum arcu ut, vulputate nisl. Sed commodo mauris sapien, eget tincidunt velit placerat vitae. Etiam vestibulum elit sed neque vestibulum cursus. Fusce nec pretium odio. Mauris tempor, lectus eget blandit rhoncus, tortor felis tristique nisi, sed dictum eros mauris nec dui.

 Proin sed sagittis felis, quis venenatis eros. Nullam dignissim quam quam. Donec id lobortis justo, a laoreet nisi. Nulla quam diam, consectetur eu pellentesque eget, varius at lorem. Fusce id enim iaculis, tristique lorem vitae, feugiat sapien. Suspendisse dictum, ligula eu consectetur gravida, libero tellus pellentesque lectus, id ultricies mi metus in enim. Aenean convallis urna ut massa posuere mollis. Donec eget felis nisl. Mauris at nisl elit. Sed varius tincidunt ultricies. In commodo ullamcorper lectus, ac iaculis ante euismod ut. Ut eu lorem ullamcorper elit aliquet faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

 Donec nec orci id mi rutrum tincidunt eu at odio. Nunc dignissim quis arcu quis placerat. Integer accumsan quis orci et blandit. Ut sit amet magna vulputate, consectetur mauris a, pretium velit. Integer feugiat neque fringilla auctor viverra. Integer lobortis, ligula et condimentum sollicitudin, velit elit eleifend justo, at faucibus eros odio suscipit augue. Sed at dapibus risus, nec vulputate est.

 Cras sodales tortor quis tellus convallis, eget pellentesque turpis euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam viverra ullamcorper velit, eget efficitur magna lobortis sed. Ut eros arcu, dictum et hendrerit a, ultrices sit amet sapien. Cras nec felis ac sapien pharetra facilisis. Fusce luctus iaculis viverra. Morbi accumsan varius malesuada. Duis facilisis ante a lacinia lacinia. Morbi imperdiet elit vitae dui volutpat vulputate. Suspendisse euismod eros vel est euismod tincidunt. Suspendisse iaculis faucibus ante porta dignissim.

 Curabitur ut arcu est. Sed a tristique magna, eu efficitur felis. Duis nec ex viverra, cursus dolor sed, fermentum urna. In posuere fermentum dolor vitae pretium. Nulla pellentesque nibh sed nisi mollis, in cursus erat venenatis. Donec congue erat quam, ultrices elementum turpis semper non. Nam congue lacus purus, eget condimentum diam congue sit amet. Praesent vel aliquet nisl. Praesent venenatis porttitor est sit amet aliquam. Quisque vitae risus at nisi pretium consectetur. Cras tortor lectus, sollicitudin vitae efficitur non, gravida eu felis. Quisque pretium lorem in tristique feugiat. Pellentesque tempus quam nunc, eget sagittis libero placerat sed. In hac habitasse platea dictumst.

 In convallis ex nibh, id fermentum erat elementum quis. Phasellus arcu sem, maximus sed consectetur ut, consectetur quis turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam mattis nibh est, non sagittis nunc iaculis at. Curabitur posuere enim quis lacus rutrum euismod. Sed quis nibh bibendum, scelerisque nulla a, imperdiet elit. Fusce imperdiet ex nisi, et ultrices tellus tempus sit amet. Etiam a dapibus nibh, faucibus blandit ligula. Etiam pretium nibh sem. Nullam egestas magna ac lacus pharetra volutpat. Suspendisse lorem lectus, mollis sit amet mi pulvinar, malesuada scelerisque ante. Nam vestibulum porta ipsum vel lobortis.

 Integer viverra mauris elit, quis pellentesque urna finibus a. Sed aliquam id diam sed placerat. Integer aliquam eget erat sed congue. Donec auctor odio in metus fermentum, ac gravida lectus commodo. Nullam semper placerat risus et hendrerit. Nam scelerisque magna ut magna dignissim viverra posuere sed libero. Donec dignissim, nisl at viverra vulputate, purus quam accumsan leo, nec facilisis tellus orci et urna. Sed scelerisque egestas leo non cursus. Mauris mattis pulvinar efficitur. Quisque aliquet, magna at elementum consectetur, magna tellus hendrerit urna, porta volutpat velit diam eget tellus. Quisque dapibus pellentesque neque iaculis dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras metus justo, malesuada vitae viverra sed, pretium in nibh.

 Vivamus in odio ut felis euismod porta ac sit amet augue. Aliquam nec elit neque. Nullam dignissim tortor dignissim augue sodales egestas. Nullam suscipit eu libero at tempor. Morbi elit est, volutpat quis orci nec, semper sodales velit. Suspendisse pretium libero euismod efficitur porttitor. Vestibulum sagittis ex in tellus commodo, gravida fringilla augue accumsan. Nulla non ante eu enim vestibulum pharetra vel ac orci. Nunc nec semper sem, a elementum ex. Mauris id ligula sit amet arcu hendrerit rutrum sit amet vitae sem. Pellentesque dapibus, mi et egestas laoreet, lacus erat gravida risus, sed dapibus neque nulla vitae enim. Nullam eget tincidunt purus, nec volutpat est.
 */