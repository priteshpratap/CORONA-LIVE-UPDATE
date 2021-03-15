/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"CORONA-LIVE-UPDATE/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});