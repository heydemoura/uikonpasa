angular.module('uiKonpasa', ['uiKonpasaTemplates']);

angular.module('uiKonpasa').run(function() {
	
});
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
angular.module('uiKonpasa')

.directive('uiKonpasaGallery', function() {
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

			}

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
				}

				lightbox.source = itemActive.source;
				
				active = itemActive.galleryItem.position;
			}

			this.registerLightbox = function(lbox) {
				lightbox = lbox;
			}

			this.getColSize = function()
			{
				return $scope.size;
			}

			this.getGalleryLength = function()
			{
				return gallery.length;
			}

			this.getActive = function()
			{
				return active;
			}

			$element.addClass('ui-konpasa-gallery');
		}
	}
})

.directive('uiKonpasaGalleryItem', function() {
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
			}
		}
	}
})

.directive('uiKonpasaLightbox', function() {
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
	}
});
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
angular.module('uiKonpasaTemplates', ['templates/bubble.tpl.html', 'templates/galleryitem.tpl.html', 'templates/lightbox.tpl.html', 'templates/sidemenu.tpl.html']);

angular.module("templates/bubble.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bubble.tpl.html",
    "<div class=\"modal fade bubble\" data-backdrop=\"false\"  ng-click=\"close($index)\" data-dismiss=\"modal\">\n" +
    "	<div class=\"modal-content\">\n" +
    "		<div class=\"modal-body\" \n" +
    "			ng-class=\"{\n" +
    "				'bubble-danger' : type=='danger', \n" +
    "				'bubble-info' : type=='info', \n" +
    "				'bubble-success' : type=='success',\n" +
    "				'bubble-warning' : type=='warning'}\">\n" +
    "			\n" +
    "			<div ng-bind=\"body\">\n" +
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

angular.module("templates/sidemenu.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/sidemenu.tpl.html",
    "<div class=\"col-md-3 col-sm-2 sidemenu\">\n" +
    "	teste\n" +
    "	\n" +
    "</div>");
}]);
