

//It is a good practice to initiate all variables first so we can reach them from anywhere in the code
//Sometimes we need to modify a variable from different functions 
//The keyword "let" allows us to declare a variable tht is not already declared , it will throw an error if 
//another variable with the same name is declared earlier , we do this to avoid setting a variable that we dont know
//that it is already declared
let textureDir = "Content/textures/"
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
let renderer = new THREE.WebGLRenderer();
let controls = new THREE.OrbitControls(camera);
let textureLoader = new THREE.TextureLoader();
let loadedTextures = [];

//classes 
class Player {
    constructor() {
        this.speed = 0;
        this.name = null;
        this.health = null;
        this.object3D = null;
        this._positionx = 0;
        this._positiony = 0;
        this._positionz = 0;
        this.moving = { forward: false, backward: false, right: false, left: false }
        this._controllerEventKeyDown = (e) => {

            switch (e.key) {
                case "w":
                    if (this.moving.forward) {
                        return
                    }
                    this.moving.forward = true;
                    this.moveForward(this.moving);
                    break;
                case "a":
                    if (this.moving.left) {
                        return
                    }
                    this.moving.left = true;
                    this.moveLeft(this.moving);
                    break;
                case "s":
                    if (this.moving.backward) {
                        return
                    }
                    this.moving.backward = true;
                    this.moveBackward(this.moving);
                    break;
                case "d":
                    if (this.moving.right) {
                        return
                    }
                    this.moving.right = true;
                    this.moveRight(this.moving);
                    break;
                default:
            }
        };
        this._controllerEventKeyUp = (e) => {

            switch (e.key) {
                case "w":
                    this.moving.forward = false;

                    break;
                case "a":
                    this.moving.left = false;
                    break;
                case "s":
                    this.moving.backward = false;
                    break;
                case "d":
                    this.moving.right = false;
                    break;
                default:
            }
        };
        Object.seal(this);
    }
    get positionx() {
        return this._positionx;
    }
    set positionx(value) {
        if (typeof value !== "number") {
            console.warn('position must be a number');
            return;
        }
        if (this.object3D != null) {
            this.object3D.position.x = value;
        }
        this._positionx = value;
    }

    get positiony() {
        return this._positiony;
    }
    set positiony(value) {
        if (typeof value !== "number") {
            console.warn('position must be a number');
            return;
        }
        if (this.object3D != null) {
            this.object3D.position.y = value;
        }
        this._positiony = value;
    }

    get positionz() {
        return this._positionz;
    }
    set positionz(value) {
        if (typeof value !== "number") {
            console.warn('position must be a number');
            return;
        }
        if (this.object3D != null) {
            this.object3D.position.z = value;
        }
        this._positionz = value;
    }

    create3dObject() {
        //creating two "legs" for the body no scene add
        var legGeo = new THREE.CylinderGeometry(2, 2, 20);
        var legMat = new THREE.MeshPhongMaterial({ color: 0xb52b6b });
        var leftLeg = new THREE.Mesh(legGeo, legMat);
        var rightLeg = new THREE.Mesh(legGeo, legMat);

        //creating the body it self as a sphere no scene add
        var theBodyGeo = new THREE.SphereGeometry(6);
        var theBodyMat = new THREE.MeshPhongMaterial({ map: getTexture("sea.jpg") });
        var theBody = new THREE.Mesh(theBodyGeo, theBodyMat);



        //attaching the legs positions to the body's position
        leftLeg.position.y = theBody.position.y - 10;
        rightLeg.position.y = theBody.position.y - 10;
        leftLeg.position.x = theBody.position.x + 4;
        rightLeg.position.x = theBody.position.x - 4;


        //grouping the body
        var player = new THREE.Group();
        player.add(theBody);
        player.add(leftLeg);
        player.add(rightLeg);

        this.object3D = player;
    }

    moveForward(moving) {

        if (this.object3D == null) {
            return;
        }

        setTimeout(() => {
            if (this.moving.forward) {
                this.moveForward();
            }
        }, 15);
        this.object3D.translateZ(this.speed);
        this._positionx = this.object3D.position.x;
        this._positionz = this.object3D.position.z;
    }
    moveBackward(moving) {
        if (this.object3D == null) {
            return;
        }

        setTimeout(() => {
            if (this.moving.backward) {
                this.moveBackward();
            }
        }, 15);
        this.object3D.translateZ(-this.speed);
        this._positionx = this.object3D.position.x;
        this._positionz = this.object3D.position.z;
    }
    moveRight(moving) {
        if (this.object3D == null) {
            return;
        }

        setTimeout(() => {
            if (this.moving.right) {
                this.moveRight();
            }
        }, 15);
        this.object3D.translateX(this.speed);
        this._positionx = this.object3D.position.x;
        this._positionz = this.object3D.position.z;
    }
    moveLeft(moving) {
        if (this.object3D == null) {
            return;
        }

        setTimeout(() => {
            if (this.moving.left) {
                this.moveLeft();
            }
        }, 15);
        this.object3D.translateX(-this.speed);
        this._positionx = this.object3D.position.x;
        this._positionz = this.object3D.position.z;
    }
    createControllers() {

        window.addEventListener('keydown', this._controllerEventKeyDown);
        window.addEventListener('keyup', this._controllerEventKeyUp);
    }
    destroyController() {
        window.removeEventListener('keydown', this._controllerEventKeyDown);
        window.removeEventListener('keyup', this._controllerEventKeyUp);

    }

}
//endclasses

function getTexture(name) {
    var url = textureDir + name;
    var exist = loadedTextures.map((item) => { return item.url }).indexOf(url) > -1;
    if (exist) {
        var texture = loadedTextures.filter((item) => { return item.url == url })[0].texture;
        return texture;
    }
    else {
        var obj = { url: url, texture: textureLoader.load(url) };
        loadedTextures.push(obj);
        return obj.texture;
    }
}

function toRadiant(degrees) {
    if (typeof degrees !== "number") {
        console.warn("the degrees is not a number");
        return;
    }
    return Math.PI / 180 * degrees;
}


function setup3D(container) {
    container = typeof container == "undefined" ? document.body : container;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#eee");
    container.appendChild(renderer.domElement);

    camera.position.y = 1005;
    camera.rotation.set(0, 0, toRadiant(90));
    controls.update();


    //final stage updating the animation frames
    var animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

}

function letThereBeLight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

}

function init() {

    setup3D();
    letThereBeLight();

    //creating plane for ground ,rotating it and adding to the scene
    var planeGeo = new THREE.PlaneGeometry(1000, 1000);

    var material = new THREE.MeshPhongMaterial({ map: getTexture("sea.jpg") });
    //textureLoader.load(textureDir + "sea.jpg", (texture) => { material.map = texture; material.needsUpdate = true }, );
    var plane = new THREE.Mesh(planeGeo, material);
    plane.rotateX(toRadiant(-90));
    scene.add(plane);

    //creating box for ground , rotating it and adding to the scene
    var boxGeo = new THREE.BoxGeometry(10, 100, 100);
    var boxMat = new THREE.MeshPhongMaterial({ map: getTexture("wood.jpg") });
    var groundBox = new THREE.Mesh(boxGeo, boxMat);
    groundBox.rotateZ(toRadiant(90));
    scene.add(groundBox);

    var player = new Player();
    player.create3dObject();
    player.positiony = 35;
    player.speed = 5;
    player.createControllers();
    scene.add(player.object3D);


}

init();

