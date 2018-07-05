angular.module('zerosuxx.zeroNgHelper') 
.provider('$templateUrl', function $templateUrlProvider() {
    this.templateDir = 'templates';
    this.suffix = '';

    this.$get = function() {
        return this;
    };

    this.setTemplateDir = function(dir) {
        this.templateDir = dir;
    };

    this.setSuffix = function(suffix) {
        this.suffix = suffix;
    };

    this.get = function(templateData) {
        var data = {
            templateName: 'index',
            ext: 'html'
        };
        if(angular.isArray(templateData)) {
            data.dir = templateData[0];
            if(templateData[1]) {
                data.templateName = templateData[1];
            }
            if(templateData[2]) {
                data.ext = templateData[2];
            }
        } else {
            angular.extend(data, templateData);
        }
        var templateFile = this.templateDir + '/' + data.dir + '/' + data.templateName + '.' + data.ext + this.suffix;
        return templateFile;
    };

    this.getElement = function(templateName, ext) {
        return this.get(['_elements', templateName, ext]);
    };
	
	this.getTemplate = function(dir, templateName, ext) {
        return this.get([dir, templateName, ext]);
    };
});
