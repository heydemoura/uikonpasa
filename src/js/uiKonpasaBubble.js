angular.module('uiKonpasa')
.directive('uiKonpasaBubbleArea', function() 
{
	return {
		scope: {
			bubbles : '=',
			max : '='
		},
		controller : function($scope, $element, $attrs) {
			
			this.pushBubble = function(bubble)
			{
				$scope.bubbles.push(bubble);
				delete $scope.bubble;
			}

			this.bubblePop = function(index) {
				if (!index) {
					$scope.bubbles.shift();
					return;
				}

				$scope.bubbles.splice(index, 1);
			}

			$element.addClass('bubbleArea');

			$scope.$watch('bubbles', function(newVal, oldVal){
				if (newVal.length > oldVal.length) {
				    if (newVal.length -1 >= $scope.max) {
				    	$scope.bubbles.shift();
				    	console.log($scope.bubbles);
				    }

			    	setTimeout(function() {
						$scope.bubbles.shift();
					}, 3000);
				}
			}, true);
		}
	}
})

.directive('uiKonpasaBubble', function() {
	return {
		templateUrl: 'templates/bubble.tpl.html',
		replace: true,
		require: "^uiKonpasaBubbleArea",
		scope: true,
		link: function($scope, $element, $attrs, $ctrl)
		{
			$scope.close = $ctrl.bubblePop;

			$scope.body = $attrs.body;
			$scope.type = $attrs.type;

			$element.modal('show');
		}
	}
});