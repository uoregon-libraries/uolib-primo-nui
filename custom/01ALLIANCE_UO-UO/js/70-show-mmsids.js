app.component('prmServiceDetailsAfter', {
  template: '<show-mmsid></show-mmsid>'
});

function applyMMS(scope, val, izSuffix) {
  if (!val.startsWith("99")) {
    return;
  }
  if (val.endsWith(izSuffix)) {
    scope.izMmsid = val;
    scope.izShow = true;
    return;
  }
  scope.nzMmsid = val;
  scope.nzShow = true;
}

angular.module('showMmsid', []).component('showMmsid', {
  bindings: { parentCtrl: '<' },
  controller: function controller($scope, $http, $element, showMmsidOptions) {
    this.$onInit = function() {
      $scope.izShow = false;
      $scope.nzShow = false;
      $scope.izLabel = showMmsidOptions.izLabel;
      $scope.nzLabel = showMmsidOptions.nzLabel;

      var srcid = $scope.$parent.$parent.$ctrl.item.pnx.control.sourcerecordid[0];
      var origsrcid = $scope.$parent.$parent.$ctrl.item.pnx.control.originalsourceid[0];
      applyMMS($scope, srcid, showMmsidOptions.izSuffix);
      applyMMS($scope, origsrcid, showMmsidOptions.izSuffix);
    };
  },
  templateUrl: LocalViewPath+'/html/mmsids.html',
});

app.constant('showMmsidOptions', {
  "izLabel": "MMS ID (IZ)",
  "nzLabel": "MMS ID (NZ)",
  "izSuffix": "1852"
});
