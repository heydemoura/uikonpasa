angular.module('uiKonpasa')

.directive('uiKonpasaBubbleArea', uiKonpasaBubbleArea)
.directive('uiKonpasaBubble', uiKonpasaBubble);

function uiKonpasaBubbleArea() {
	return {
		scope: {
			bubbles : '=',
			max : '='
		},
		controller : ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
			this.pushBubble = function(bubble)
			{
				$scope.bubbles.push(bubble);
				delete $scope.bubble;
			};

			this.bubblePop = function(index) {
				if (!index) {
					$scope.bubbles.shift();
					return;
				}

				$scope.bubbles.splice(index, 1);
			};

			$element.addClass('bubbleArea');

			$scope.$watch('bubbles', function(newVal, oldVal){
				if (newVal.length > oldVal.length) {
				    if (newVal.length -1 >= $scope.max) {
				    	$scope.bubbles.shift();
				    };

			    	setTimeout(function() {
			    		$scope.bubbles.shift();
			    	}, 2000)
				}
			}, true);
		}]
	};
};

function uiKonpasaBubble() {
	return {
		templateUrl: 'templates/bubble.tpl.html',
		replace: true,
		require: "^uiKonpasaBubbleArea",
		scope: {
			body: '=',
			type: '='
		},
		link: ['$scope', '$element', '$attrs', '$ctrl' ,function($scope, $element, $attrs, $ctrl) {
			$scope.close = $ctrl.bubblePop;

			$element.show();

			$scope.close = $element.remove;
		}]
	}
}