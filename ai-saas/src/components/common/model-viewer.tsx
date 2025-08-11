"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ModelViewerProps {
    modelData: string;
    className?: string;
}

const ModelViewer = ({ modelData, className = "" }: ModelViewerProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationRef = useRef<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        if (!isClient || !mountRef.current || !modelData) {
            console.log('ModelViewer: Missing client/mount ref/model data');
            return;
        }
        const mountElement = mountRef.current;
        while (mountElement.firstChild) {
            mountElement.removeChild(mountElement.firstChild);
        }
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            50,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.01,
            1000
        );
        camera.position.set(3, 3, 3);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (renderer.domElement && !mountElement.contains(renderer.domElement)) {
            mountElement.appendChild(renderer.domElement);
        }
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false;
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.minDistance = 0.5;
        controls.maxDistance = 10;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 8, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        mainLight.shadow.bias = -0.001;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
        rimLight.position.set(0, 5, -5);
        scene.add(rimLight);

        const gridHelper = new THREE.GridHelper(10, 20, 0xcccccc, 0xcccccc);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        gridHelper.position.y = -0.005;
        scene.add(gridHelper);

        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5,
            transparent: true,
            opacity: 0.6
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        scene.add(ground);

        const loader = new GLTFLoader();
        
        try {
            const binaryString = atob(modelData);
            const bytes = new Uint8Array(binaryString.length);
            const chunkSize = 8192;
            for (let i = 0; i < binaryString.length; i += chunkSize) {
                const chunk = binaryString.slice(i, i + chunkSize);
                for (let j = 0; j < chunk.length; j++) {
                    bytes[i + j] = chunk.charCodeAt(j);
                }
            }
            const blob = new Blob([bytes], { type: "model/gltf-binary" });
            const url = URL.createObjectURL(blob);
            loader.load(
            url,
            (gltf) => {
                setLoading(false);
                setError(null);
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2.5 / maxDim;
                model.scale.setScalar(scale);
                const scaledBox = new THREE.Box3().setFromObject(model);
                const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
                model.position.x = -scaledCenter.x;
                model.position.z = -scaledCenter.z;
                const groundOffset = 0.02;
                model.position.y = -scaledBox.min.y + groundOffset;
                model.traverse((node) => {
                    if (node instanceof THREE.Mesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                        if (node.material) {
                            if ('roughness' in node.material) {
                                node.material.envMapIntensity = 1.0;
                            }
                            node.material.needsUpdate = true;
                        }
                    }
                });
                scene.add(model);
                const finalBox = new THREE.Box3().setFromObject(model);
                const finalSize = finalBox.getSize(new THREE.Vector3());
                const finalCenter = finalBox.getCenter(new THREE.Vector3());
                const distance = Math.max(finalSize.x, finalSize.z, finalSize.y) * 1.5;
                camera.position.set(distance, distance * 0.7, distance);
                camera.lookAt(finalCenter);
                controls.target.copy(finalCenter);
                controls.update();
                URL.revokeObjectURL(url);
            },
            (progress) => {
                console.log("Loading progress:", progress);
            },
                (error) => {
                    console.error("Error loading model:", error);
                    setLoading(false);
                    setError(`モデルの読み込みに失敗しました: ${error instanceof Error ? error.message : String(error)}`);
                    URL.revokeObjectURL(url);
                }
            );
        } catch (error) {
            console.error("Error in ModelViewer setup:", error);
            setLoading(false);
            setError(`セットアップエラー: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        const handleResize = () => {
            if (!mountRef.current) return;
            
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            window.removeEventListener("resize", handleResize);
            if (scene) {
                while(scene.children.length > 0) {
                    const object = scene.children[0];
                    scene.remove(object);
                    if (object instanceof THREE.Mesh) {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) {
                            if (Array.isArray(object.material)) {
                                object.material.forEach(material => material.dispose());
                            } else {
                                object.material.dispose();
                            }
                        }
                    }
                }
            }
            if (renderer) {
                if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
                    mountElement.removeChild(renderer.domElement);
                }
                renderer.dispose();
                renderer.forceContextLoss();
            }
        };
    }, [isClient, modelData]);

    return (
        <div 
            className={`w-full h-96 rounded-lg border bg-background relative ${className}`}
            style={{ minHeight: "384px" }}
        >
            <div ref={mountRef} className="w-full h-full" />
            
            {!isClient && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="text-center">
                        <div className="animate-pulse rounded h-8 w-32 bg-gray-300 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">3Dビューワーを準備中...</p>
                    </div>
                </div>
            )}
            
            {isClient && loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">3Dモデルを読み込み中...</p>
                    </div>
                </div>
            )}
            
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <div className="text-center text-red-600 p-4">
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModelViewer;