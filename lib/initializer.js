Ember.Application.instanceInitializer({
  name: "googleAnalytics",

  initialize: function(instance) {
    var router = instance.container.lookup('router:main');
    router.on('didTransition', function() {
      this.trackPageView(this.get('url'));
    });
  }
});
