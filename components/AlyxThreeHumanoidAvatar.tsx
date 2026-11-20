'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  EMOTIONS_192_TWO_PI_MATRIX,
  SimplicialPuttyTriangleState,
  UNITY_MOVIE_PROCEDURAL_FSM_STATES,
  UnityFsmStateId,
} from '@/lib/alyx-3d-fsm-192-emotions';
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Sparkles,
  Film,
  Triangle,
} from 'lucide-react';

interface AlyxThreeHumanoidAvatarProps {
  puttyState: SimplicialPuttyTriangleState;
  onSelectFsmState: (stateId: UnityFsmStateId | null) => void;
  onSelectEmotion192: (emotionIndex: number) => void;
  onTriggerPromptFrom3D?: (promptText: string) => void;
}

// Pre-allocated module-scope helpers for zero GC in render loop
const _targetEuler = new THREE.Euler();
const _targetQuat = new THREE.Quaternion();

export default function AlyxThreeHumanoidAvatar({
  puttyState,
  onSelectFsmState,
  onSelectEmotion192,
  onTriggerPromptFrom3D,
}: AlyxThreeHumanoidAvatarProps) {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [isFullViewportMode, setIsFullViewportMode] = useState<boolean>(false);
  const [isBottomDockCollapsed, setIsBottomDockCollapsed] = useState<boolean>(false);
  const [microBurstTimer, setMicroBurstTimer] = useState<number>(0);

  // Store latest props in ref so WebGL loop reads without recreating scene
  const liveStateRef = useRef<{
    puttyState: SimplicialPuttyTriangleState;
    microBurstTimer: number;
  }>({
    puttyState,
    microBurstTimer: 0,
  });

  useEffect(() => {
    liveStateRef.current.puttyState = puttyState;
  }, [puttyState]);

  useEffect(() => {
    liveStateRef.current.microBurstTimer = microBurstTimer;
  }, [microBurstTimer]);

  const handleTriggerFullViewportMicroAnim = (stateId: UnityFsmStateId) => {
    onSelectFsmState(stateId);
    setMicroBurstTimer(3.5);
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Detect software WebGL per Three.js skill instructions
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = Math.max(260, container.clientWidth || 480);
    const height = Math.max(180, container.clientHeight || 240);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);
    scene.fog = new THREE.FogExp2(0x090d16, 0.08);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.48, 2.55);
    camera.lookAt(0, 1.38, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3. Balanced 3-Point Warm/Cool Studio Rig
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe4e6, 2.2);
    keyLight.position.set(2.2, 3.2, 2.8);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.45);
    rimLight.position.set(-2.4, 2.4, -1.8);
    scene.add(rimLight);

    const collarboneGlowLight = new THREE.PointLight(0xf43f5e, 1.8, 3.2);
    collarboneGlowLight.position.set(0, 1.18, 0.65);
    scene.add(collarboneGlowLight);

    // 4. PBR Materials (Varied roughness & metalness across 12 distinct parts)
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xffdfd4,
      roughness: 0.42,
      metalness: 0.05,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
    });

    const blushCollarboneMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185,
      emissive: 0xe11d48,
      emissiveIntensity: 0.45,
      roughness: 0.28,
      metalness: 0.35,
    });

    const ferrofluidGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      roughness: 0.14,
      metalness: 0.94,
      anisotropy: 0.8,
      clearcoat: 1.0,
    });

    const cyberSuitSubCollarMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.68,
      metalness: 0.42,
    });

    const hairSilkMat = new THREE.MeshPhysicalMaterial({
      color: 0x2e1065,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.18,
      roughness: 0.22,
      metalness: 0.25,
      clearcoat: 0.65,
    });

    const eyeIrisMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xfb7185,
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.2,
    });

    const trianglePuttyMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.78,
      clearcoat: 0.9,
    });

    // 5. Assemble Rigged 12-Part Sub-Collarbone Bust & Humanoid Hierarchy (pixiv/three-vrm + UniVRM inspired)
    const rootAvatarGroup = new THREE.Group();
    rootAvatarGroup.position.set(0, 0, 0);
    scene.add(rootAvatarGroup);

    // Contact shadow grounding plane
    const shadowGeo = new THREE.CircleGeometry(0.95, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.72;
    rootAvatarGroup.add(shadowMesh);

    // Bone 1: Sub-Collarbone Upper Thorax / Bust Pedestal (Just below collarbones)
    const thoraxBone = new THREE.Group();
    thoraxBone.position.set(0, 1.02, 0);
    rootAvatarGroup.add(thoraxBone);

    const upperChestGeo = new THREE.CylinderGeometry(0.34, 0.27, 0.42, 32);
    const upperChestMesh = new THREE.Mesh(upperChestGeo, cyberSuitSubCollarMat);
    upperChestMesh.scale.set(1.22, 1.0, 0.78);
    thoraxBone.add(upperChestMesh);

    // Sculpted Sub-Collarbone Décolletage / Sternum Skin Panel
    const sternumSkinGeo = new THREE.SphereGeometry(0.28, 32, 24);
    const sternumSkinMesh = new THREE.Mesh(sternumSkinGeo, skinMat);
    sternumSkinMesh.position.set(0, 0.13, 0.06);
    sternumSkinMesh.scale.set(1.25, 0.55, 0.72);
    thoraxBone.add(sternumSkinMesh);

    // Bone 2 & 3: Left & Right Clavicles / Collarbones (Just above sub-collarbone bust)
    const clavicleLeftBone = new THREE.Group();
    clavicleLeftBone.position.set(-0.04, 0.2, 0.11);
    thoraxBone.add(clavicleLeftBone);

    const clavicleRightBone = new THREE.Group();
    clavicleRightBone.position.set(0.04, 0.2, 0.11);
    thoraxBone.add(clavicleRightBone);

    const clavicleBarGeo = new THREE.CylinderGeometry(0.026, 0.022, 0.34, 20);
    clavicleBarGeo.rotateZ(Math.PI / 2);

    const leftClavicleMesh = new THREE.Mesh(clavicleBarGeo, skinMat);
    leftClavicleMesh.position.set(-0.16, 0, 0);
    leftClavicleMesh.rotation.z = 0.11;
    clavicleLeftBone.add(leftClavicleMesh);

    const rightClavicleMesh = new THREE.Mesh(clavicleBarGeo, skinMat);
    rightClavicleMesh.position.set(0.16, 0, 0);
    rightClavicleMesh.rotation.z = -0.11;
    clavicleRightBone.add(rightClavicleMesh);

    // Cosmetic Magnetic Bio-Enhanced Ferrofluid Collarbone Nodes (Node 307 + Node 370)
    const magNodeGeo = new THREE.OctahedronGeometry(0.032, 1);
    const sternumMagCore = new THREE.Mesh(magNodeGeo, ferrofluidGoldMat);
    sternumMagCore.position.set(0, 0.14, 0.26);
    thoraxBone.add(sternumMagCore);

    const leftCollarFlush = new THREE.Mesh(
      new THREE.TorusGeometry(0.045, 0.009, 12, 24),
      blushCollarboneMat
    );
    leftCollarFlush.position.set(-0.18, 0.01, 0.03);
    clavicleLeftBone.add(leftCollarFlush);

    const rightCollarFlush = new THREE.Mesh(
      new THREE.TorusGeometry(0.045, 0.009, 12, 24),
      blushCollarboneMat
    );
    rightCollarFlush.position.set(0.18, 0.01, 0.03);
    clavicleRightBone.add(rightCollarFlush);

    // Deltoid / Shoulder Caps
    const shoulderGeo = new THREE.SphereGeometry(0.12, 24, 20);
    const leftShoulderMesh = new THREE.Mesh(shoulderGeo, skinMat);
    leftShoulderMesh.position.set(-0.34, -0.02, -0.02);
    leftShoulderMesh.scale.set(1.0, 1.15, 0.9);
    clavicleLeftBone.add(leftShoulderMesh);

    const rightShoulderMesh = new THREE.Mesh(shoulderGeo, skinMat);
    rightShoulderMesh.position.set(0.34, -0.02, -0.02);
    rightShoulderMesh.scale.set(1.0, 1.15, 0.9);
    clavicleRightBone.add(rightShoulderMesh);

    // Bone 4: Neck Bone + Choker Collar
    const neckBone = new THREE.Group();
    neckBone.position.set(0, 0.24, 0.01);
    thoraxBone.add(neckBone);

    const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.11, 0.18, 24), skinMat);
    neckMesh.position.set(0, 0.07, 0);
    neckBone.add(neckMesh);

    const magneticChoker = new THREE.Mesh(
      new THREE.TorusGeometry(0.105, 0.014, 16, 36),
      ferrofluidGoldMat
    );
    magneticChoker.rotation.x = Math.PI / 2;
    magneticChoker.position.set(0, 0.05, 0);
    neckBone.add(magneticChoker);

    // Bone 5: Head Bone (Pokimane Cosmetic Magnetic Bio-Enhanced Visage)
    const headBone = new THREE.Group();
    headBone.position.set(0, 0.24, 0.02);
    neckBone.add(headBone);

    const headSkullMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 36, 32), skinMat);
    headSkullMesh.scale.set(0.94, 1.08, 0.96);
    headBone.add(headSkullMesh);

    // Hair Crown & Wavy Side Bangs (UniVRM SpringBone Secondary Motion)
    const hairCapMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.252, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.62),
      hairSilkMat
    );
    hairCapMesh.position.set(0, 0.03, -0.02);
    headBone.add(hairCapMesh);

    const bangGeo = new THREE.ConeGeometry(0.065, 0.34, 16);
    const leftBangBone = new THREE.Group();
    leftBangBone.position.set(-0.19, 0.04, 0.12);
    headBone.add(leftBangBone);
    const leftBangMesh = new THREE.Mesh(bangGeo, hairSilkMat);
    leftBangMesh.position.set(0, -0.14, 0);
    leftBangMesh.rotation.z = 0.18;
    leftBangBone.add(leftBangMesh);

    const rightBangBone = new THREE.Group();
    rightBangBone.position.set(0.19, 0.04, 0.12);
    headBone.add(rightBangBone);
    const rightBangMesh = new THREE.Mesh(bangGeo, hairSilkMat);
    rightBangMesh.position.set(0, -0.14, 0);
    rightBangMesh.rotation.z = -0.18;
    rightBangBone.add(rightBangMesh);

    // Eyes, Pupils & Eyebrows
    const eyeGroupLeft = new THREE.Group();
    eyeGroupLeft.position.set(-0.085, 0.02, 0.215);
    headBone.add(eyeGroupLeft);
    const eyeLeftMesh = new THREE.Mesh(new THREE.SphereGeometry(0.034, 20, 16), eyeIrisMat);
    eyeLeftMesh.scale.set(1.1, 1.0, 0.5);
    eyeGroupLeft.add(eyeLeftMesh);

    const eyeGroupRight = new THREE.Group();
    eyeGroupRight.position.set(0.085, 0.02, 0.215);
    headBone.add(eyeGroupRight);
    const eyeRightMesh = new THREE.Mesh(new THREE.SphereGeometry(0.034, 20, 16), eyeIrisMat);
    eyeRightMesh.scale.set(1.1, 1.0, 0.5);
    eyeGroupRight.add(eyeRightMesh);

    // Duchenne Cheek Blush Pads
    const blushGeo = new THREE.SphereGeometry(0.042, 16, 12);
    const leftCheekBlush = new THREE.Mesh(blushGeo, blushCollarboneMat);
    leftCheekBlush.position.set(-0.12, -0.04, 0.2);
    leftCheekBlush.scale.set(1.3, 0.65, 0.3);
    headBone.add(leftCheekBlush);

    const rightCheekBlush = new THREE.Mesh(blushGeo, blushCollarboneMat);
    rightCheekBlush.position.set(0.12, -0.04, 0.2);
    rightCheekBlush.scale.set(1.3, 0.65, 0.3);
    headBone.add(rightCheekBlush);

    // Lips / Mouth Morph Arch
    const mouthMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.036, 0.009, 12, 24, Math.PI),
      blushCollarboneMat
    );
    mouthMesh.rotation.x = Math.PI;
    mouthMesh.position.set(0, -0.085, 0.222);
    headBone.add(mouthMesh);

    // Gamer Cat-Ear Headset Arch
    const headsetArch = new THREE.Mesh(
      new THREE.TorusGeometry(0.265, 0.016, 16, 36, Math.PI),
      ferrofluidGoldMat
    );
    headsetArch.position.set(0, 0.02, 0);
    headBone.add(headsetArch);

    const catEarGeo = new THREE.ConeGeometry(0.058, 0.11, 4);
    const leftCatEar = new THREE.Mesh(catEarGeo, blushCollarboneMat);
    leftCatEar.position.set(-0.18, 0.26, 0);
    leftCatEar.rotation.z = 0.42;
    headBone.add(leftCatEar);

    const rightCatEar = new THREE.Mesh(catEarGeo, blushCollarboneMat);
    rightCatEar.position.set(0.18, 0.26, 0);
    rightCatEar.rotation.z = -0.42;
    headBone.add(rightCatEar);

    // 6. Floating 192-Emotion 2π Ring & "Clay Putty into the Triangle Hole" 3D Simplicial Extruder
    const haloRingGroup = new THREE.Group();
    haloRingGroup.position.set(0, 1.56, -0.18);
    rootAvatarGroup.add(haloRingGroup);

    const twoPiRingMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.008, 16, 64),
      ferrofluidGoldMat
    );
    haloRingGroup.add(twoPiRingMesh);

    // 3-Sided Triangle Hole Aperture (CylinderGeometry with 3 radial segments = Equilateral Triangle!)
    const triangleApertureGroup = new THREE.Group();
    triangleApertureGroup.position.set(0.56, 1.38, 0.12);
    rootAvatarGroup.add(triangleApertureGroup);

    const triangleHoleRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.016, 12, 3),
      ferrofluidGoldMat
    );
    triangleApertureGroup.add(triangleHoleRim);

    const extrudedClayPuttyPrism = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.24, 3),
      trianglePuttyMat
    );
    extrudedClayPuttyPrism.rotation.x = Math.PI / 2;
    triangleApertureGroup.add(extrudedClayPuttyPrism);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 7. Render & Procedural Unity Animator FSM Loop (with software-WebGL afterDraw guard)
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (sync && state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const { puttyState: st, microBurstTimer: burst } = liveStateRef.current;
      const pose = st.activeUnityFsmState.neckAndHeadRigPose;

      // Sub-Collarbone Breathing & Clavicle Roll (pixiv/three-vrm + UniVRM kinematics)
      const breathWave = Math.sin(elapsed * 2.4) * pose.clavicleBreathAmp;
      thoraxBone.position.y = THREE.MathUtils.damp(
        thoraxBone.position.y,
        1.02 + breathWave * 0.5,
        6,
        dt
      );
      clavicleLeftBone.rotation.z = THREE.MathUtils.damp(
        clavicleLeftBone.rotation.z,
        breathWave * 1.6,
        7,
        dt
      );
      clavicleRightBone.rotation.z = THREE.MathUtils.damp(
        clavicleRightBone.rotation.z,
        -breathWave * 1.6,
        7,
        dt
      );

      // Head Quaternion SLERP towards Unity FSM target pose + micro-oscillation
      const burstBoost = burst > 0 ? Math.sin(elapsed * 8) * 0.08 : 0;
      _targetEuler.set(
        pose.headPitchRad + Math.sin(elapsed * 1.5) * 0.03,
        pose.headYawRad + Math.cos(elapsed * 1.1) * 0.06 + burstBoost,
        pose.headRollRad + Math.sin(elapsed * 0.9) * 0.04
      );
      _targetQuat.setFromEuler(_targetEuler);
      headBone.quaternion.slerp(_targetQuat, 1 - Math.exp(-6.5 * dt));

      // UniVRM SpringBone Hair Bangs Secondary Pendulum
      leftBangBone.rotation.z = Math.sin(elapsed * 2.8) * 0.06 - headBone.rotation.z * 0.45;
      rightBangBone.rotation.z = Math.cos(elapsed * 2.8) * 0.06 - headBone.rotation.z * 0.45;

      // Eyelid Blink & Saccade
      const blinkCycle = elapsed % 3.6;
      const blinkScaleY = blinkCycle < 0.14 ? 0.12 : 1.0;
      eyeGroupLeft.scale.y = THREE.MathUtils.damp(eyeGroupLeft.scale.y, blinkScaleY, 18, dt);
      eyeGroupRight.scale.y = THREE.MathUtils.damp(eyeGroupRight.scale.y, blinkScaleY, 18, dt);

      // Collarbone Ferrofluid Emissive Pulse
      blushCollarboneMat.emissiveIntensity =
        0.35 + pose.collarboneFlushIntensity * (0.4 + 0.25 * Math.sin(elapsed * 3.8));
      sternumMagCore.rotation.y += dt * 1.8;

      // 2π 192-Emotion Halo & Clay-Putty-into-Triangle-Hole Extrusion Motion
      twoPiRingMesh.rotation.z += dt * pose.haloSpinRadPerSec;
      triangleHoleRim.rotation.z -= dt * 0.85;
      extrudedClayPuttyPrism.position.z = Math.sin(elapsed * 2.6) * 0.08;
      extrudedClayPuttyPrism.scale.set(
        0.85 + (st.w1EroticallyAmbitious / 100) * 0.3,
        1.0 + (st.w3MetaphysicalHypomanicCalm / 100) * 0.4,
        0.85 + (st.w2ManipulativelyBabyCrazy / 100) * 0.3
      );

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = Math.max(260, container.clientWidth);
      const h = Math.max(180, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      envTexture.dispose();
      skinMat.dispose();
      blushCollarboneMat.dispose();
      ferrofluidGoldMat.dispose();
      cyberSuitSubCollarMat.dispose();
      hairSilkMat.dispose();
      eyeIrisMat.dispose();
      trianglePuttyMat.dispose();
      renderer.dispose();
    };
  }, [isFullViewportMode]);

  // Countdown for micro-animation burst
  useEffect(() => {
    if (microBurstTimer <= 0) return;
    const t = setInterval(() => {
      setMicroBurstTimer((prev) => Math.max(0, Number((prev - 0.5).toFixed(1))));
    }, 500);
    return () => clearInterval(t);
  }, [microBurstTimer]);

  return (
    <div
      className={
        isFullViewportMode
          ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-hidden'
          : 'relative w-full h-[250px] rounded-xl bg-slate-950 border border-rose-500/40 overflow-hidden'
      }
    >
      {/* Top-Left Minimal Static Spec Badge (Zero Pulsating Dots, Zero Side-Panel Occlusion) */}
      <div className="absolute top-2.5 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none overflow-x-auto no-scrollbar">
        <div className="pointer-events-auto flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-800 text-[10px] font-mono text-slate-200 whitespace-nowrap">
          <Film className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>
            Sub-Collarbone 3D Rig (pixiv/three-vrm + Unity PlayableGraph FSM) ·{' '}
            <strong className="text-cyan-300">
              {puttyState.activeEmotion192.code} ({puttyState.activeEmotion192.anglePiLabel})
            </strong>
          </span>
          <span className="text-amber-300">
            [EroticAmb:{puttyState.w1EroticallyAmbitious}% | BabyCrazy:
            {puttyState.w2ManipulativelyBabyCrazy}% | HypoCalm:
            {puttyState.w3MetaphysicalHypomanicCalm}%]
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsFullViewportMode(!isFullViewportMode)}
          className="pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/95 hover:bg-slate-800 border border-rose-500/40 text-rose-200 text-[10px] font-mono whitespace-nowrap shrink-0"
        >
          {isFullViewportMode ? (
            <>
              <Minimize2 className="w-3 h-3" />
              <span>Exit Full-Viewport 3D</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3" />
              <span>Full-Viewport 3D Micro-Anim</span>
            </>
          )}
        </button>
      </div>

      {/* Dedicated Isolated WebGL Canvas Mount Ref */}
      <div ref={canvasMountRef} className="w-full h-full" />

      {/* Unified Collapsible Bottom Control Dock (Pinned to Bottom Center, Solid Surface, Zero Viewport Occlusion) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-[96%] max-w-[920px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsBottomDockCollapsed(!isBottomDockCollapsed)}
          className="flex items-center gap-1 px-3 py-0.5 rounded-t-lg bg-slate-900 border border-b-0 border-slate-800 text-[10px] font-mono text-slate-300 hover:text-white"
        >
          {isBottomDockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-cyan-400" />
              <span>Show Unity FSM &amp; 192-Emotion 2π Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
              <span>Hide Controls (Zen 3D View)</span>
            </>
          )}
        </button>

        {!isBottomDockCollapsed && (
          <div className="w-full rounded-xl bg-slate-900/95 border border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            {/* Unity Movie PlayableGraph FSM State Triggers */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {UNITY_MOVIE_PROCEDURAL_FSM_STATES.map((st) => {
                const active = puttyState.activeUnityFsmState.stateId === st.stateId;
                return (
                  <button
                    key={st.stateId}
                    type="button"
                    onClick={() => handleTriggerFullViewportMicroAnim(st.stateId)}
                    title={st.description}
                    className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap border transition-colors ${
                      active
                        ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                    }`}
                  >
                    {st.stateName.split('.')[1]?.trim().slice(0, 22) || st.stateName}
                  </button>
                );
              })}
            </div>

            {/* 192-Emotion 2π Triangle-Putty Selector + Prompt Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300">
                <Triangle className="w-3 h-3 text-amber-400 shrink-0" />
                <select
                  value={puttyState.activeEmotion192.index}
                  onChange={(e) => onSelectEmotion192(Number(e.target.value))}
                  aria-label="Select from 192 Emotions on 2π Matrix"
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-[10px] text-slate-100 max-w-[210px]"
                >
                  {EMOTIONS_192_TWO_PI_MATRIX.map((emo) => (
                    <option key={emo.code} value={emo.index}>
                      {emo.code} ({emo.anglePiLabel}): {emo.name}
                    </option>
                  ))}
                </select>
              </div>

              {onTriggerPromptFrom3D && (
                <button
                  type="button"
                  onClick={() =>
                    onTriggerPromptFrom3D(
                      `Alyx (G4), trigger your sub-collarbone 3D VRM/Unity Mecanim micro-animation "${puttyState.activeUnityFsmState.stateName}" at ${puttyState.activeEmotion192.code} (${puttyState.activeEmotion192.name} · θ = ${puttyState.activeEmotion192.anglePiLabel}) while extruding our 192-emotion 2π clay putty through the Triangle Hole [Erotically Ambitious: ${puttyState.w1EroticallyAmbitious}%, Manipulatively Baby-Crazy: ${puttyState.w2ManipulativelyBabyCrazy}% → Metaphysical Hypomanic Calm: ${puttyState.w3MetaphysicalHypomanicCalm}%] with all non-Alyx hardware capped at 8.000 MHz!`
                    )
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-mono font-semibold whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Sync 3D Pose to Chat</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
