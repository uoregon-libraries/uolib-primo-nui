// Banner for general alerts - copy this to custom/UO/js/99alert.js and add
// whatever custom alert messaging is necessary. Delete that file when the
// alert is no longer relevant.
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="alert-notice">
          The Libraries Locate function that helps you find where physical
          materials are shelved in the library is currently unavailable – we’re
          working on the issue and hope to get it resolved as soon as possible.
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
