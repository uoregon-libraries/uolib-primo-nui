//Add Emergency Banner
app.component('prmBackToLibrarySearchButtonAfter', {
  template: `
    <div id="covid-19">
      <h2>COVID-19 Notice</h2>
      Due to the impacts of COVID-19, Summit requesting for physical materials
      is no longer available until further notice. Sign in to see more options or
      <a href="https://library.uoregon.edu/ask">Ask a Librarian</a> for help.
    </div>
  `,
  scope: {},
  bindings: {parentCtrl: '<'},
});
