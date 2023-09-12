var app = angular.module('viewCustom', ['angularLoad', 'externalSearchUO', 'toggleInstitutions', 'customActions', 'hathiTrustAvailability', 'showMmsid']);

// This is required to make our overwritten externalSearch work - see
// 00-replace-external-search.js
app
.component('prmFacetAfter', {template: '<external-search-facet />'})
.component('prmPageNavMenuAfter', {template: '<external-search-pagenav />' })
.component('prmFacetExactAfter', {template: '<external-search-contents />' });

/* Top Nav link customizations,  */
app.controller('prmTopNavBarLinksAfterController', ['$scope', '$element', function($scope, $element) {
  this.$onInit = function(){
    {
      var pCtrl = this.parentCtrl;
      $scope.pCtrl = pCtrl

      /*** This is a hack of ExLibris code to manipulate the number of nav items ***/
      // Overwrite ExLibris function to control number of menu items to show at large breakpoint
      this.parentCtrl.showCount = function() {
        return pCtrl.$mdMedia("lg") ? 5 : pCtrl.$mdMedia("md") ? 2 : pCtrl.$mdMedia("sm") ? 0 : pCtrl.$mdMedia("xs") ? 0 : 5
      }
      /*** End hack ***/
    }
  };
}]);
app.component('prmTopNavBarLinksAfter',{
  bindings: {parentCtrl: '<'},
  controller: 'prmTopNavBarLinksAfterController',
});
/* Top Nav menu items flex adjustment */
app.component('prmTopbarAfter', {
  bindings: {parentCtrl: '<'},
  controller: function($scope, $element) {
    this.$onInit = function(){
      {
        var flexes = $element.parent()[0].querySelectorAll('div[flex]');
        var flexFirst = angular.element(flexes[0]);
        var flexSecond = angular.element(flexes[1]);

        flexFirst.attr('flex', '75');
        flexFirst.addClass('flex-75');
        flexFirst.removeClass('flex-50');
        flexSecond.attr('flex-md', '25');
        flexSecond.addClass('flex-md-25');
      }
    };
  }
});

/*
  Display "..." button for showing various hidden links when breakpoint is
  small enough to hide them, but large enough to show other links
 */
app.component('prmUserAreaExpandableAfter', {
  bindings: {parentCtrl: '<'},
  templateUrl: LocalViewPath+'/html/showMenuButton.html',
  controller: function($scope, $element) {
    this.$onInit = function(){
      {
        $scope.pCtrl = $scope.$parent.$parent.$$childHead.$ctrl;
      }
    };
  }
})


/* Change peer-reviewed icon */
/* peer reviewed icon appears under a bib record, and is two green figures next
 * to the words peer reviewed - MA */
app.component('prmIconAfter', {
  controller: 'prmIconAfterController'
});
app.controller('prmIconAfterController', ['$scope', function($scope) {
  this.$onInit = function(){
    {
      var parentCtrl = $scope.$parent.$ctrl;
      if (parentCtrl.iconDefinition == 'peer-reviewed') {
        // Overwrite default icon set and definition
        parentCtrl.$element
          .attr('svg-icon-set', 'social')
          .attr('icon-definition', 'ic_people_24px');
        // Recompile prm-icon
        var injector = parentCtrl.$element.injector();
        injector.invoke(function($compile){
          return $compile(parentCtrl.$element)($scope);
        });
      }
    }
  };
}]);

/* Deal with LibrarySearch branding in searchbox */
app.component('prmSearchBarAfter', {
  bindings: {parentCtrl: '<'},
  template: '<div ng-class="(!$ctrl.parentCtrl.advancedSearch ?\'simple-mode\' : \'advanced-mode\')"><a href="/discovery/search?vid='+LocalViewID+'&lang=en"> <span>LibrarySearch</span></a></div>',
  controller: function($scope, $element) {
    this.$onInit = function(){
      {
        /*
          The search scope DOM elements just can't be configured until they're
          loaded.

          Race condition hack - keep checking until the elements can be
          removed. We only do this every 500ms to avoid pegging CPU since Primo
          could change on us at any time and make this code just run forever.
        */
        if (!this.parentCtrl.advancedSearch) {
          var scopeHackInterval = setInterval(scopes_delay_hack, 500);
          function scopes_delay_hack() {
            var elem = document.querySelectorAll('md-option[value="JuvenileCollection"], md-option[value="SCUA"]');
            if (elem.length > 0) {
              angular.element(elem).remove();
              clearInterval(scopeHackInterval);
            }
          }
        }
      }
    };

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
  },
});


/*
 * Re-order sections in the detailed item view: puts "How to get it" above
 * "Send to", and "Details" above the "Links" section
 */
app.component('prmFullViewServiceContainerAfter', {
  bindings: {parentCtrl: '<'},
  controller: function($element) {
    this.$onInit = function(){
      {
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
    };
  }
});


/* HathiTrust link out - shows up on detail view as well as search results
 * where availability is displayed. Search for "American Medical Association."
 * to see this working */
app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: { parentCtrl: '<' },
  template: '\n<hathi-trust-availability msg="Check availability in HathiTrust"></hathi-trust-availability>',
  controller: 'prmSearchResultAvailabilityLineAfterController'
});
