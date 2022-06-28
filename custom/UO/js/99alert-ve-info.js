// Banner for general alerts - copy this to custom/UO/js/99alert.js and add
// whatever custom alert messaging is necessary. Delete that file when the
// alert is no longer relevant.
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="alert-notice">
          LibrarySearch has moved to a new location. In order to get complete
          results and to request items, please go to
          <a href="https://alliance-uoregon.primo.exlibrisgroup.com/discovery/search?vid=01ALLIANCE_UO:UO">https://alliance-uoregon.primo.exlibrisgroup.com/discovery/search?vid=01ALLIANCE_UO:UO</a>.

          <a href="https://researchguides.uoregon.edu/librarysearch-upgrade">More information about changes.</a>
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
