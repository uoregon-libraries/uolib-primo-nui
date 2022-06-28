// Banner for general alerts - copy this to custom/UO/js/99alert.js and add
// whatever custom alert messaging is necessary. Delete that file when the
// alert is no longer relevant.
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="alert-notice">
          LibrarySearch was upgraded on June 28th, 2022. Please update your bookmarks for LibrarySearch to
          <a href="https://alliance-uoregon.primo.exlibrisgroup.com/discovery/search?vid=01ALLIANCE_UO:UO">https://alliance-uoregon.primo.exlibrisgroup.com/discovery/search?vid=01ALLIANCE_UO:UO</a>
          and update any saved permalinks.
          <a href="https://researchguides.uoregon.edu/librarysearch-upgrade">More information about changes.</a>
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
