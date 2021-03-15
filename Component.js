sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"CORONA-LIVE-UPDATE/model/models",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models,JSONModel) {
	"use strict";

	return UIComponent.extend("CORONA-LIVE-UPDATE.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			
		},
		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});