Ember.GoogleAnalyticsTrackingMixin = Ember.Mixin.create({
  pageHasGa: function() {
    return window.ga && typeof window.ga === "function";
  },

  trackPageView: function(page) {
    if (this.pageHasGa()) {
      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga('send', 'pageview', page);
    }
  },

  trackTiming: function(category, variable, value, label) {
    if (this.pageHasGa()) {
      ga('send', 'timing', category, variable, value, label);
    }
  },

  trackEvent: function(category, action, label, value) {
    if (this.pageHasGa()) {
      ga('send', 'event', category, action, label, value);
    }
  }
});
Ember.Application.instanceInitializer({
  name: "googleAnalytics",

  initialize: function(instance) {
    var router = instance.container.lookup('router:main');
    router.on('didTransition', function() {
      this.trackPageView(this.get('url'));
    });
  }
});
Ember.Router.reopen(Ember.GoogleAnalyticsTrackingMixin);
