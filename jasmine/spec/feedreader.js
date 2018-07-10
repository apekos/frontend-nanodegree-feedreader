/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URL', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0)
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('have name', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0)
            });
        });
    });

    describe('The menu', function() {

        let menu = $('body');
        let button = $('.icon-list');

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect(menu.hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            button.click();
            expect(menu.hasClass('menu-hidden')).toBe(false);

            button.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should contain entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let oldFeed;
        let newFeed;

        beforeEach(function(done) {
            // run the loadfeed function and store
            // the feed content in a variable
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                // run again the loadfeed function and store
                // the new feed content in another variable
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('content actually changes', function() {
            // compare the new feed content with the old one
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());
