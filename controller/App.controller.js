sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.App", {

		onInit: function () {
         this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}

	});

});

