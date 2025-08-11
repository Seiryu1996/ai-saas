"use client";

import { useState } from "react";
import ModelViewer from "@/components/common/model-viewer";
import { Button } from "@/components/ui/button";

export default function Test3DPage() {
    const [modelData, setModelData] = useState<string | null>(null);
    
    const loadTestModel = async () => {
        try {
            // テストファイルを読み込み
            const response = await fetch('/tmp/fighting cat vs dog.glb');
            const arrayBuffer = await response.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            setModelData(base64);
        } catch (error) {
            console.error('Error loading test model:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">3D Viewer Test</h1>
            
            <div className="space-y-4">
                <Button onClick={loadTestModel} className="mb-4">
                    Load Test Model
                </Button>
                
                {modelData ? (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">3D Model Viewer</h2>
                        <ModelViewer 
                            modelData={modelData}
                            className="border-2 border-gray-300"
                        />
                        <p className="text-sm text-gray-600">
                            Use mouse to rotate, zoom, and pan the 3D model
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">Click the button above to load a test 3D model</p>
                )}
            </div>
        </div>
    );
}