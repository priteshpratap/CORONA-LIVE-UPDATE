sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"../model/formatter",
	"sap/ui/core/syncStyleClass"
], function (Controller, Filter, format, syncStyleClass) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S4", {
		formatter: format,
		onInit: function () {

			var oBusyInd = new sap.m.BusyDialog({
				text: "Loading..."
			});
			oBusyInd.open();
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				url: "https://covidtracking.com/api/us.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			this.getView().setModel(oModel, "allData");

			var oModel2 = new sap.ui.model.json.JSONModel();
			var aData2 = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "https://coronavirus-19-api.herokuapp.com/countries/india",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel2.setData(data);
				}
			});
			this.getView().setModel(oModel2, "odataIndiaTotal");

			var oModel3 = new sap.ui.model.json.JSONModel();
			var aData3 = jQuery.ajax({
				type: "GET",
				url: "https://covidtracking.com/api/states.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel3.setData(data);
                    oBusyInd.close();
				}
			});
			this.getView().setModel(oModel3, "allState");
			

		},
		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S1");
		},

		onSearch: function (e) {
			var i = [];
			var t = e.getSource().getValue();
			if (t && t.length > 0) {
				var r = new Filter("state", sap.ui.model.FilterOperator.Contains, t);
				i.push(r)
			}
			var a = this.byId("idProductsTable");
			var n = a.getBinding("items");
			n.filter(i, "Application")
		},

		_searchBySpeech: function (e) {

			var t = this.getView().byId("btnSpeech");
			var i = this.getView().byId("txtSearch");
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