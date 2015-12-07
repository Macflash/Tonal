var TonalApp = angular.module('Tonal', []);

class Toner {
    public static $inject = ['$scope'];
    
    constructor($scope: any) {
        var audioCtx = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
        var noteLength = 100;


        console.log("hey");
        // Default scale
        $scope.baseFrequency = 100;
        $scope.octave = 2;
        $scope.steps = 12;
        $scope.keys = new Array($scope.steps);
        $scope.volume = .2;

        $scope.getLength = (x: number) => {
            return new Array(x);
        }

        // returns a note that is x steps above the base frequency
        $scope.getNote = (x: number) => {
            console.log(x);
            console.log($scope.octave);
            console.log($scope.steps);
            console.log($scope.baseFrequency);
            return Math.pow($scope.octave, x / $scope.steps) * $scope.baseFrequency; 
        }
        
        $scope.playNote = (x: number) => {
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
        }

        $scope.updateKeys = () => {
            $scope.keys.length = $scope.steps;
            console.log($scope.steps);
            console.log($scope.keys);
        }

        $scope.updateKeys();
    }
}

TonalApp.controller('Toner', Toner);

class Keyboard {
    public static $inject = ['$scope'];
    constructor($scope: any) {
        $scope.y = "hey";
        $scope.playNote = (x) => {
            console.log("trying to play...");
            $scope.$parent.playNote(x);
        }
    }
}

TonalApp.controller('Keyboard', Keyboard);