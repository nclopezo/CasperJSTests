var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1024, height: 610};
casper.options.verbose = true;
casper.options.logLevel =  "info";

casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
casper.test.begin('Resurrectio test', function(test) {
   casper.start('https://www.surechembl.org/search/');
   casper.waitForSelector("#sure-query",
       function success() {
           test.assertExists("#sure-query");
           this.click("#sure-query");
       },
       function fail() {
           test.assertExists("#sure-query");
   });
   casper.waitForSelector("textarea[name='sure-query']",
       function success() {
           this.sendKeys("textarea[name='sure-query']", "aspirin");
       },
       function fail() {
           test.assertExists("textarea[name='sure-query']");
   });
   casper.waitForSelector("form[name=search] input[type=submit][value='Search']",
       function success() {
           test.assertExists("form[name=search] input[type=submit][value='Search']");
           this.click("form[name=search] input[type=submit][value='Search']");
       },
       function fail() {
           test.assertExists("form[name=search] input[type=submit][value='Search']");
   });
   casper.waitForSelector(x("//a[normalize-space(text())='US-20160074186-A1']"),
       function success() {
           test.assertExists(x("//a[normalize-space(text())='US-20160074186-A1']"));
           this.click(x("//a[normalize-space(text())='US-20160074186-A1']"));
       },
       function fail() {
           
   });

   casper.run(function() {test.done();});
});
