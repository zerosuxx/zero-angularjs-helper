angular.module('zerosuxx.zeroNgHelper') 
.service('EventDispatcher', function EventDispatcher() {
    this.dispatch = function(name, data) {
        var evt = document.createEvent('Event');  
        evt.data = data;
        evt.initEvent(name, false, false);  
        window.dispatchEvent(evt);
        return evt;
    };
});


