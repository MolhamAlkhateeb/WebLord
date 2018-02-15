

//It is a good practice to initiate all variables first so we can reach them from anywhere in the code
//Sometimes we need to modify a variable from different functions 
//The keyword "let" allows us to declare a variable tht is not already declared , it will throw an error if 
//another variable with the same name is declared earlier , we do this to avoid setting a variable that we dont know
//that it is already declared

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
let renderer = new THREE.WebGLRenderer();
let controls = new THREE.OrbitControls(camera);



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
    var material = new THREE.MeshPhongMaterial({ color: 0x40a4df });
    var plane = new THREE.Mesh(planeGeo, material);
    plane.rotateX(toRadiant(-90));
    scene.add(plane);

    //creating box for ground , rotating it and adding to the scene
    var boxGeo = new THREE.BoxGeometry(10, 100, 100);
    var boxMat = new THREE.MeshPhongMaterial({ color: 0xff00000 });
    var groundBox = new THREE.Mesh(boxGeo, boxMat);
    groundBox.rotateZ(toRadiant(90));
    scene.add(groundBox);

    //creating two "legs" for the body no scene add
    var legGeo = new THREE.CylinderGeometry(2, 2, 20);
    var legMat = new THREE.MeshPhongMaterial({ color: 0xb52b6b });
    var leftLeg = new THREE.Mesh(legGeo, legMat);
    var rightLeg = new THREE.Mesh(legGeo, legMat);

    //creating the body it self as a sphere no scene add
    var theBodyGeo = new THREE.SphereGeometry(6);
    var theBodyMat = new THREE.MeshPhongMaterial({ color: 0x4286f4 });
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
    player.position.y = 35;

    //adding the player group to the scene
    scene.add(player);


}

init();

