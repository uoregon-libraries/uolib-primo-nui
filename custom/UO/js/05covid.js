//Add Emergency Banner
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <aside class="site-alert">
      <div class="info">
        <div class="hours-notice">
          UO Libraries building hours and services vary - please check the
          Libraries homepage for today's hours. For more information, <a
          href="/get-help">get help from UO Libraries</a>.
        </div>
      </div>
    </aside>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
