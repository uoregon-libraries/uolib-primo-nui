//Add PCSG External Search -- revised CGillen 20180928
angular
  .module('externalSearch', [])
  .value('searchTargets', [])
  .directive('externalSearch', function() {
    return {
      require: '^^prmFacet',
      restrict: 'E',
      templateUrl: '/primo-explore/custom/' + LOCAL_VID + '/html/externalSearch.html',
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
  "url": "https://uolibraries.on.worldcat.org/search?",
  "img": "https://alliance-primo.hosted.exlibrisgroup.com/primo-explore/custom/WSU/img/worldcat-logo.png",
  "alt": "Worldcat Logo",
  mapping: function mapping(queries, filters) {
    var query_mappings = {
      'any': 'kw',
      'title': 'ti',
      'creator': 'au',
      'sub': 'su',
      'isbn': 'bn',
      'issn': 'n2'
    };
    try {
      return 'queryString=' + queries.map(function (part) {
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
  "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
  "alt": "Google Scholar Logo",
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
