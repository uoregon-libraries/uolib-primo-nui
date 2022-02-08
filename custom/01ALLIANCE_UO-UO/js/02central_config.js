/* Hide/Show Other Institutions */
app.component('prmAlmaMoreInstAfter', {
  template: '<toggle-institutions />',
  bindings: {parentCtrl: '<'},
});
app.constant('showHideMoreInstOptions', {
  default_state: 'hidden',
  show_label: 'Show Summit Libraries',
  hide_label: 'Hide Summit Libraries'
});

/* Add "report a problem" custom action */
app.component('prmActionListAfter', {
  template: '<custom-action name="report_problem" label="Report a Problem" index=2 icon="ic_report_problem_24px" icon-set="action" link="https://library.uoregon.edu/librarysearch/problem?permalink_path=primo-explore/fulldisplay%3Fvid='+LocalViewID+'%26docid={{docID}}%26context={{context}}"></custom-action>',
  controller: 'prmActionListAfterController',
  bindings: {parentCtrl: '<'},
});
app.controller('prmActionListAfterController', ['$scope', '$element', function ($scope, $element) {
  var item = this.parentCtrl.item;
  // Get the first item in the case that this was a multiselect report
  if (item instanceof Array) {
    item = item[0];
  }
  var docID = item.pnx.control.recordid[0];

  $scope.docID = docID;
  $scope.context = item.context;
}]);
