/* External search hacks. This **REPLACES** the PCSG external search code
 * wholesale. We need this in order to give us full control over where the
 * facets show up as well as auto-collapsing most facets on load. */
angular
  .module('externalSearchUO', [])
  .component('externalSearchFacet', {
    controller: function ($scope, externalSearchService, externalSearchOptions) {
      externalSearchService.controller = $scope.$parent.$parent.$ctrl;
      externalSearchService.externalSearchOptions = externalSearchOptions;
      externalSearchService.addExtSearch();
    }
  })
  .component('externalSearchPagenav', {
    controller: function (externalSearchService) {
      if (externalSearchService.controller) {
        externalSearchService.addExtSearch();
      }
    }
  })
  .component('externalSearchContents', {
    template: '<div id="pcsg-es" ng-if="$ctrl.checkName()"><div ng-hide="$ctrl.checkCollapsed()"><div class="section-content animate-max-height-variable"><div class="md-chips md-chips-wrap"><div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4"><div class="md-chip-content layout-row" role="button" tabindex="0"><strong dir="auto" title="{{ target.name }}"><a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank"><img ng-src="{{ target.img }}" width="22" height="22" alt="{{ target.alt }}" style="vertical-align:middle;"> {{ target.name }}</a></strong></div></div></div></div></div></div>',
    controller: function ($scope, $location, externalSearchOptions) {
      $scope.facetName = externalSearchOptions.facetName;
      $scope.targets = externalSearchOptions.searchTargets;
      var query = $location.search().query;
      var filter = $location.search().pfilter;
      $scope.queries = Array.isArray(query) ? query : query ? [query] : false;
      $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;
      this.parentCtrl = $scope.$parent.$parent.$ctrl;
      this.checkName = function () {
        return this.parentCtrl.facetGroup.name == externalSearchOptions.facetName ? true : false;
      }
      this.checkCollapsed = function () {
        return this.parentCtrl.facetGroup.facetGroupCollapsed;
      }
      var externalSearchDiv;
      var externalSearchSelector = "prm-facet div.primo-scrollbar div.sidebar-inner-wrapper div.sidebar-section prm-facet-group div[data-facet-group='" + $scope.facetName + "']";
      function findExternalSearchDiv() {
        var id = setInterval(innerFindExternalSearchDiv, 100);
        function innerFindExternalSearchDiv() {
          if (document.querySelector(externalSearchSelector)) {
            externalSearchDiv = document.querySelector(externalSearchSelector).parentElement.parentElement;
            externalSearchDiv.classList.add("pcsg-external-search");
            clearInterval(id);
          }
        }
      }
      findExternalSearchDiv();
    }
  })
  .factory('externalSearchService', function (externalSearchOptions) {
    return {
      get controller() {
        return this.prmFacetCtrl || false;
      },
      set controller(controller) {
        this.prmFacetCtrl = controller;
      },
      addExtSearch: function addExtSearch() {
        var xx = this;
        var checkExist = setInterval(function () {
          if (xx.prmFacetCtrl.facetService.results[3] && xx.prmFacetCtrl.facetService.results[3].name != xx.externalSearchOptions.facetName) {
            if (xx.prmFacetCtrl.facetService.results.name !== xx.externalSearchOptions.facetName) {
              xx.prmFacetCtrl.facetService.results.splice(3, 1, {
                name: externalSearchOptions.facetName,
                displayedType: 'exact',
                limitCount: 0,
                facetGroupCollapsed: false,
                values: undefined
              });
            }
            clearInterval(checkExist);
          }
        }, 100);
      }
    };
  })
  .value('externalSearchOptions', {
    facetName: 'External Search',
    searchTargets: [
      {
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
      }]
  });
