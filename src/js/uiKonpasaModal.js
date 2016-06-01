angular.module('uiKonpasa')
.directive('uiKonpasaModal', uiKonpasaModal);

function uiKonpasaModal() {
	return {
		templateUrl: 'templates/modal.tpl.html',
		scope: {
			title: '='
		},
		transclude: true,
		link: function($scope, $element, $attrs, $ctrl) {
			$element.modal('hide');
		}

	}
}