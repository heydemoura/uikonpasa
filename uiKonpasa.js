angular.module('uiKonpasa', []);
angular.module('uiKonpasa')

.directive('uiKonpasaBubbleArea', function() 
{
	return {
		restrict: 'E',
		scope: {
			bubbles : '='
		},
		controller : function($scope, $element, $attrs) {

			this.pushBubble = function(bubble)
			{
				$scope.bubbles.push(bubble);
				delete $scope.bubble;
			}

			this.bubblesPop = function() {
				$scope.bubbles.pop();
			}

			$element.addClass('bubbleArea');
		}
	}
})

.directive('uiKonpasaBubble', function() {
	return {
		templateUrl: './templates/bubble.html',
		replace: true,
		require: "^uiKonpasaBubbleArea",
		scope: {
			body : "@",
			type : "@"
		},
		link: function(scope, element, attrs, ctrl)
		{
			element.modal('show');		
		}
	}
});