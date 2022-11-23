
let scene, camera, renderer, controls;




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
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 10, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //fixed axes
    let axes_f = new THREE.AxesHelper(20);
    axes_f.setColors("red","green","blue");
    scene.add(axes_f);

    //object(box)
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(3,5,7),
        new THREE.MeshLambertMaterial({color : 0xdddddd})
    )
    box.matrixAutoUpdate = false;
    scene.add(box)
    console.log(box)


    //gui 생성
    let guicontrols = new function(){
        this.Euler1 = 0;
        this.Euler2 = 0;
        this.Euler3 = 0;
    }
    let gui = new dat.GUI();
    gui.add(guicontrols, "Euler1", -2 * Math.PI, 2 * Math.PI);
    gui.add(guicontrols, "Euler2", -2 * Math.PI, 2 * Math.PI);
    gui.add(guicontrols, "Euler3", -2 * Math.PI, 2 * Math.PI);

    function renderScene(){
        box.matrix = new THREE.Matrix4().makeRotationX(guicontrols.Euler3).multiply(
            new THREE.Matrix4().makeRotationY(guicontrols.Euler2).multiply(
                new THREE.Matrix4().makeRotationX(guicontrols.Euler1).multiply(
                    new THREE.Matrix4().makeTranslation(1.5, 2.5, 3.5)
                )
            )
        );
        controls.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene()
}


window.onload = init;