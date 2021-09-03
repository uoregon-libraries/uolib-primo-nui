// Banner for general alerts - copy this to custom/UO/js/99alert.js and add
// whatever custom alert messaging is necessary. Delete that file when the
// alert is no longer relevant.
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="alert-notice">
          Libraries users may currently not be able to access materials in
          Elsevier databases. Staff are working on the issue and expect to have
          it resolved soon.
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
