// Banner for general alerts - copy this to custom/UO/js/99alert.js and add
// whatever custom alert messaging is necessary. Delete that file when the
// alert is no longer relevant.
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="alert-notice">
          UO Libraries building hours and services vary - please view the
          <a href="https://library.uoregon.edu/hours-and-locations">Hours &amp; Locations</a>
          for today's hours. For more information,
          <a href="https://library.uoregon.edu/get-help">get help from UO Libraries.</a>
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
