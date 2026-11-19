app.value('linksToKeep', [
  'Connect to the online finding aid for this collection.',
  'Connect to the online finding aid for this collection',
  'Online access to digitized portions of this collection.',
  'Online access to digitized portions of this collection',
  'Notice of Interest in Unprocessed Collections',
  'Notice of Interest in Unprocessed Collections.',
  'Online access to digitized portions of this item',
  'Online access to digitized portions of this item.',
  'Table of contents',
  'Table of contents.',
  'Display Source Record',
  'Display Source Record.',
]).component('prmServiceLinksAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: function controller($document, linksToKeep) {
      angular.element(function () {
        if (linksToKeep.length > 0) {
          var lNodes = $document[0].querySelectorAll("prm-service-links > div > div > ul > li");
          for (var i = 0; i < lNodes.length; i++) {
            var eNode = lNodes[i];
            var span = eNode.querySelector("a > span");
            if (span != null) {
              if (!linksToKeep.includes(span.textContent.trim())) {
                eNode.style.display = "none";
              }
            }
          }
        }
      });
    }
  });

  