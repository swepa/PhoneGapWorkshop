/**
 * Created by Asim on 2013-10-25.
 */
var EmployeeView = function(employee){

    this.initialize = function(){
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function(){
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        //console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
            },
            function(error) {
                //alert('Error getting location');
                app.showAlert(error.code + ': ' + error.message, 'Error')
            },{maximumAge: Infinity, timeout: 10000, enableHighAccuracy:false});
        return false;
    };

    this.addToContacts = function(event){
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: employee.firstName, familyName: employee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        app.showAlert("Selected contact has been added in Phone Contact", "Information");
        return false;
    };

    this.changePicture = function(event){
        app.showAlert("Method Called.", "Information");

        event.preventDefault();
        console.log('changePicture');

        app.showAlert("Checking for Camera API.", "Information");

        if (!navigator.camera){
            app.showAlert("Camera API is not available.", "Error");
            return;
        }

        app.showAlert("Camera ready, checking options.", "Information");

        var options ={ quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        app.showAlert("Going to call method.", "Information");
        navigator.camera.getPicture(
            function(imageData){
                app.showAlert("Successful.", "Information");
                $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
            },
            function (error){
                app.showAlert(error, 'Error');
                //app.showAlert('Error taking picture', 'Error');
            },
            options);
        return false;
    };

    this.initialize();
}

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());
