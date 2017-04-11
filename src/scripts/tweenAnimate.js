'use strict';

var $ = require("../lib/jquery.min.js");

var store = require("../store");
//var TWEEN = require("../lib/Tween");




function tweenAnimate() {
}

tweenAnimate.prototype = {
    constructor: tweenAnimate,

    Run: function (objects, targets, scene, camera, renderer, duration, tweenRate, keepId, incrementStop, cb) {
        var i, counter, tweening, Render, object, target;
        var runCreateOrDestroy = require("./runCreateOrDestroy");  // remove if bug is no longer present

        counter = 0;
        TWEEN.removeAll();
        if (incrementStop) {
            //console.log(runCreateOrDestroy.RemoveBackground);
            runCreateOrDestroy.RemoveBackground();
        }
        for (i = 0; i < objects.length; i++) {

            object = objects[i];
            target = targets[i];

            new TWEEN.Tween(object.position)
                .to({
                    x: target.position.x,
                    y: target.position.y,
                    z: target.position.z
                }, duration)
                .easing(this.tweenEasing[tweenRate[0]])
                .start();

            new TWEEN.Tween(object.rotation)
                .to({
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z
                }, duration)
                .easing(this.tweenEasing[tweenRate[1]])
                .start();

        }

        // impelment method to remove page only.

        // 500 ms ~ 59 renders
        // 2000 ms ~ 235 renders
        Render = function () {
            counter++;
            if (counter > 90 && incrementStop) {
                tweening.stop();
                runCreateOrDestroy.AddPageObjects(keepId);
            }
            renderer.render(scene, camera);
        };

        tweening = new TWEEN.Tween(this)

            .to({}, duration * 2)
            .onUpdate(Render)
            .onComplete(function () {
                console.log('Tween Complete');
                if (cb !== undefined) {
                    cb(keepId);
                }
            })
            .start();

    },

    tweenEasing: [
        TWEEN.Easing.Quadratic.Out,
        TWEEN.Easing.Quadratic.InOut,
        TWEEN.Easing.Cubic.In,
        TWEEN.Easing.Cubic.Out,
        TWEEN.Easing.Cubic.InOut,
        TWEEN.Easing.Quartic.In,
        TWEEN.Easing.Quartic.Out,
        TWEEN.Easing.Quartic.InOut,
        TWEEN.Easing.Quintic.In,
        TWEEN.Easing.Quintic.Out,
        TWEEN.Easing.Quintic.InOut,
        TWEEN.Easing.Sinusoidal.In,
        TWEEN.Easing.Sinusoidal.Out,
        TWEEN.Easing.Sinusoidal.InOut,
        TWEEN.Easing.Exponential.In,
        TWEEN.Easing.Exponential.Out,
        TWEEN.Easing.Exponential.InOut,
        TWEEN.Easing.Circular.In,
        TWEEN.Easing.Circular.Out,
        TWEEN.Easing.Circular.InOut,
        TWEEN.Easing.Elastic.In,
        TWEEN.Easing.Elastic.Out,
        TWEEN.Easing.Elastic.InOut,
        TWEEN.Easing.Back.In,
        TWEEN.Easing.Back.Out,
        TWEEN.Easing.Back.InOut,
        TWEEN.Easing.Bounce.In,
        TWEEN.Easing.Bounce.Out,
        TWEEN.Easing.Bounce.InOut,
        TWEEN.Easing.Quadratic.In]
};


module.exports = new tweenAnimate;