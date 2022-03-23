/* Browzine link out - shows up as "View Issue Contents" or "View Journal
 * Contents" in the same area where HathiTrust link is displayed (generally
 * near the availability info, like "Available at Mathematics Library..."
 *
 * See https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/79200260/Ex+Libris+Primo+Integration
 * for the latest Third Iron integration details. Currently using the
 * information they provided as of March 21, 2022.
 */

// This is not what thirdiron has in their codebase - we changed the way
// browzine is integrated because HathiTrust already uses
// "prmSearchResultAvailabilityLineAfter". If we don't change one of them to
// use a different location, the systems have a conflict and neither item shows
// up.
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

    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    articleLinkEnabled: true,
    articleLinkText: "Read Article",

    printRecordsIntegrationEnabled: true,

    showFormatChoice: false,
    showLinkResolverLink: true,

    articleRetractionWatchEnabled: true,
    articleRetractionWatchText: "Retracted Article",

    unpaywallEmailAddressKey: "libsys-isd@ithelp.uoregon.edu",

    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",

    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",

    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",

    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",

    // This should ensure unpaywall links work; see
    // https://github.com/uoregon-libraries/uolib-primo-nui/issues/52
    enableLinkOptimizer: false,
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
// ... End BrowZine - Primo Integration
