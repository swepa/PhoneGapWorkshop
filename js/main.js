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

    slidePage: function(page) {

        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

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
            //$('body').html(new HomeView(self.store).render().el);
            self.route();
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

        $(window).on('hashchange', $.proxy(this.route, this));
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage){
                this.slidePage(this.homePage);
            }else{
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            //this.showAlert('No hash found.', 'Information.');
            //$('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            //this.showAlert('Hash found.', 'Information.');
            this.store.findById(Number(match[1]), function(employee) {
                //$('body').html(new EmployeeView(employee).render().el);
                self.slidePage(new EmployeeView(employee).render());
            });
        }
    },

    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;

        document.addEventListener("deviceready", onDeviceReady, false);
        // device APIs are available
        //
        function onDeviceReady() {
            // Empty
            //alert("device is ready, going to initilize Store.");

            self.registerEvents();
            self.initializeStore();
            self.showAlert('Store Initialized', 'Information.');

            //self.showAlert('Camera method call.', 'Information.');
            //EmployeeView.changePicture(e);

            //self.homeTpl = Handlebars.compile($("#home-tpl").html());
            //self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
            //self.showAlert('End device ready method.', 'Message');
        }
        //self.showAlert('Camera method call.', 'Information.');
        //EmployeeView.changePicture(employee);

        self.registerEvents();
        self.initializeStore();
        //self.showAlert('End device ready method.', 'Message');
        //this.homeTpl = Handlebars.compile($("#home-tpl").html());
        //this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    }

};

