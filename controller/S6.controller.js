sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/syncStyleClass",
	"sap/ui/model/Filter"
], function (Controller, syncStyleClass, Filter) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S6", {

		onInit: function () {
			this.oInitialLoadFinishedDeferred = jQuery.Deferred();
			this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S1");
		},
		_searchBySpeech: function (e) {

			var t = this.getView().byId("btnSpeechS6");
			var i = this.getView().byId("txtSearchS6");
			if (window.hasOwnProperty("webkitSpeechRecognition")) {
				var a = new webkitSpeechRecognition;
				a.continuous = false;
				a.interimResults = false;
				a.lang = "en-US";
				a.start();
				t.setBusy(true);
				a.onresult = function (e) {
					var o = e.results[0][0].transcript;
					i.setValue(o);
					a.stop();
					t.setBusy(false);
					i.fireLiveChange()
				};
				a.onerror = function (e) {
					a.stop();
					i.fireLiveChange()
				}
			}
		},

		onSearch: function (e) {
			var i = [];
			var t = e.getSource().getValue();
			if (t && t.length > 0) {
				var r = new Filter("district", sap.ui.model.FilterOperator.Contains, t);
				i.push(r)
			}
			var a = this.byId("idProductsTable");
			var n = a.getBinding("items");
			n.filter(i, "Application")
		},

		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S3");
		},
		onRouteMatched: function (oEvent) {
			//this.asdfg = this;
			var oParameters = oEvent.getParameter("arguments");
			this.fnGetState();
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		fnGetState: function () {
			var oBusyInd = new sap.m.BusyDialog({
				text: "Loading..."
			});
			oBusyInd.open();
			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				url: "https://api.covid19india.org/v2/state_district_wise.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					var oState = sap.ui.getCore().getModel("stateName").oData;
					for (var i = 0; i < data.length; i++) {
						if (data[i].state == oState) {
							oModel.setData({
								"Result": data[i].districtData
							});
							oBusyInd.close();
							break;
						}
					}

				}
			});
			this.getView().setModel(oModel, "IndiaDistrict");
		}

	});

});