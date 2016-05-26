// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// Use readList to get array of sites to download
// For each URL, check if Archived
// True - do nothing
// False - call downloadUrls

var archive = require('../helpers/archive-helpers');

var CronJob = require('cron').CronJob;

var urlsToDownload = [];

exports.fetchSite = function() {
  new CronJob('00 01 00 * * *', function() {
    // Runs everyday on the minute
    archive.readListOfUrls(function(list) {
      list.forEach(function(url) {
        archive.isUrlArchived(url, function(archived) {
          if (!archived) {
            urlsToDownload.push(url);
          };
        });
      });
    });
    }, function () {
      /* This function is executed when the job stops */
      if (urlsToDownload.length > 0) {
        archive.downloadUrls(urlsToDownload);
      }
    },
    true, /* Start the job right now */
    'America/Los_Angeles' /* Time zone of this job. */
  );
}
