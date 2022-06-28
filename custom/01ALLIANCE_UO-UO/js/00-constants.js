var LocalViewID;
var LocalViewPath;

const curURL = new URL(window.location.href);
const vid = curURL.searchParams.get('vid');
if (vid != '') {
  LocalViewID = vid;
  LocalViewPath = '/discovery/custom/' + vid.replace(':', '-');
  console.log('View variables: ' + LocalViewID + ' and ' + LocalViewPath);
} else {
  LocalViewID = '01ALLIANCE_UO:UO';
  LocalViewPath = '/discovery/custom/01ALLIANCE_UO-UO';
  console.log('Warning: unable to deduce view variables; defaulting to ' + LocalViewID + ' and ' + LocalViewPath);
}
