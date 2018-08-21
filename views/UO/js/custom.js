var LOCAL_VID = "UO";

(function () {
  "use strict";
  'use strict';

  var app = angular.module('viewCustom', ['angularLoad', 'toggleInstitutions', 'customActions']);


  /* hide/show */
  app.component('prmAlmaMoreInstAfter', {
    template: '<toggle-institutions />',
  	bindings: {parentCtrl: '<'},
    controller: function($scope) {
      this.$postLink = function() {
        /* Add a hack to central package code */
        var toggleLibsCached = $scope.$$childHead.$ctrl.toggleLibs;
        $scope.$$childHead.$ctrl.toggleLibs = function() {
          toggleLibsCached.apply(this);
          /*
          Move the content out of the buttons to disable the linking to other institutions
          */
          var buttons = this.tabs[0].querySelectorAll('md-list-item button');
          for(var i=0; i<buttons.length; i++) {
            var $button = angular.element(buttons[i]);
            $button.children().find('prm-icon').detach();
            $button.after($button.children().detach());
            $button.detach();
          }
        }
      }
    }
  });
  app.constant('showHideMoreInstOptions', {
    default_state: 'hidden',
    show_label: 'Show Summit Libraries',
    hide_label: 'Hide Summit Libraries'
  });

  // Central package, add "report a problem" custom action
  app.component('prmActionListAfter', {
    template: '<custom-action name="report_problem" label="Report a Problem" index=10 icon="ic_report_problem_24px" icon-set="action" link="https://library.uoregon.edu/librarysearch/problem?permalink_path=primo-explore/fulldisplay%3Fvid='+LOCAL_VID+'%26docid={{docID}}"></custom-action>',
    controller: 'prmActionListAfterController',
  	bindings: {parentCtrl: '<'},
  });
  app.controller('prmActionListAfterController', ['$scope', '$element', function ($scope, $element) {
    var item = this.parentCtrl.item;
    // Get the first item in the case that this was a multiselect report
    if (item instanceof Array) {
      item = item[0];
    }
    var docID = item.pnx.search.recordid[0];

    $scope.docID = docID;
  }]);

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
  });
  app.component('prmFacetRangeAfter', {
    bindings: {parentCtrl: '<'},
    controller: 'prmFacetCollapseController',
  });
  app.controller('prmFacetCollapseController', ['$element', function($element) {
    switch (this.parentCtrl.facetGroup.name) {
      case 'tlevel':
      case 'rtype':
      case 'creator':
        break;
      default:
				this.parentCtrl.facetGroup.facetGroupCollapsed = true;
        break;
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
    template: '<br/><hr/>' +
    '<p style="text-align: center;"> \
      <a target="_blank" ng-if="!$ctrl.parentCtrl.advancedSearch" md-ink-ripple="#FFF" class="librarysearch-survey zero-margin button-with-icon md-button md-primoExplore-theme md-ink-ripple" style="font-size:1.25em; color:white; white-space:normal;" href="https://oregon.qualtrics.com/jfe/form/SV_4SktAK5aP13RQzz">\
        Tell us what you think about our new LibrarySearch interface <prm-icon external-link="" style="color:#FFF" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
      </a> \
      <a target="_blank" ng-if="$ctrl.parentCtrl.advancedSearch" md-ink-ripple="#000" class="librarysearch-survey-dark zero-margin button-with-icon md-button md-primoExplore-theme md-ink-ripple" style="font-size:1.25em; color:black; white-space:normal;" href="https://oregon.qualtrics.com/jfe/form/SV_4SktAK5aP13RQzz">\
        Tell us what you think about our new LibrarySearch interface <prm-icon external-link="" style="color:#000" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
      </a> \
    </p><hr/>\
    <div ng-class="(!$ctrl.parentCtrl.advancedSearch ?\'simple-mode\' : \'advanced-mode\')"><a href="/primo-explore/search?vid='+LOCAL_VID+'&sortby=rank"> <span>LibrarySearch</span></a></div>',
    controller: function($scope, $element) {
      // var link = '';
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
        flexFirst.attr('flex-lg', 40);
        flexFirst.addClass('flex-lg-40');
        flexFirst.removeClass('flex-lg-10');
        flexFirst.attr('flex-xl', 35);
        flexFirst.addClass('flex-xl-35');
        flexFirst.removeClass('flex-xl-25');

        flexSecond.attr('flex-lg', 75);
        flexSecond.addClass('flex-lg-75');
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
            var elem = document.querySelectorAll('md-option[value="uo_curriculum"], md-option[value="uo_docs"], md-option[value="uo_juvenile"], md-option[value="uo_knightref"], md-option[value="uo_music"], md-option[value="uo_scua"]');
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
			template: '<md-card class="default-card _md zero-margin md-primoExplore-theme" ng-hide="getZeroResults()">\n            <md-card-title>' + opts.title + '</md-card-title>\n            <md-card-content>\n                <md-button class="md-raised" ng-click="searchWorldCat()">\n                Search WorldCat\n                </md-button>\n            </md-card-content>\n        </md-card>'
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
		title: 'Your search returned zero results, but more might be available by searching WorldCat.',
		link: 'https://uolibraries.on.worldcat.org/'
	});


  /* Begin BrowZine - Primo Integration... */
  // Define Angular module and whitelist URL of server with Node.js script
  app.constant('nodeserver', "https://apiconnector.thirdiron.com/v1/libraries/38")
    .config(['$sceDelegateProvider', 'nodeserver', function ($sceDelegateProvider, nodeserver) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(nodeserver + '**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }]);

  // Add Article In Context & BrowZine Links
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope, $http, nodeserver) {
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

  });

  // Below is where you can customize the wording that is displayed (as well as the hover over text) for the BrowZine links.
  // St Olaf has chosen "View Journal Contents" for the "Journal Availability Link" but other great options include things such as "View Journal" or "View this Journal"
  // St Olaf is using "View Issue Contents" for the "Article in Context" link but another great option is "View Complete Issue" or "View Article in Context".
  // St Olaf also has added a hover over link that says "Via BrowZine" to emphasize the interaction being used.

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: '<div ng-if="article.data.browzineWebLink"><a href="{{ article.data.browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> View Issue Contents <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div><div ng-if="journal.data[0].browzineWebLink"><a href="{{ journal.data[0].browzineWebLink }}" target="_blank" title="Via BrowZine"><img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon"> View Journal Contents <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link"><svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"></svg></md-icon></a></div>'
  });

  // Add Journal Cover Images from BrowZine
  app.controller('prmSearchResultThumbnailContainerAfterController', function ($scope, $http, nodeserver) {
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

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultThumbnailContainerAfterController'
  });
  /* End BrowZine - Primo Integration */

})();
