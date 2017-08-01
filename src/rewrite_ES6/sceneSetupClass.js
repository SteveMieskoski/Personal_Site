export default class SceneSetupClass {
	constructor(THREEJS, cssContainerId, dataArray, dataObject) {
		this.Threejs = THREEJS;

		this.scene = new this.Threejs.Scene();
		this.sceneP = new this.Threejs.Scene();
		this.camera = this.CSSCamera();
		this.cameraP = this.WebglCamera();
		this.renderer = this.CSSRender(document.getElementById(cssContainerId));
		this.rendererP = this.WebglRenderer();
		this.lightH = this.hemisphereLight();
		this.lightD = this.directionalLight();
		this.objects = this.createTopElements (dataArray, this.scene);
		this.targets = this.topDesign(dataArray);
		this.pagePlane = this.createBackgroundPlane(dataArray, dataObject);

		return this;
	}

	CSSCamera(positionObject, fieldOfView, nearPlane, farPlane, aspectRatio, cameraOptions) {
		positionObject = positionObject ? positionObject : {x: 0, y: 0, z: 1000};
		cameraOptions = cameraOptions ? cameraOptions : undefined;
		if (!('z' in positionObject)) {
			{
				positionObject.z = 1000
			}
		}

		fieldOfView = fieldOfView ? fieldOfView : 40;
		nearPlane = nearPlane ? nearPlane : 1;
		farPlane = farPlane ? farPlane : 10000;
		aspectRatio = aspectRatio != undefined ? aspectRatio : window.innerWidth / window.innerHeight;
		let camera = new this.Threejs.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		camera.name = 'Top-Camera';
		camera.position.x = positionObject.x;
		camera.position.y = positionObject.y;
		camera.position.z = positionObject.z;

		return camera;
	}

	WebglCamera(fieldOfView, nearPlane, farPlane, HEIGHT, WIDTH, container, centerPosition, positionObject) {
		fieldOfView = fieldOfView ? fieldOfView : 2 * Math.atan(9 / ( 2 * 800 )) * ( 180 / Math.PI );
		let aspectRatio = (WIDTH && HEIGHT) ? WIDTH / HEIGHT : window.innerWidth / window.innerHeight;
		nearPlane = nearPlane ? nearPlane : 1;
		farPlane = farPlane ? farPlane : 10000;
		positionObject = positionObject ? positionObject : {x: 0, y: 0, z: 800};
		centerPosition = centerPosition ? centerPosition : {x: 0, y: 0, z: 0};
		if (!('z' in positionObject)) {
			{
				positionObject.z = 1000
			}
		}

		let camera = new this.Threejs.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		camera.name = 'Page-Camera';
		camera.position.z = positionObject.z ? positionObject.z : 1000;
		camera.lookAt(centerPosition.x, centerPosition.y, centerPosition.z);
		camera.focus = 1; //todo figure out why this value is ten when this literal setter is not present when it should be 1
		return camera;
	}

	CSSRender(attachTo) {
		let renderer;
		renderer = new this.Threejs.CSS3DRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.id = 'TopRendererDomEl';
		attachTo.appendChild(renderer.domElement);
		return renderer;
	}

	WebglRenderer() {
		let renderer = new this.Threejs.WebGLRenderer({alpha: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.id = 'WebGlRenderer';
		renderer.shadowMap.enabled = true;
		return renderer;
	}

	hemisphereLight(pageLightValues) {
		let hemisphereLight, pageLightVars;

		pageLightVars = pageLightValues || {
			hemisphereLight: {
				skyColor: 0xffffff,
				groundColor: 0xffffff,
				intensity: 0.5
			}
		};

		if (pageLightVars.hasOwnProperty('hemisphereLight')) {
			hemisphereLight = pageLightVars.hemisphereLight;
		}

		return new this.Threejs.HemisphereLight(
			hemisphereLight.skyColor,
			hemisphereLight.groundColor,
			hemisphereLight.intensity
		);


	}

	directionalLight(pageLightValues) {
		let pageLightVars, directionalLight, shadowLight;

		pageLightVars = pageLightValues || {
			directionalLight: {
				color: 0xffffff,
				intensity: 0.5,
				position: {x: -4050, y: 2000, z: 3000},
				shadow: {
					castShadow: true,
					left: -400,
					right: 400,
					top: 400,
					bottom: -400,
					near: 1,
					far: 1000,
					mapWidth: 2048,
					mapHeight: 2048
				}
			}
		};

		if (pageLightVars.hasOwnProperty('directionalLight')) {
			directionalLight = pageLightVars.directionalLight;
		}

		shadowLight = new this.Threejs.DirectionalLight(
			directionalLight.color,
			directionalLight.intensity
		);
		shadowLight.position.set(
			directionalLight.position.x,
			directionalLight.position.y,
			directionalLight.position.z
		);
		shadowLight.castShadow = directionalLight.shadow.castShadow;
		shadowLight.shadow.camera.left = directionalLight.shadow.left;
		shadowLight.shadow.camera.right = directionalLight.shadow.right;
		shadowLight.shadow.camera.top = directionalLight.shadow.top;
		shadowLight.shadow.camera.bottom = directionalLight.shadow.bottom;
		shadowLight.shadow.camera.near = directionalLight.shadow.near;
		shadowLight.shadow.camera.far = directionalLight.shadow.far;
		shadowLight.shadow.mapSize.width = directionalLight.shadow.mapWidth;
		shadowLight.shadow.mapSize.height = directionalLight.shadow.mapHeight;

		return shadowLight;
	}

	createTopElements (dataArray, scene) {
		let i, element, object, objects = [];

		for (i = 0; i < dataArray.length; i++) {

			element = this.createPanel(dataArray[i]);

			object = new this.Threejs.CSS3DObject(element);
			object.position.x = Math.random() * 4000 - 2000;
			object.position.y = Math.random() * 4000 - 2000;
			object.position.z = Math.random() * 1000 + 3000;
			object.name = dataArray[i].id;
			scene.add(object);

			objects.push(object);
		}
		return objects;
	}

	createPanel (data) {
		let element, number, icon, symbol, details;

		element = document.createElement('div');
		element.className = 'element';
		element.id = data.id;
		element.style.backgroundColor = 'rgba(37, 81, 118,' + (Math.random() * 0.25 + 0.50) + ')';

		number = document.createElement('div');
		icon = document.createElement('i');
		icon.className = 'material-icons';
		icon.style.cssText = 'font-size: 40px; ';
		icon.textContent = data.icon;
		icon.id = 'i' + data.id;
		number.appendChild(icon);
		number.className = 'image';
		element.appendChild(number);

		symbol = document.createElement('div');
		symbol.className = 'heading';
		symbol.textContent = data.title;
		symbol.id = 'h' + data.id;
		element.appendChild(symbol);

		details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = data.caption;
		details.id = 'c' + data.id;
		element.appendChild(details);

		return element;
	}

	topDesign (dataArray) {
		let targets = {};
		targets.table = this.tableDesign(dataArray);
		targets.helix = this.helixDesign(dataArray);
		targets.grid = this.gridDesign(dataArray);
		targets.sphere = this.sphereDesign(dataArray);
		targets.column = this.columnDesign(dataArray);

		return targets;
	}

	tableDesign (data) {
		let i, object;
		let tableTarget = [];

		for (i = 0; i < data.length; i++) {
			object = new this.Threejs.Object3D();
			object.position.x = (data[i].col * 220) - 380;
			object.position.y = -(data[i].row * 176) + 360;
			tableTarget.push(object);
		}
		return tableTarget;
	}

	sphereDesign (data) {
		let i, l, phi, theta, object, vector;
		let sphereTarget = [];

		vector = new this.Threejs.Vector3();

		for (i = 0, l = data.length; i < l; i++) {
			phi = Math.acos(-1 + (2 * i) / l);
			theta = Math.sqrt(l * Math.PI) * phi;
			object = new this.Threejs.Object3D();
			object.position.x = 300 * Math.cos(theta) * Math.sin(phi);
			object.position.y = 300 * Math.sin(theta) * Math.sin(phi);
			object.position.z = 300 * Math.cos(phi);
			vector.copy(object.position).multiplyScalar(50);
			object.lookAt(vector);
			sphereTarget.push(object);
		}
		return sphereTarget;
	}

	helixDesign (data) {
		let i, l, phi, object, vector;
		let helixTarget = [];

		vector = new this.Threejs.Vector3();

		for (i = 0, l = data.length; i < l; i++) {
			phi = i * 0.8 + Math.PI;  // controls spacing between elements
			object = new this.Threejs.Object3D();
			object.position.x = 450 * Math.sin(phi);
			object.position.y = -(i * 100) + 450;  // use i multiple to control height along helix
			object.position.z = 450 * Math.cos(phi);
			vector.x = object.position.x * 2;
			vector.y = object.position.y;
			vector.z = object.position.z * 2;
			object.lookAt(vector);
			helixTarget.push(object);

		}
		return helixTarget;
	}

	gridDesign (data) {
		let i, object;
		let gridTarget = [];

		for (i = 0; i < data.length; i++) {
			object = new this.Threejs.Object3D();
			object.position.x = ((i % 3) * 350) - 300;
			object.position.y = ( -(Math.floor(i / 3) % 3) * 300) + 225;
			object.position.z = (Math.floor(i / 4)) * -1200;
			gridTarget.push(object);
		}
		return gridTarget;
	}

	columnDesign (data) {
		let i, object;
		let columnTarget = [];

		for (i = 0; i < data.length; i++) {
			object = new this.Threejs.Object3D();
			object.position.x = 0;
			object.position.y = i * 200 - 1000;
			object.position.z = -2000;
			columnTarget.push(object);
		}
		return columnTarget;
	}

	createBackgroundPlane (dataArray, dataObject) {
		let	PlaneObjects = [];

		for (var j = 0; j < dataArray.length; j++) {
			this.mesh2 = new this.Threejs.Object3D();
			for (var i = 0; i < 2; i++) {
				var geom = new this.Threejs.PlaneGeometry(820, 650, 1, 1);
				var material = new this.Threejs.MeshPhongMaterial({  //using phong material broke for selections after first. changed to using this instead.
					color: dataObject[j].color,
					specular: dataObject[j].color,
					reflectivity: 30,
					transparent: true,
					opacity: 0.3
				});
				var bkgndItem = new this.Threejs.Mesh(geom, material);
				bkgndItem.position.set(0, 0, 0);
				bkgndItem.rotation.set(0, -0.2, 0);
				bkgndItem.name = dataObject[j].name;
				this.mesh2.name = dataObject[j].name;
				this.mesh2.add(bkgndItem);
			}
			PlaneObjects.push(this.mesh2);
		}
		return PlaneObjects;
	}

}

















