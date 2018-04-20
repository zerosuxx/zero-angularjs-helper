angular.module('zerosuxx.ngApp')
.service('StorageService', function StorageService() {
    this.storage = localStorage;

    this.get = function(key) {
        return this.storage.getItem(key);
    };

    this.getUnSerialized = function(key) {
        var value = this.get(key);
        return value ? JSON.parse(this.get(key)) : null;
    };

    this.consume = function(key) {
        var value = this.get(key);
        this.remove(key);
        return value;
    };

    this.getKey = function(index) {
        return this.storage.key(index);
    };

    this.set = function(key, value) {
        return this.storage.setItem(key, value);
    };

    this.setSerialized = function(key, value) {
        return this.set(key, JSON.stringify(value));
    };

    this.remove = function(key) {
        return this.storage.removeItem(key);
    };

    this.count = function() {
        return this.storage.length;
    };

    this.length = function() {
        return this.count();
    };

    this.getStorage = function(storage) {
        return this.storage;
    };

    this.setStorage = function(storage) {
        this.storage = storage;
        return this;
    };
});
