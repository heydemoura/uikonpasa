angular.module('uiKonpasa', ['uiKonpasaTemplates', 'ngSanitize']);

angular.module('uiKonpasa').run(uiKonpasaRun);

function uiKonpasaRun() {
	
};
angular.module('uiKonpasa')

.directive('uiKonpasaBubbleArea', uiKonpasaBubbleArea)
.directive('uiKonpasaBubble', uiKonpasaBubble);

function uiKonpasaBubbleArea() {
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
		}
	};
};

function uiKonpasaBubble() {
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

			$element.show();

			$scope.close = $element.remove;
		}
	}
}
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
angular.module('uiKonpasa')

.directive('uiKonpasaGallery', uiKonpasaGallery)
.directive('uiKonpasaGalleryItem', uiKonpasaGalleryItem)
.directive('uiKonpasaLightbox', uiKonpasaLightbox);

function uiKonpasaGallery() {

	return {

		scope: {
			'gallery-id': "@",
			size: "@"
		},
		replace: false,
		controller: function($scope, $element, $attrs)
		{
			var gallery = [];
			var active = 0;
			var lightbox = undefined;

			this.registerGalleryItem = function(galleryItem, src)
			{
				gallery.push({
					'galleryItem'  : galleryItem,
					'source' : src
				});

			};

			this.openLightbox = function(idx) {
				var itemActive;

				console.log(idx);
				if (idx < 0 ) {
					idx = gallery.length+idx;
				};

				if (idx >= gallery.length) {
					idx =  idx - gallery.length;
				};


				for (i in gallery) {
					if (idx == i) {
						itemActive = gallery[i];
					};
				};

				lightbox.source = itemActive.source;
				
				active = itemActive.galleryItem.position;
			};

			this.registerLightbox = function(lbox) {
				lightbox = lbox;
			};

			this.getColSize = function()
			{
				return $scope.size;
			};

			this.getGalleryLength = function()
			{
				return gallery.length;
			};

			this.getActive = function()
			{
				return active;
			};

			$element.addClass('ui-konpasa-gallery');
		}
	};
};

function uiKonpasaGalleryItem() {
	return {
		templateUrl: 'templates/galleryitem.tpl.html',
		transclude: true,
		scope: {
			title : '@',
		},
		require: '^uiKonpasaGallery',
		link: function(scope, element, attrs, ctrl) {

			angular.element(element).addClass('lightbox-thumbnail');
			angular.element(element).addClass('col-md-'+ctrl.getColSize());
			angular.element(element).addClass('col-sm-'+ctrl.getColSize());
			angular.element(element).addClass('col-xs-'+ctrl.getColSize());

			scope.position = ctrl.getGalleryLength();

			element.children().each(function(index, value) {
				var x = angular.element(value).children()[0];
				ctrl.registerGalleryItem( scope, x.src );
			});

			scope.openLightbox = function() {
				ctrl.openLightbox(scope.position);
			};
		}
	};
};

function uiKonpasaLightbox() {
	return {
		templateUrl: 'templates/lightbox.tpl.html',
		replace: true,
		require: '^uiKonpasaGallery',
		scope: {
			'gallery': "@",
			title: "@",
			source: "@",
		},
		link: function(scope, element, attrs, ctrl) {
			ctrl.registerLightbox(scope);
			
			scope.previousImg = function() {
				ctrl.openLightbox(ctrl.getActive()-1);
			}

			scope.nextImg = function() {
				ctrl.openLightbox(ctrl.getActive()+1);
			}
		}
	};
};
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
angular.module('uiKonpasa')
.directive('uiKonpasaSidemenu', uiKonpasaSidemenu);

function uiKonpasaSidemenu() {
	return {
		templateUrl: 'templates/sidemenu.tpl.html',
		transclude: true,
		restrict: 'E',
		controller: function($scope, $element, $attrs)
		{
			$element.slide()
		}
	};
};
angular.module('uiKonpasaTemplates', ['templates/bubble.tpl.html', 'templates/confirm.tpl.html', 'templates/galleryitem.tpl.html', 'templates/lightbox.tpl.html', 'templates/modal.tpl.html', 'templates/sidemenu.tpl.html']);

angular.module("templates/bubble.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bubble.tpl.html",
    "<div class=\"bubble\" ng-click=\"close()\">\n" +
    "	<div class=\"bubble-body\" ng-class=\"{\n" +
    "			'bubble-danger' : type=='danger', \n" +
    "			'bubble-info' : type=='info', \n" +
    "			'bubble-success' : type=='success',\n" +
    "			'bubble-warning' : type=='warning'}\">\n" +
    "		\n" +
    "		<div ng-bind-html=\"body\">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/confirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/confirm.tpl.html",
    "<div class=\"modal fade uiKonpasaModal\" data-dismissable=\"false\">\n" +
    "	<div class=\"modal-dialog modal-sm\">\n" +
    "		<div class=\"modal-content\" >\n" +
    "			<div class=\"modal-body\">\n" +
    "				<div class=\"text-center\">\n" +
    "						<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "					<h4>\n" +
    "						{{title}}\n" +
    "					</h4>\n" +
    "				</div>\n" +
    "				{{message}}\n" +
    "			</div>\n" +
    "			<div class=\"modal-footer\">\n" +
    "				<button class=\"btn btn-block\" data-ng-repeat=\"btn in buttons track by $index\" data-ng-class=\"{'btn-info' : btn.type=='info', 'btn-danger' : btn.type == 'danger', 'btn-default' : btn.type=='default', 'btn-success' : btn.type == 'success', 'btn-warning' : btn.type == 'warning', 'btn-primary' : btn.type == 'primary'}\" data-ng-click='btn.callback()' data-dismiss=\"modal\">\n" +
    "					{{btn.label}}\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/galleryitem.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/galleryitem.tpl.html",
    "<div data-target=\"#lightboxModal\" data-toggle=\"modal\" class=\"thumbnail lightbox-thumbnail\" ng-transclude ng-click=\"openLightbox()\">\n" +
    "	\n" +
    "</div>");
}]);

angular.module("templates/lightbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/lightbox.tpl.html",
    "<div class=\"modal fade\" id=\"lightboxModal\">\n" +
    "	<div class=\"modal-dialog lightbox\">\n" +
    "		<div class=\"modal-content\">\n" +
    "			<div class=\"modal-header\">\n" +
    "				<div class=\"btn-group\">\n" +
    "					<button class=\"btn btn-default\" ng-click=\"previousImg()\">\n" +
    "						Prev\n" +
    "					</button>\n" +
    "					<button class=\"btn btn-primary\" data-dismiss=\"modal\">\n" +
    "						Close\n" +
    "					</button>\n" +
    "					<button class=\"btn btn-default\" ng-click=\"nextImg()\">\n" +
    "						Next\n" +
    "					</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"modal-body\">\n" +
    "				{{active}}\n" +
    "				<div class=\"lightbox-image\">\n" +
    "					<img src=\"{{source}}\" alt=\"\">\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/modal.tpl.html",
    "<div class=\"modal fade\" id=\"dialogModal\">\n" +
    "	<div class=\"modal-dialog\">\n" +
    "		<div class=\"modal-content\">\n" +
    "			<div class=\"modal-header\" style='background-color: #337AB7; color: white'>\n" +
    "				<b>{{title}}</b>\n" +
    "				<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "			</div>\n" +
    "			<div class=\"modal-body\" >\n" +
    "				<div ng-transclude></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/sidemenu.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/sidemenu.tpl.html",
    "<div class=\"col-md-3 col-sm-2 sidemenu\">\n" +
    "	teste\n" +
    "	\n" +
    "</div>");
}]);
