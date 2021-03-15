sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"../model/formatter",
	"sap/ui/core/syncStyleClass",
	"sap/m/MessageBox"
], function (Controller, Filter, format, syncStyleClass,MessageBox) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S3", {
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
				url: "https://raw.githubusercontent.com/datameet/covid19/master/data/mohfw.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			this.getView().setModel(oModel, "odataIndia");

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
			var oModel4 = new sap.ui.model.json.JSONModel();
			var aData3 = jQuery.ajax({
				type: "GET",
				url: "https://api.covid19india.org/data.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel3.setData(data);

					oModel4.setData({
						"Result1": data.statewise[0].confirmed,
						"Result2": data.statewise[0].deaths,
						"Result3": data.statewise[0].recovered,
						"Result4": data.statewise[0].deltadeaths
						
					});
					oBusyInd.close();
				}
			});
			this.getView().setModel(oModel3, "odataTab");
			this.getView().setModel(oModel4, "odataTile");

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
		},
		onColNav:function(evt){
			var oState = evt.getSource().mAggregations.cells[0].mProperties.title;
			var oLocalModel = new sap.ui.model.json.JSONModel();
	          oLocalModel.setData(oState);
	          sap.ui.getCore().setModel(oLocalModel,"stateName");
	          if(sap.ui.getCore().getModel("stateName").oData =="Total"){
	          	MessageBox.information("Please select district!", {
				styleClass: "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer"
			});
			returns;
	          }
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S6",{
				oState:oState
			});
		}

	});

});

