angular.module('uiKonpasa')
.directive('uiKonpasaBubbleArea', function() 
{
	return {
		scope: {
			bubbles : '=',
			max : '='
		},
		controller : function($scope, $element, $attrs) {
			this.maxBubbles = $scope.max;
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
		templateUrl: 'templates/bubble.tpl.html',
		replace: true,
		require: "^uiKonpasaBubbleArea",
		scope: true,
		link: function($scope, $element, $attrs, $ctrl)
		{
			$scope.close = function(index) {
				$scope.bubbles.splice(index, 1);
			};

			$scope.body = $attrs.body;
			$scope.type = $attrs.type;

			$element.modal('show');
			
			// if ($scope.bubbles.length > $ctrl.maxBubbles+1) {
			// 	$scope.bubbles.splice(0, 1);
			// 	console.log("estorou!");
			// }

			setTimeout(function() {
				$element.modal('hide');
				element.remove();
			}, 3000);
		}
	}
});