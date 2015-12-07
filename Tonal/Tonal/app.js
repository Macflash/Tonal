var TonalApp = angular.module('Tonal', []);
var Toner = (function () {
    function Toner($scope) {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var noteLength = 100;
        console.log("hey");
        // Default scale
        $scope.baseFrequency = 440;
        $scope.octave = 2;
        $scope.steps = 12;
        $scope.keys = new Array($scope.steps);
        $scope.volume = .2;
        $scope.getLength = function (x) {
            return new Array(x);
        };
        // returns a note that is x steps above the base frequency
        $scope.getNote = function (x) {
            console.log(x);
            console.log($scope.octave);
            console.log($scope.steps);
            console.log($scope.baseFrequency);
            return Math.pow($scope.octave, x / $scope.steps) * $scope.baseFrequency;
        };
        $scope.playNote = function (x) {
            console.log("playing note");
            var f = $scope.getNote(x);
            console.log(f);
            var g = audioCtx.createGain();
            g.gain.value = $scope.volume;
            var o = audioCtx.createOscillator();
            o.connect(g);
            g.connect(audioCtx.destination);
            o.type = "sine";
            o.frequency.value = f;
            o.start();
            o.stop(audioCtx.currentTime + 2);
        };
        $scope.updateKeys = function () {
            $scope.keys.length = $scope.steps;
            console.log($scope.steps);
            console.log($scope.keys);
        };
        $scope.updateKeys();
    }
    Toner.$inject = ['$scope'];
    return Toner;
})();
TonalApp.controller('Toner', Toner);
var Keyboard = (function () {
    function Keyboard($scope) {
        $scope.y = "hey";
        $scope.playNote = function (x) {
            console.log("trying to play...");
            $scope.$parent.playNote(x);
        };
    }
    Keyboard.$inject = ['$scope'];
    return Keyboard;
})();
TonalApp.controller('Keyboard', Keyboard);
//# sourceMappingURL=app.js.map