/* ====== Code for making edits to individual brief results ====== */
/* Includes:
       - Changes PCI Ebook and Ebook chapters to display a media type of
         Book or Book Chapter. (appears to fix this for full display too)
 */
 var GenericBriefResultController = function GenericBriefResultController($scope, $element) {
    this._$scope = $scope;
    this._$elem = $element;
 };
 GenericBriefResultController.prototype.$doCheck = function $doCheck () {
    /* run check to fix PCI ebookx */
    this.fixPCIeBookContent();
 };
 GenericBriefResultController.prototype.fixPCIeBookContent = function fixPCIeBookContent () {
    /* only run the fixes if it's PCI content (pnxID begins with TN) and
       if the content type is eBook or eBook chapter.
       To make the change permanent, we have to turn off the two attributes
       angular uses to update the value: ng-if and translate.
    */
    var pnxID = this.parentCtrl.item.pnx.control.recordid[0];
    if(pnxID.indexOf('TN') != 0)
       { return; }
    var spanElem = this._$elem.parent()[0].querySelector('div.media-content-type span');
    if(spanElem !== null && spanElem.textContent.indexOf('eBook') == 0) {
       spanElem.removeAttribute('translate');
       spanElem.removeAttribute('ng-if');
       spanElem.textContent = spanElem.textContent.replace('eBook','Book');
    }
 };
 app.component('prmBriefResultContainerAfter', {
    bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
    controller: 'genericBriefResultController',
    templateUrl: ''
 }).controller('genericBriefResultController',GenericBriefResultController);
 /* ====== */
