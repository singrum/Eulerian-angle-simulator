
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
    
    camera.position.x = 10;
    camera.position.y = 10;
    camera.position.z = 10;
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
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshLambertMaterial({color : 0xdddddd})
    )
    box.matrixAutoUpdate = false;
    scene.add(box)
    console.log(box)


    //gui 생성

    const gui = new dat.GUI();
    const posFolder = gui.addFolder('Position');
    const lenFolder = gui.addFolder('Length');
    const rotFolder = gui.addFolder('Rotation');


    let pos = new function(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    posFolder.add(pos, "x", -2 * Math.PI, 2 * Math.PI);
    posFolder.add(pos, "y", -2 * Math.PI, 2 * Math.PI);
    posFolder.add(pos, "z", -2 * Math.PI, 2 * Math.PI);
    
    let rot = new function(){
        this.EulerZ1 = 0;
        this.EulerX = 0;
        this.EulerZ2 = 0;
    } //z-x-z' sequence
    rotFolder.add(rot, "EulerZ1", -2 * Math.PI, 2 * Math.PI);
    rotFolder.add(rot, "EulerX", -2 * Math.PI, 2 * Math.PI);
    rotFolder.add(rot, "EulerZ2", -2 * Math.PI, 2 * Math.PI);

    let len = new function(){
        this.lengthX=1;
        this.lengthY=1;
        this.lengthZ=1;
    }
    lenFolder.add(len, "lengthX", 0, 10);
    lenFolder.add(len, "lengthY", 0, 10);
    lenFolder.add(len, "lengthZ", 0, 10);

    function renderScene(){
        
        box.matrix = new THREE.Matrix4().makeRotationY(rot.EulerZ2).multiply(
            new THREE.Matrix4().makeRotationZ(rot.EulerX).multiply(
                new THREE.Matrix4().makeRotationY(rot.EulerZ1).multiply(
                    new THREE.Matrix4().set(len.lengthY, 0, 0, pos.y, 0, len.lengthZ, 0, pos.z, 0, 0, len.lengthX, pos.x, 0, 0, 0, 1)
//                    new THREE.Matrix4().makeTranslation(pos.y, pos.z, pos.x).multiply(
//                        new THREE.Matrix4().makeScale(len.lengthX, len.lengthY, len.lengthZ)
//                    )
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