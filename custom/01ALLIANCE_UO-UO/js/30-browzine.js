/* Browzine link out - shows up as "View Issue Contents" or "View Journal
 * Contents" in the same area where HathiTrust link is displayed (generally
 * near the availability info, like "Available at Mathematics Library..."
 *
 * See https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/79200260/Ex+Libris+Primo+Integration
 * for the latest Third Iron integration details. Currently using the
 * information they provided as of March 21, 2022.
 */

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
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);

  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration
