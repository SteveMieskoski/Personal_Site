

export default class UrlHandler{
	constructor(dataObject, dataReverseIds){
		this.reverseIds = dataReverseIds;
		this.dataObject = dataObject;
	}

	checkNavState (keepId) {
		let sessionHistory, locationListArray, addNewItem, stateObj;

		sessionHistory = window.sessionStorage.getItem('locationList');
		locationListArray = JSON.parse(sessionHistory);
		console.log(this.dataObject);
		if (keepId < 9000) {
			let location = this.dataObject[Number(keepId)].loc;
			addNewItem = locationListArray.concat([location]);
			window.sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

			stateObj = {location: location};
			history.pushState(stateObj, location, '?' + location);

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
			} else {
				callBack('MainPage')
			}
		}
	}

	handleBackForward (callBackPage, callBackMain) {
		let beginningLocation;
		
		let BackForwardListener = () => {
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
				console.log('history item', historyItem);
			if (historyItem !== 'MainPage') {
				callBackPage(this.reverseIds[historyItem], beginningLocation);
			} else {
				console.log('callback main');
				callBackMain();
			}

		};

		window.addEventListener('popstate', BackForwardListener);
	}
};