//Add PCSG External Search -- revised CGillen 20180928
angular
  .module('externalSearch', [])
  .value('searchTargets', [])
  .component('externalSearchFacetAfter', {
      bindings: { parentCtrl: '<' },
      controller: ['externalSearchService', function (externalSearchService) {
        externalSearchService.controller = this.parentCtrl
        externalSearchService.addExtSearch()
      }]
  })
  .component('externalSearchPageNavMenuAfter', {
    controller: ['externalSearchService', function (externalSearchService) {
      if (externalSearchService.controller) externalSearchService.addExtSearch()
    }]
  })
  .component('externalSearchFacetExactAfter', {
      bindings: { parentCtrl: '<' },
      template: `
      <div ng-if="name === 'External Search'">
          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">
              <div class="section-content animate-max-height-variable">
                  <div class="md-chips md-chips-wrap">
                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">
                          <div class="md-chip-content layout-row" role="button" tabindex="0">
                              <strong dir="auto" title="{{ target.name }}">
                                  <a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank">
                                      <img ng-src="{{ target.img }}" width="22" height="22" style="vertical-align:middle;"> {{ target.name }}
                                  </a>
                              </strong>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`,
      controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
        $scope.name = this.parentCtrl.facetGroup.name
        $scope.targets = searchTargets
        let query = $location.search().query
        let filter = $location.search().pfilter
        $scope.queries = Array.isArray(query) ? query : query ? [query] : false
        $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false
      }]
  })
  .factory('externalSearchService', function () {
    return {
      get controller() {
        return this.prmFacetCtrl || false
      },
      set controller(controller) {
        this.prmFacetCtrl = controller
      },
      addExtSearch: function () {
        var vm = this;
        var checkExist = setInterval(function () {
          if (vm.prmFacetCtrl.facetService.results[0] && vm.prmFacetCtrl.facetService.results[0].name !== 'External Search') {
            vm.prmFacetCtrl.facetService.results.unshift({
              name: 'External Search',
              displayedType: 'exact',
              limitCount: 0,
              facetGroupCollapsed: false,
              values: undefined
            });
            clearInterval(checkExist);
          }
        }, 100);
      }
    }
  })



app.component('prmFacetAfter', {
  bindings: {parentCtrl: '<'},
  template: '<external-search-facet-after parent-ctrl="$ctrl.parentCtrl"></external-search-facet-after>',
});
app.component('prmPageNavMenuAfter', {
  bindings: {parentCtrl: '<'},
  template: '<external-search-page-nav-menu-after parent-ctrl="$ctrl.parentCtrl"></external-search-page-nav-menu-after>',
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
      'subject': 'su',
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
