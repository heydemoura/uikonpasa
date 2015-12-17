angular.module('uiKonpasa')
.directive('uiKonpasaSidemenu', function() {
	return {
		templateUrl: 'templates/sidemenu.tpl.html',
		transclude: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs)
		{
			$element.slide()
		}
	}
});