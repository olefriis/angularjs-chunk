'use strict';

angular.module('chunk-example', []).
filter('chunk', function() {
	function chunkArray(array, chunkSize) {
		var result = [];
		var currentChunk = [];
		for (var i=0; i<array.length; i++) {
			currentChunk.push(array[i]);
			if (currentChunk.length == chunkSize) {
			  result.push(currentChunk);
			  currentChunk = [];
			}
		}
		if (currentChunk.length > 0) {
			result.push(currentChunk);
		}
		return result;
	}

	function defineTrackingKeys(array) {
		for (var i=0; i<array.length; i++) {
			array[i].trackingKey = i;
		}
	}

	return function(array, chunkSize) {
		if (!(array instanceof Array)) return array;
		if (!chunkSize) return array;
		
		var result = chunkArray(array, chunkSize);
		defineTrackingKeys(result);
		return result;
	}
});

function chunkCtrl($scope) {
	$scope.values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 10];
}