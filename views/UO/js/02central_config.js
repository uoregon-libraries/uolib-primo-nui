/* Hide/Show Other Institutions */
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

/* Add "report a problem" custom action */
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
