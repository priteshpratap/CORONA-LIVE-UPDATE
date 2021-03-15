/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"CORONA-LIVE-UPDATE/CORONA-LIVE-UPDATE/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});