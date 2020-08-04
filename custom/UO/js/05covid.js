//Add Emergency Banner
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <div class="covid-wrapper">
      <div id="covid-19">
        <h2>COVID-19 Notice</h2>
        <span>UO Libraries buildings are closed, but we're here to help!</span>
        <a href="https://library.uoregon.edu/get-help">Get help from UO Libraries</a>
      </div>
    </div>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
