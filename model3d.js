
    let scene, camera, renderer, model, controls;

    // Initialize 3D Scene
    function init() {
      scene = new THREE.Scene();

      // Set up the camera with a default position
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 1, 3);

      // Create the renderer and add it to the modal container
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(800, 600); // Default size
      renderer.domElement.style.maxWidth = "100%";
      renderer.domElement.style.maxHeight = "100%";
      renderer.domElement.style.margin = "auto";
      document.getElementById('modelContainer').appendChild(renderer.domElement);

      // Add lighting
      const light = new THREE.HemisphereLight(0xffffff, 0x444444);
      light.position.set(0, 1, 0);
      scene.add(light);

      // Add controls
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
    }

    // Load a specific 3D model
    function loadModel(modelPath) {
      if (!scene) init();

      // Remove the previous model if it exists
      if (model) {
        scene.remove(model);
      }

      // Load the new model
      const loader = new THREE.GLTFLoader();
      loader.load(
        modelPath, // Model file path
        (gltf) => {
          model = gltf.scene;

          // Center the model in the scene
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.x += model.position.x - center.x;
          model.position.y += model.position.y - center.y;
          model.position.z += model.position.z - center.z;

          // Adjust camera to fit model
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 1.5; // Zoom out slightly for better view
          camera.position.set(0, maxDim / 2, cameraZ);

          // Recalculate camera aspect and update
          camera.lookAt(new THREE.Vector3(0, 0, 0));
          controls.update();

          scene.add(model);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.error('An error occurred while loading the model:', error);
        }
      );
    }

    // Open 3D Model Viewer
    function openModelViewer(button) {
      const modelPath = button.getAttribute('data-model'); // Get the model file path
      document.getElementById('modelModal').style.display = 'flex';
      loadModel(modelPath); // Load the 3D model
    }

    // Close 3D Model Viewer
    function closeModelViewer() {
      document.getElementById('modelModal').style.display = 'none';
      if (model) {
        scene.remove(model); // Remove the model from the scene
        model = null;
      }
    }

    // Update renderer size on window resize
    window.addEventListener('resize', () => {
      const container = document.getElementById('modelContainer');
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  