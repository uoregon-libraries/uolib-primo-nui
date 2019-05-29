var LOCAL_VID = "UO";

var app = angular.module('viewCustom', ['angularLoad', 'externalSearch', 'toggleInstitutions', 'customActions', 'hathiTrustAvailability']);


/****************************************************************************************************/

    /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

    /*var app = angular.module('centralCustom', ['angularLoad']);*/

/****************************************************************************************************/

/* Top Nav link customizations,  */
app.controller('prmTopNavBarLinksAfterController', ['$scope', '$element', function ($scope, $element) {
  var pCtrl = this.parentCtrl;
  $scope.pCtrl = pCtrl

  /*** This is a hack of ExLibris code to manipulate the number of nav items ***/
  // Overwrite ExLibris function to control number of menu items to show at large breakpoint
  this.parentCtrl.showCount = function() {
    return pCtrl.$mdMedia("lg") ? 5 : pCtrl.$mdMedia("md") ? 4 : pCtrl.$mdMedia("sm") ? 0 : pCtrl.$mdMedia("xs") ? 0 : 5
  }
  /*** End hack ***/

}]);
app.component('prmTopNavBarLinksAfter',{
  bindings: {parentCtrl: '<'},
  controller: 'prmTopNavBarLinksAfterController',
});
/* Top Nav menu items flex adjustment */
app.component('prmTopbarAfter', {
  bindings: {parentCtrl: '<'},
  controller: function($scope, $element) {
    var flexes = $element.parent()[0].querySelectorAll('div[flex]');
    var flexFirst = angular.element(flexes[0]);
    var flexSecond = angular.element(flexes[1]);

    flexFirst.attr('flex', '75');
    flexFirst.addClass('flex-75');
    flexFirst.removeClass('flex-50');
    flexSecond.attr('flex-md', '25');
    flexSecond.addClass('flex-md-25');
  }
});
/*
  Display menu button in top nav for small breakpoint
 */
app.component('prmUserAreaExpandableAfter', {
  bindings: {parentCtrl: '<'},
  templateUrl: '/primo-explore/custom/'+LOCAL_VID+'/html/showMenuButton.html',
  controller: function($scope, $element) {
    $scope.pCtrl = $scope.$parent.$parent.$$childHead.$ctrl;
  }
})


/* Collapse facets */
app.component('prmFacetExactAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'prmFacetCollapseController',
  template: '<external-search></external-search>'
});
app.component('prmFacetRangeAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'prmFacetCollapseController',
});
app.controller('prmFacetCollapseController', ['$element', '$scope', function($element, $scope) {
  var index = $scope.$parent.$parent.$parent.$parent.$parent.$index;

  if (index >= 3 && this.parentCtrl.facetGroup.name != 'External Results') {
    this.parentCtrl.facetGroup.facetGroupCollapsed = true;
  }
}]);


/* Change peer-reviewed icon */
app.component('prmIconAfter', {
  bindings: {parentCtrl: '<'},
  controller: 'prmIconAfterController',
});
app.controller('prmIconAfterController', ['$scope', '$element', function ($scope, $element) {
  if (this.parentCtrl.iconDefinition == 'peer-reviewed') {
    this.parentCtrl.svgIconSet = 'social';
    this.parentCtrl.iconDefinition = 'ic_people_24px';
    $scope.$parent.$parent.$parent.$parent.$ctrl.actionsIcons.peerreviewed.iconSet = 'social';
    $scope.$parent.$parent.$parent.$parent.$ctrl.actionsIcons.peerreviewed.icon = 'ic_people_24px';
  }
}]);


/*
  Show more than 10 results
  https://developers.exlibrisgroup.com/blog/Change-the-Number-of-Results-Loaded-in-Primo-NUI
*/
app.component('prmExploreMainAfter',{
  bindings: {parentCtrl: '<'},
  controller: function($scope){
    var pageSize = 10;
    //adjust these values to control the number of results you want to display
    this.parentCtrl.searchService.cheetah.PAGE_SIZE = pageSize;
    this.parentCtrl.searchService.searchStateService.PAGE_SIZE = pageSize;
    this.parentCtrl.itemsPerPage = pageSize;
    this.parentCtrl.PAGE_SIZE = pageSize;
    this.parentCtrl.searchService.searchStateService.PAGE_SIZE = pageSize;
    this.parentCtrl.searchService.cheetah.configurationUtil.searchStateService.resultsBulkSize = pageSize;

    this.parentCtrl.configurationUtil.systemConfiguration["FE UI – Scrolling Threshold"] = pageSize;   //change according to the number of results loaded
  }
});


/* Add Beta Qualtrics link */
app.component('prmSearchBarAfter', {
  bindings: {parentCtrl: '<'},
  template: '<div ng-class="(!$ctrl.parentCtrl.advancedSearch ?\'simple-mode\' : \'advanced-mode\')"><a href="/primo-explore/search?vid='+LOCAL_VID+'&sortby=rank"> <span>LibrarySearch</span></a></div>',
  controller: function($scope, $element) {
    this.$postLink = function() {
      var row = '<div layout="row" class="layout-row flex-100"></div>'
      row = angular.element(row);

      var link = $element.find('div');

      var flexes = $element.parent()[0].querySelectorAll('.search-wrapper.layout-row>div');
      var flexFirst = angular.element(flexes[0]);
      var flexSecond = angular.element(flexes[1]);

      flexFirst.append(link);
      flexFirst.attr('flex', 100);
      flexFirst.addClass('flex-100');
      flexFirst.removeClass('flex-0');
      flexFirst.attr('flex-lg', 20);
      flexFirst.addClass('flex-lg-20');
      flexFirst.removeClass('flex-lg-10');
      flexFirst.attr('flex-xl', 20);
      flexFirst.addClass('flex-xl-20');
      flexFirst.removeClass('flex-xl-25');

      flexSecond.attr('flex-md', 85);
      flexSecond.addClass('flex-md-85');
      flexSecond.removeClass('flex-md-75');
      flexSecond.attr('flex-lg', 80);
      flexSecond.addClass('flex-lg-80');
      flexSecond.removeClass('flex-lg-65');
      flexSecond.attr('flex-xl', 65);
      flexSecond.addClass('flex-xl-65');
      flexSecond.removeClass('flex-xl-50');

      row.append(flexes[1]); row.append(flexes[2]); row.append(flexes[3]);
      flexFirst.after(row);

      flexFirst.parent().addClass('layout-md-column');
      flexFirst.parent().addClass('layout-sm-column');
      flexFirst.parent().addClass('layout-xs-column');
    }

    /*
      Race condition hack
      The search scope DOM elements just can't be configured until they're loaded.
      This hack lets you delay a static amount of time. Very race conditiony, DO NOT USE.
    */
    if (!this.parentCtrl.advancedSearch) {
      setTimeout(scopes_delay_hack, 2000); /* 2 second delay */
      function scopes_delay_hack() {
        angular.element(document).ready(function () {
          var elem = document.querySelectorAll('md-option[value="uo_curriculum"], md-option[value="uo_design_special_collections"], md-option[value="uo_docs"], md-option[value="uo_juvenile"], md-option[value="uo_knightref"], md-option[value="uo_music"], md-option[value="uo_scua"]');
          angular.element(elem).remove();
        });
      }
    }

  },
});


/* Add My Illiad Account link */
app.component('prmAccountAfter', {
  templateUrl: '/primo-explore/custom/'+LOCAL_VID+'/html/illLink.html',
  controller: function($scope) {
    this.$postLink = function() {
       var header = document.getElementsByTagName('prm-account')[0].querySelector('h1.toolbar-title').parentElement;
       var illLink = document.getElementById('uoIllLink');
       var divider = illLink.previousElementSibling;
       angular.element(header).append(divider);
       angular.element(header).append(illLink);
    };
  },
});


/* Re-order Detailed view items */
app.component('prmFullViewServiceContainerAfter', {
  bindings: {parentCtrl: '<'},
  controller: function ($element) {

    /* Base queries off full view service container element */
    var elem = $element.parent().parent().parent().parent()[0];

    /* Swap View/Get It and Send To sections on pop-over */
    var viewIt = angular.element(elem.querySelector('#getit_link1_0'));
    var sendTo = angular.element(elem.querySelector('#action_list'));
    viewIt.after(sendTo);
    /* Swap View/Get It and Send To buttons on left */
    var viewItButton = angular.element(elem.querySelector('[translate="nui.getit.alma_tab1_norestrict"]')).parent();
    var getItButton = angular.element(elem.querySelector('[translate="nui.getit.alma_tab1_avail"]')).parent();
    var sendToButton = angular.element(elem.querySelector('[translate="nui.brief.results.tabs.send_to"]')).parent();
    getItButton.after(sendToButton);
    viewItButton.after(sendToButton);

    /* Swap Details and Links sections in pop-over */
    var links = angular.element(elem.querySelector('#links'));
    var details = angular.element(elem.querySelector('#details'));
    links.after(details);
    /* Swap Details and Links buttons on left */
    var linksButton = angular.element(elem.querySelector('[translate="nui.brief.results.tabs.links"]')).parent();
    var detailsButton = angular.element(elem.querySelector('[translate="brief.results.tabs.details"]')).parent();
    linksButton.after(detailsButton);
  }
});


/* Un-suppress collection scopes in advanced search */
app.component('prmAdvancedSearchAfter', {
  controller: 'prmAdvancedSearchAfterController',
}).controller('prmAdvancedSearchAfterController', ['$scope', function ($scope) {
  // Generate style element to unhide advanced scopes
  var style = document.createElement('style');
  style.id = 'advancedScopesUnhide';
  style.innerHTML = 'md-option[value="uo_curriculum"], md-option[value="uo_docs"], md-option[value="uo_juvenile"], md-option[value="uo_knightref"], md-option[value="uo_music"], md-option[value="uo_scua"] { display: flex; }';

  // Add style element on advanced search open
  this.$onInit = function() {
    document.body.appendChild(style);
  }
  // Remove style element on advanced search close
  this.$onDestroy = function() {
    document.body.removeChild(style);

    var elem = document.querySelectorAll('md-option[value="uo_curriculum"], md-option[value="uo_docs"], md-option[value="uo_juvenile"], md-option[value="uo_knightref"], md-option[value="uo_music"], md-option[value="uo_scua"]');
    angular.element(elem).remove();
  }
}]);


/* Worldcat button for zero-result searches */
// Worldcat button documentation: https://www.orbiscascade.org/blog/9/?bid=649
function addWorldcatButton(opts) {
  app.component('prmNoSearchResultAfter', {
    require: {
      prmSearchCtrl: '^prmSearch'
    },
    controller: 'worldcatButtonController',
    templateUrl: '/primo-explore/custom/'+LOCAL_VID+'/html/worldCat.html',
  }).controller('worldcatButtonController', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    var vm = this;
    vm.$onInit = function () {
      $scope.wcBase = opts.link;
      $scope.$prmSearchCtrl = vm.prmSearchCtrl;
      $scope.getZeroResults = function () {
        if ($scope.$prmSearchCtrl.searchService.searchDone && $scope.$prmSearchCtrl.searchService.searchStateService.resultObject.info) {
          $scope.searchTerm = $scope.$prmSearchCtrl.searchService.searchFieldsService.mainSearch;
          return $scope.$prmSearchCtrl.searchService.searchStateService.resultObject.info.total !== 0;
        }
      };
      $scope.searchWorldCat = function () {
        window.open($scope.wcBase + "search?databaseList=&queryString=" + $scope.searchTerm, '_blank');
      };
    };
  }]);
}
addWorldcatButton({
  link: 'https://uolibraries.on.worldcat.org/'
});

/* HathiTrust link out and Browzine link outs */
app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: { parentCtrl: '<' },
  template: '\n<hathi-trust-availability msg="Check availability in HathiTrust"></hathi-trust-availability>',
  controller: 'prmSearchResultAvailabilityLineAfterController'
});
/* Browzine thumbnail overrides */
app.component('prmSearchResultThumbnailContainerAfter', {
  bindings: { parentCtrl: '<' },
  template: '<browzine-thumbnail parent-ctrl="$ctrl.parentCtrl"></browzine-thumbnail>'
});
 app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
   window.browzine.primo.searchResult($scope);
 });
