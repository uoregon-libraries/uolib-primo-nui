/* Begin BrowZine - Primo Integration... */

angular.module('browzine', [])
  // Define Angular module and whitelist URL of server with Node.js script
  .constant('nodeserver', "https://apiconnector.thirdiron.com/v1/libraries/38")
  .config(['$sceDelegateProvider', 'nodeserver', function ($sceDelegateProvider, nodeserver) {
    var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
    urlWhitelist.push(nodeserver + '**');
    $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }])
  // Add Article In Context & BrowZine Links
  .controller('browzineController', function($scope, $http, nodeserver) {
    var vm = this;
    $scope.book_icon = "https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png";
    if (vm.parentCtrl.result.pnx.addata.doi && vm.parentCtrl.result.pnx.display.type[0] == 'article')  {
      vm.doi = vm.parentCtrl.result.pnx.addata.doi[0] || '';
      var articleURL = nodeserver + "/articles?DOI=" + vm.doi;
      $http.jsonp(articleURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
        $scope.article = response.data;
      }, function(error){
        console.log(error);
      });
    }
    if (vm.parentCtrl.result.pnx.addata.issn && vm.parentCtrl.result.pnx.display.type[0] == 'journal')  {
      vm.issn = vm.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = nodeserver + "/journals?ISSN=" + vm.issn;
      $http.jsonp(journalURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
        $scope.journal = response.data;
      }, function(error){
        console.log(error);
      });
    }
  })
  .component('browzine', {
    bindings: { parentCtrl: '<' },
    controller: 'browzineController',
    template: '<div ng-if="article.data.browzineWebLink"><a href="{{ article.data.browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> View Issue Contents <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div><div ng-if="journal.data[0].browzineWebLink"><a href="{{ journal.data[0].browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> View Journal Contents <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div>',
  })
  // Add Journal Cover Images from BrowZine
  .component('browzineThumbnail', {
    bindings: { parentCtrl: '<' },
    controller: 'browzineThumbnailController',
  })
  .controller('browzineThumbnailController', function ($scope, $http, nodeserver) {
    var vm = this;
    var newThumbnail = '';
    // checking for item property as this seems to impact virtual shelf browse (for reasons as yet unknown)
    if (vm.parentCtrl.item && vm.parentCtrl.item.pnx.addata.issn) {
      vm.issn = vm.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = nodeserver + "/journals?ISSN=" + vm.issn;
      $http.jsonp(journalURL, { jsonpCallbackParam: 'callback' }).then(function (response) {
        if (response.data.data["0"] && response.data.data["0"].browzineEnabled)  {
          newThumbnail = response.data.data["0"].coverImageUrl;
        }
      }, function (error) {
        console.log(error); //
      });
    }
    vm.$doCheck = function (changes) {
      if (vm.parentCtrl.selectedThumbnailLink) {
        if (newThumbnail != '') {
          vm.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;
        }
      }
    };
  });

/* End BrowZine - Primo Integration */
