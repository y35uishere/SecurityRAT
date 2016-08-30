angular.module('sdlctoolApp')
	.controller('PresentationController', function ($scope, $rootScope, localStorageService, $filter, $timeout) {
		$scope.values = localStorageService.get('myRevealjs');
//		console.log($scope.values);
		localStorageService.remove('myRevealjs');
		$scope.categories = [];
		function hasValue(id, arrayValue) {
			for(var i = 0; i < arrayValue.length; i++) {
				if(arrayValue[i].id === id) {
					return true
				}
			}
			return false;
		}
		
		if(angular.isDefined($scope.values)) {
			angular.forEach($scope.values.requirements, function(requirement) {
				console.log(hasValue(requirement.categoryId, $scope.categories));
				if(!hasValue(requirement.categoryId, $scope.categories)) {
					$scope.categories.push({
						name: requirement.category,
						id: requirement.categoryId,
						showOrder: requirement.categoryOrder
					})
				}
			});
		}
		Reveal.initialize({
			loop: false,
			controls: true,
			progress: true,
			center: true,
			transition: $scope.values.config.transition,
			// More info https://github.com/hakimel/reveal.js#dependencies
			dependencies: [
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/plugin/markdown/marked.js' },
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/plugin/markdown/markdown.js' },
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/plugin/notes/notes.js', async: true },
				{ src: 'scripts/app/editor/presentation/myRevealjs/reveal.js/plugin/zoom-js/zoom.js', async: true },
			]
		});
	});