var TonalApp = angular.module('Tonal', []);

class Toner {
    public static $inject = ['$scope'];
    
    constructor($scope: any) {
        var audioCtx = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
        var noteLength = 100;


        console.log("hey");
        // Default scale
        $scope.baseFrequency = 440;
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

        document.onkeypress = (e: KeyboardEvent) => {
            var k = String.fromCharCode(e.keyCode);
            var num = -1;
            switch (k) {
                case 'a':
                    num = 0;
                    break;
                case 's':
                    num = 1;
                    break;
                case 'd':
                    num = 2;
                    break;
                case 'f':
                    num = 3;
                    break;
                case 'g':
                    num = 4;
                    break;
                case 'h':
                    num = 5;
                    break;
            }

            if (num < 0) {
                // this is alphabetical
                num = e.keyCode - 97;
            }

            $scope.playNote(num);
        };

        $scope.updateKeys = () => {
            $scope.keys.length = $scope.steps + 1;
            console.log($scope.steps);
            console.log($scope.keys);
            console.log(new Array($scope.steps + 1));
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