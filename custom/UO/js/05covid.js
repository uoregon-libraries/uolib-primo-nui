//Add Emergency Banner
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="hours-notice">
          UO Libraries building hours and services vary - please check the
          <a href="https://library.uoregon.edu/">Libraries homepage</a> for today's hours. For more information,
          <a href="https://library.uoregon.edu/get-help">get help from UO Libraries</a>.
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
