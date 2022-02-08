// On no search results, we add a block below the suggestions allowing users to
// search worldcat
//
// See https://www.orbiscascade.org/programs/systems/pcsg/primo-toolkit/worldcat-button-for-zero-result-searches/
function addWorldcatButton(opts){
  app.component('prmSearchResultListAfter', {
    require: {
      prmSearchCtrl: '^prmSearch'
    },
    controller: 'worldcatButtonController',
    templateUrl: LocalViewPath+'/html/worldCat.html'
  }).controller('worldcatButtonController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    var vm = this;
    vm.$onInit = function() {
      $scope.wcBase = opts.link;
      $scope.imageUrl = opts.imageUrl;
      $scope.$prmSearchCtrl = vm.prmSearchCtrl;

      $scope.getZeroResults = function() {
        if ($scope.$prmSearchCtrl.searchService.searchDone && $scope.$prmSearchCtrl.searchService.searchStateService.resultObject.info) {
          $scope.searchTerm = $scope.$prmSearchCtrl.searchService.searchFieldsService.mainSearch;
          return ($scope.$prmSearchCtrl.searchService.searchStateService.resultObject.info.total !== 0);
        }
      }
      
      $scope.searchWorldCat = function() {
        window.open(($scope.wcBase + "search?databaseList=&queryString=" + $scope.searchTerm), '_blank');
      }
    } 
  }]);
}

addWorldcatButton({
  link: 'https://uolibraries.on.worldcat.org/',
  imageUrl: '/discovery/custom/01ALLIANCE_UO-UO/img/worldcat-logo.png',
});
