

export default class urlHandler{
	constructor(dataObject, dataReverseIds){
		this.reverseIds = dataReverseIds;
		this.dataObject = dataObject;
	}

	checkNavState (keepId) {
		let sessionHistory, locationListArray, addNewItem, stateObj;

		sessionHistory = window.sessionStorage.getItem('locationList');
		locationListArray = JSON.parse(sessionHistory);

		if (keepId < 9000) {
			let locaction = this.dataObject[this.reverseIds[Number(keepId)]].loc;
			addNewItem = locationListArray.concat([locaction]);
			window.sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

			stateObj = {location: locaction};
			history.pushState(stateObj, locaction, '?' + locaction);

		} else {

			addNewItem = locationListArray.concat(['MainPage']);
			window.sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

			stateObj = {location: 'MainPage'};
			history.pushState(stateObj, 'Steve Mieskoski Profile Home', '?MainPage');
		}
	}

	checkInitUrl (locationSubstring, callBack) {

		let sessionStorageInit = JSON.stringify([locationSubstring]);
		window.sessionStorage.setItem('locationList', sessionStorageInit);

		if (locationSubstring in this.reverseIds) {
			if (this.reverseIds[locationSubstring] < 100) {

				callBack(this.reverseIds[locationSubstring]);
			}
		}
	}

	handleBackForward (callBackPage, callBackMain) {
		let beginningLocation;
		
		

		window.addEventListener('popstate', function () {
			let sessionHistory, locationListArray, historyItem;
			sessionHistory = window.sessionStorage.getItem('locationList');
			locationListArray = JSON.parse(sessionHistory);

			if (locationListArray.length > 1) {
				locationListArray.pop();
				historyItem = locationListArray[locationListArray.length - 1];
				locationListArray.pop();

				if (locationListArray.length === 0) {
					beginningLocation = true;
				} else {
					beginningLocation = false;
				}

				window.sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
			} else {
				historyItem = locationListArray[0];
				beginningLocation = true;
				window.sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
			}

			if (historyItem !== 'MainPage') {
				callBackPage(this.reverseIds[historyItem], beginningLocation);
			} else {
				callBackMain();
			}

		});
	}
};