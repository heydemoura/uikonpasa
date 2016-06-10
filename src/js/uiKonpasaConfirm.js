angular.module('uiKonpasa')

.directive('uiKonpasaConfirm', uiKonpasaConfirm);

function uiKonpasaConfirm() {
	return {
		templateUrl: 'templates/confirm.tpl.html',
		scope: {
			title: '=',
			message: '=',
			buttons: '='
		},
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
			var modal = $element.find('.modal');
			modal.modal({backdrop: 'static', keyboard: false});
			$scope.close = function() {
				modal.modal('hide');
			};
		}],
		link: ['$scope', '$element', '$attrs', '$ctrl', function($scope, $element, $attrs, $ctrl) {
			$element.modal();
		}]
	};
};