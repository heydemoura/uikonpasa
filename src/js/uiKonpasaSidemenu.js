angular.module('uiKonpasa')
.directive('uiKonpasaSidemenu', uiKonpasaSidemenu);

function uiKonpasaSidemenu() {
	return {
		templateUrl: 'templates/sidemenu.tpl.html',
		transclude: true,
		restrict: 'E',
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs)
		{
			$element.slide()
		}]
	};
};