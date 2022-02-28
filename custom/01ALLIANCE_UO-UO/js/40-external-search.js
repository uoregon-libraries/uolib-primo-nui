//Add PCSG External Search -- revised CGillen 20180928
angular
  .module('externalSearch', [])
  .value('searchTargets', [])
  .directive('externalSearch', function() {
    return {
      require: '^^prmFacet',
      restrict: 'E',
      templateUrl: LocalViewPath + '/html/externalSearch.html',
      controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
        $scope.name = $scope.$ctrl.parentCtrl.facetGroup.name
        $scope.targets = searchTargets
        let query = $location.search().query
        let filter = $location.search().pfilter
        $scope.queries = Array.isArray(query) ? query : query ? [query] : false
        $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false
      }],
      link: (scope, element, attrs, prmFacetCtrl) => {
        var facetTitle = 'External Results';
        var facetPos = 3;

        if (prmFacetCtrl.facets[facetPos].name !== facetTitle) {
          prmFacetCtrl.facets.splice(facetPos, 0, {
              name: facetTitle,
              displayedType: 'exact',
              limitCount: 0,
              facetGroupCollapsed: false,
              values: [],
          })
        }
      },
    }
  });

app.value('searchTargets', [{
  "name": "Worldcat",
  "url": "https://uolibraries.on.worldcat.org/search?queryString=",
  "img": LocalViewPath+"/img/worldcat-logo.png",
  "alt": "",
  mapping: function mapping(queries, filters) {
    var query_mappings = {
      'any': 'kw',
      'title': 'ti',
      'creator': 'au',
      'subject': 'su',
      'isbn': 'bn',
      'issn': 'n2'
    };
    try {
      return queries.map(function (part) {
        var terms = part.split(',');
        var type = query_mappings[terms[0]] || 'kw';
        var string = terms[2] || '';
        var join = terms[3] || '';
        return type + ':' + string + ' ' + join + ' ';
      }).join('');
    } catch (e) {
      return '';
    }
  }
}, {
  "name": "Google Scholar",
  "url": "https://scholar.google.com/scholar?q=",
  "img": LocalViewPath+"/img/google-logo.png",
  "alt": "",
  mapping: function mapping(queries, filters) {
    try {
      return queries.map(function (part) {
        return part.split(",")[2] || "";
      }).join(' ');
    } catch (e) {
      return '';
    }
  }
}]);
