

define(['require','top/data'], function (require, data) {
    "use strict";

    var createObjects = {
        defaultPageBackground: {
            width: 3480,
            height: 2160,
            texture: 'img/background_with_transparent.png',
            //transparentColor: 0x00B894,
            transparentColor: 0x00B895,
            position: {x: 0, y: 0, z: 0},
            names: ['mainPageBackground', 'mainPageBackground2'],
            receiveShadow: true
        },
        pageImages: ['img/mountain_sinrise_blue-gray_scale.png', 'img/mountain_sinrise_aqua_scale.png', 'img/mountain_sinrise_green_scale.png', 'img/mountain_sunrise_sand_scale.png', 'img/mountain_sunrise_two_color_purple.png', 'img/mountain_sunrise_blueForeground_scale.png', 'img/mountain_sunrise_higher_contrast.png', 'img/mountain_sunrise_normal_scale.png'],


        //todo IMPORTANT! get colors to correlate with only one panel

        createBackgroundPlane: function () {
            var pageDesign = data.dataObject,
                PlaneObjects = [];

            for (var j = 0; j < data.dataArray.length; j++) {
                this.mesh2 = new THREE.Object3D();
                for (var i = 0; i < 2; i++) {
                    var geom = new THREE.PlaneGeometry(820, 650, 1, 1);
                    var material = new THREE.MeshPhongMaterial({  //using phong material worked only for first selection.  some setting either was duplicated (i.e. 2 instances of webgl) or another setting changed and darkened the plane.
                        color: pageDesign[j].color,
                        specular: pageDesign[j].color,
                        reflectivity: 30,
                        transparent: true,
                        opacity: 0.3
                    });
                    var bkgndItem = new THREE.Mesh(geom, material);
                    bkgndItem.position.set(0, 0, 0);
                    bkgndItem.rotation.set(0, -0.2, 0);
                    bkgndItem.name = pageDesign[j].name;
                    this.mesh2.name = pageDesign[j].name;
                    this.mesh2.add(bkgndItem);
                }
                PlaneObjects.push(this.mesh2);
            }
            return PlaneObjects;
        },
        createBackgroundSphere: function () {
            var pageDesign = {
                    '0': {color: 0x3371FF, name: 'background', image: 'img/mountain_sinrise_blue-gray_scale.png'},
                    '1': {color: 0x2f576d, name: 'experience', image: 'img/mountain_sinrise_aqua_scale.png'},
                    '2': {color: 0x8A8077, name: 'aboutMe', image: 'img/mountain_sinrise_green_scale.png'},
                    '3': {color: 0x7EB2C0, name: 'programming', image: 'img/mountain_sunrise_sand_scale.png'},
                    '4': {color: 0x1b728a, name: 'introduction', image: 'img/mountain_sunrise_two_color_purple.png'},
                    '5': {color: 0x34c497, name: 'education', image: 'img/mountain_sunrise_higher_contrast.png'},
                    '6': {color: 0x3b59c4, name: 'priorCareer', image: 'img/mountain_sunrise_normal_scale.png'},
                    '7': {color: 0x95946F, name: 'whyProgramming', image: 'img/mountain_sunrise_two_color_purple.png'},
                    '8': {color: 0x5e699c, name: 'preparation', image: 'img/mountain_sinrise_blue-gray_scale.png'}
                },
                names = ['mainPageBackground', 'mainPageBackground2'],
                PlaneObjects = [];

            for (var j = 0; j < 9; j++) {
                this.mesh2 = new THREE.Object3D();
                for (var i = 0; i < 2; i++) {
                    //var geom = new THREE.SphereGeometry(410, 10, 10);
                    var geom = new THREE.TorusKnotGeometry(200, 70);
                    var material = new THREE.MeshBasicMaterial({  //using phong material worked only for first selection.  some setting either was duplicated (i.e. 2 instances of webgl) or another setting changed and darkened the plane.
                        color: pageDesign[j].color,
                        wireframe: true,
                        wireframeLinewidth: 2,
                        reflectivity: 0.1
                    });
                    var grnd = new THREE.Mesh(geom, material);
                    grnd.position.set(0, 0, -150);
                    grnd.name = pageDesign[j].name;
                    this.mesh2.name = pageDesign[j].name;
                    this.mesh2.add(grnd);
                }
                PlaneObjects.push(this.mesh2);
            }
            return PlaneObjects;
        }


    };

    return createObjects;
});
