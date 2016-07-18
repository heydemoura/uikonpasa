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
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
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
		}]
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
		link: ['scope', 'element', 'attrs', 'ctrl', function(scope, element, attrs, ctrl) {
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
		}]
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
		link: ['scope', 'element', 'attrs', 'ctrl', function(scope, element, attrs, ctrl) {
			ctrl.registerLightbox(scope);
			
			scope.previousImg = function() {
				ctrl.openLightbox(ctrl.getActive()-1);
			}

			scope.nextImg = function() {
				ctrl.openLightbox(ctrl.getActive()+1);
			}
		}]
	};
};