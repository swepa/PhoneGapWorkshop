var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    showAlert: function(message, title){
      if (navigator.notification){
          navigator.notification.alert(message,null, title,'OK - Press');
      }else{
          alert('notification is not available. Check why???');
          //alert(title ? (title +": "+ message) : message)
      }

    },

    renderHomeView: function (){
      var html = "<div class='header'><h1>Home</h1></div>" +
          "<div class='search-view'>" +
            "<input class='search-key' type='text'/>" +
            "<ul class='employee-list'></ul>" +
        "</div>";
      $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    initializeStore: function(){
        this.store = new MemoryStore(function(){
            this.renderHomeView();
        });
    },

    initialize: function() {
        var self = this;

        document.addEventListener("deviceready", onDeviceReady, false);
        // device APIs are available
        //
        function onDeviceReady() {
            // Empty
            //alert("device is ready, going to initilize Store.");
            self.showAlert('Store Initialized', 'Information.')
            self.initializeStore();
        }


    }

};

