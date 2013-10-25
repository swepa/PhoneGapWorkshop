var app = {

    /*findByName: function() {
        console.log('findByName');
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
            /*
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }*//*
        });
    },*/

    showAlert: function(message, title){
      if (navigator.notification){
          navigator.notification.alert(message,null, title,'OK - Press');
      }else{
          //alert('notification is not available. Check why???');
          alert(title ? (title +": "+ message) : message)
      }

    },

    //renderHomeView: function (){
      //var html = "";
    //    var self = this;
    //    $('body').html(self.homeTpl);
    //  $('.search-key').on('keyup', $.proxy(self.findByName, self));
    //},

    initializeStore: function(){
        var self = this;
        self.store = new MemoryStore(function(){
            //self.renderHomeView();
            $('body').html(new HomeView(self.store).render().el);
        });
    },

    registerEvents: function(){
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },

    initialize: function() {
        var self = this;

        document.addEventListener("deviceready", onDeviceReady, false);
        // device APIs are available
        //
        function onDeviceReady() {
            // Empty
            //alert("device is ready, going to initilize Store.");
            self.registerEvents();
            self.initializeStore();
            self.showAlert('Store Initialized', 'Information.');

            //self.homeTpl = Handlebars.compile($("#home-tpl").html());
            //self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
            //self.showAlert('End device ready method.', 'Message');
        }
        //self.registerEvents();
        //self.initializeStore();
        //self.showAlert('End device ready method.', 'Message');
        //this.homeTpl = Handlebars.compile($("#home-tpl").html());
        //this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    }

};

