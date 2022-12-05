/* Add "report a problem" custom action */
app.component('prmActionListAfter', {
  template: '<custom-action name="report_problem" label="Report a Problem" index=2 icon="ic_report_problem_24px" icon-set="action" link="https://library.uoregon.edu/librarysearch/problem?permalink_path={{permalink}}"></custom-action>',
  controller: 'prmActionListAfterController',
  bindings: {parentCtrl: '<'},
});
app.controller('prmActionListAfterController', ['$scope', '$location', '$element', function($scope, $location, $element) {
  this.$onInit = function(){
    // OpenURLs require us to report the entire URL - fortunately these never
    // come from search results, so we still preserve privacy.
    if ($location.path() === '/openurl') {
      $scope.permalink = makePermalink($location)
      return;
    }

    // Since we're using the location anyway, let's pull the view id off it to
    // give us a guaranteed-correct value

    var item = this.parentCtrl.item;
    // Get the first item in the case that this was a multiselect report
    if (item instanceof Array) {
      item = item[0];
    }
    var docID = item.pnx.control.recordid[0];
    if (docID.startsWith("alma")) {
      docID = docID.replace("alma", "");
    }

    $scope.permalink = makePermalink($location, '/search', {query: 'any,exact,' + docID});
  };
}]);

// Takes a "location" object and optionally overridden path and query
// args. If there is no override, we simply use the url() function on the
// location object. The returned value is an encoded URL with "discovery"
// prepended to it so our Drupal "report a problem" form works properly.
function makePermalink(loc, path = null, query = null) {
  if (path == null) {
    path = loc.path();
  }
  if (query == null) {
    query = loc.search();
  }

  var q = new URLSearchParams(query);
  q.set('vid', loc.search().vid);
  var url = 'discovery' + path + '?' + q;
  return encodeURIComponent(url);
}
