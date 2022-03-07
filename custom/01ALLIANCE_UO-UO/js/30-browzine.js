/* Browzine link out - shows up as "View Issue Contents" or "View Journal
 * Contents" in the same area where HathiTrust link is displayed (generally
 * near the availability info, like "Available at Mathematics Library..." */
app.component('prmSearchResultThumbnailContainerAfter', {
  bindings: { parentCtrl: '<' },
  template: '<browzine-thumbnail parent-ctrl="$ctrl.parentCtrl"></browzine-thumbnail>'
});
app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
  window.browzine.primo.searchResult($scope);
});

// Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/38",
    apiKey: "114736ff-52f1-42ce-9824-0ab9b5c67728",

    journalCoverImagesEnabled: true,

    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",

    acticleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    printRecordsIntegrationEnabled: true,
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
// ... End BrowZine - Primo Integration
