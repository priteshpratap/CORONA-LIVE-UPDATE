sap.ui.define(["sap/ui/model/json/JSONModel", 
"sap/ui/Device"], 
function (e, r) {
	"use strict";
	return {
		deaths: function (e) {
			if (e > 1e3) {
				return "Error"
			} else if (e < 1e3 && e > 1) {
				return "Warning"
			} else {
				return "None"
			}
		},
		oDeaths: function (e) {
			return sap.ui.core.ValueState.Error
		},
		state: function (e) {
			if (e === "an") {
				return "Andaman and Nicobar Islands"
			} else if (e === "ap") {
				return "Andhra Pradesh"
			} else if (e === "ad") {
				return "Andhra Pradesh (New) "
			} else if (e === "ar") {
				return "Arunachal Pradesh "
			} else if (e === "as") {
				return "Assam"
			} else if (e === "br") {
				return "Bihar"
			} else if (e === "ch") {
				return "Chandigarh"
			} else if (e === "ct") {
				return "Chattisgarh"
			} else if (e === "dn") {
				return "Dadra and Nagar Haveli "
			} else if (e === "dd") {
				return "Daman and Diu"
			} else if (e === "dl") {
				return "Delhi"
			} else if (e === "ga") {
				return "Goa"
			} else if (e === "gj") {
				return "Gujarat"
			} else if (e === "hr") {
				return "Haryana"
			} else if (e === "hp") {
				return "Himachal Pradesh "
			} else if (e === "jk") {
				return "Jammu and Kashmir"
			} else if (e === "jh") {
				return "Jharkhand "
			} else if (e === "ka") {
				return "Karnataka"
			} else if (e === "kl") {
				return "Kerala"
			} else if (e === "ld") {
				return "Lakshadweep Islands"
			} else if (e === "mp") {
				return "Madhya Pradesh"
			} else if (e === "mh") {
				return "Maharashtra"
			} else if (e === "mn") {
				return "Manipur"
			} else if (e === "me") {
				return "Meghalaya"
			} else if (e === "mz") {
				return "Mizoram"
			} else if (e === "nl") {
				return "Nagaland"
			} else if (e === "or") {
				return "Odisha"
			} else if (e === "py") {
				return "Pondicherry"
			} else if (e === "pb") {
				return "Punjab"
			} else if (e === "rj") {
				return "Rajasthan"
			} else if (e === "sk") {
				return "Sikkim"
			} else if (e === "tn") {
				return "Tamil Nadu"
			} else if (e === "tg") {
				return "Telangana"
			} else if (e === "tr") {
				return "Tripura"
			} else if (e === "up") {
				return "Uttar Pradesh"
			} else if (e === "ut") {
				return "Uttarakhand"
			} else if (e === "wb") {
				return "West Bengal"
			} else if (e === "la") {
				return "Ladakh"
			}
		}
	}
});