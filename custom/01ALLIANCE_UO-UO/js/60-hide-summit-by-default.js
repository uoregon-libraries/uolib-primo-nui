// Hides the summit disclosure by default
//
// See https://www.orbiscascade.org/programs/systems/pcsg/primo-ve-toolkit/collapse-other-institutions/
app.component("prmAlmaOtherMembersAfter", {
  bindings: {
    parentCtrl: "<",
  },
  controller: [
    function () {
      var ctrl = this;
      ctrl.parentCtrl.isCollapsed = true;
    },
  ],
});
