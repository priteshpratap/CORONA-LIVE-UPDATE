sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/core/syncStyleClass"
], function (Controller, Filter, syncStyleClass) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S2", {
		onInit: function () {
			var oBusyInd = new sap.m.BusyDialog({
				text: "Loading..."
			});
			oBusyInd.open();
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

	          /*var oDataoModel = new sap.ui.model.odata.v2.ODataModel({
				json: true
			});
			var sPath = "https://coronavirus-19-api.herokuapp.com/countries";
			var oDataoModel = new sap.ui.model.odata.v2.ODataModel();
			oDataoModel.read(sPath, null, null, false, function (
				oResult) {
				oModel.oData.selection.nameTexts.O5 = oResult.O5;
			});
*/
			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "https://coronavirus-19-api.herokuapp.com/countries",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			this.getView().setModel(oModel, "allCountries");

			var oModel2 = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "https://coronavirus-19-api.herokuapp.com/all",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel2.setData(data);
					oBusyInd.close();
				}
			});
			this.getView().setModel(oModel2, "oAll");

		},
		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S1");
		},

		onSearch: function (e) {
			var i = [];
			var t = e.getSource().getValue();
			if (t && t.length > 0) {
				var r = new Filter("country", sap.ui.model.FilterOperator.Contains, t);
				i.push(r)
			}
			var a = this.byId("idProductsTable");
			var n = a.getBinding("items");
			n.filter(i, "Application")
		},
		_searchBySpeech: function (e) {

			var t = this.getView().byId("btnSpeechS2");
			var i = this.getView().byId("txtSearchS2");
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
		}
	});

});