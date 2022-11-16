
let scene, camera, renderer;




function init(){
    window.addEventListener("resize", onResize, false);
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 10, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //fixed axes
    let axes_f = new THREE.AxesHelper(20);
    axes_f.setColors("black","black","black");
    scene.add(axes_f);

    //rotated axes
    let axes_r = new THREE.AxesHelper(20);
    axes_r.setColors("red","red","red");
    scene.add(axes_r);

    //object(box)
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(3,5,7),
        new THREE.MeshLambertMaterial({color : 0xdddddd})
    )
    box.position.x = 1.5;
    box.position.y = 2.5;
    box.position.z = 3.5;
    box.castShadow = true;
    scene.add(box)

    //gui 생성
    let controls = new function(){
        this.EulerX = 0;
        this.EulerY = 0;
        this.EulerZ = 0;
    }
    let gui = new dat.GUI();
    gui.add(controls, "EulerX", -2 * Math.PI, 2 * Math.PI);
    gui.add(controls, "EulerY", -2 * Math.PI, 2 * Math.PI);
    gui.add(controls, "EulerZ", -2 * Math.PI, 2 * Math.PI);

    function renderScene(){
        box.rotation.set(controls.EulerX,controls.EulerY,controls.EulerZ)
        axes_r.rotation.set(controls.EulerX,controls.EulerY,controls.EulerZ);
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene()
}


window.onload = init;