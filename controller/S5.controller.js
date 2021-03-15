sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/syncStyleClass",
	"sap/ui/model/Filter"
], function (Controller, syncStyleClass, Filter) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S5", {
		onInit: function () {

			var oBusyInd = new sap.m.BusyDialog({
				text: "Loading..."
			});
			oBusyInd.open();
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				url: "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel.setData(data);
					
				}
			});
			this.getView().setModel(oModel, "allData");

			var oModel2 = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				url: "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel2.setData(data);
                    oBusyInd.close();
				}
			});
			this.getView().setModel(oModel2, "allItaly");
			
		},
		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S1");
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
		},

		onSearch: function (e) {
			var i = [];
			var t = e.getSource().getValue();
			if (t && t.length > 0) {
				var r = new Filter("denominazione_regione", sap.ui.model.FilterOperator.Contains, t);
				i.push(r)
			}
			var a = this.byId("idProductsTable");
			var n = a.getBinding("items");
			n.filter(i, "Application")
		}

	});

});