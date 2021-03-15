sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/syncStyleClass"
], function (Controller, syncStyleClass) {
	"use strict";

	return Controller.extend("CORONA-LIVE-UPDATE.controller.S1", {
		onInit: function () {

			var oBusyInd = new sap.m.BusyDialog({
				text: "Loading..."
			});
			oBusyInd.open();
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var date = new Date();
			var todayDate = date.toLocaleDateString()
			var oText = this.getView().byId("idText");
			var oText2 = this.getView().byId("idText2");
			oText.setText(todayDate);
			oText2.setText(todayDate);
		/*	var oCarosel = this.getView().byId("idCrosel");
			oCarosel.attachPageChanged(setTimeout(function () {
				oCarosel.next();
			}, 1200));*/

			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "https://coronavirus-19-api.herokuapp.com/all",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel.setData(data);
				}
			});
			this.getView().setModel(oModel, "oAll");

			var oModel2 = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				url: "https://api.covid19india.org/data.json",
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					oModel2.setData({
						"Result1": data.statewise[0].confirmed,
						"Result2": data.statewise[0].deaths,
						"Result3": data.statewise[0].recovered,
						"Result4": data.statewise[0].deltadeaths,
						"Result5": data.statewise[0].active

					});
					oBusyInd.close();
				}
			});

			this.getView().setModel(oModel2, "odataIndiaTotal");

		},
		onAcrossGlobe: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S2");
		},
		onNavToIndia: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S3");
		},
		onNavToUsa: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S4");
		},
		onNavToItaly: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("S5");
		},
		onImg1Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/socialdistancingEnglish.pdf", true);
		},
		onImg2Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_ENg.pdf", true);
		},
		onImg3Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/ProtectivemeasuresEng.pdf", true);
		},
		onImg4Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/PostrerEnglishtraveller.pdf", true);
		},
		onImg5Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/Mask-Eng.pdf", true);
		},
		onImg6Press: function () {
			sap.m.URLHelper.redirect("https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf", true);
		},
		onPageChange: function () {/*
			var oCarosel = this.getView().byId("idCrosel")
			setTimeout(function () {
				oCarosel.next();
			}, 2500);
		*/}
			
			
			
		
	});

});