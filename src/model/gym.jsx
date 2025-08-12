import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import * as THREE from "three";
import gsap from "gsap";
import gymScene from "./Gym.glb";
import Locker from "../assets/locker";
import SkillDumbbell from "../assets/Skills";
import {
  csharp,
  css,
  html,
  java,
  php,
  python,
  typescript,
  r,
  postgresql,
  flutter,
  about,
  work,
  edu,
} from "../../public";
import Logo from "../assets/logo";

const Hitbox = ({ position, size, onClick }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={size} />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
};

const Gym = ({ onCameraChange, currentView, onPopupTrigger, playAnimation }) => {
  const gymRef = useRef();
  const { nodes, materials } = useGLTF(gymScene);
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const [showHitboxes, setShowHitboxes] = useState(false);
  const characterRef = useRef();
  const barbellRef = useRef();
  
  // Helper function to safely access geometry
  const safeGeometry = (nodeName) => {
    return nodes[nodeName]?.geometry || null;
  };

  useEffect(() => {
    if (playAnimation && characterRef.current) {
      const bones = {
        upperArmL: characterRef.current.getObjectByName("upper_armL"),
        upperArmR: characterRef.current.getObjectByName("upper_armR"),
        forearmL: characterRef.current.getObjectByName("forearmL"),
        forearmR: characterRef.current.getObjectByName("forearmR"),
        wristL: characterRef.current.getObjectByName("handL"),
        wristR: characterRef.current.getObjectByName("handR"),
      };

      if (
        bones.upperArmL &&
        bones.upperArmR &&
        bones.forearmL &&
        bones.forearmR
      ) {
        gsap.set(bones.forearmR.rotation, { x: 0, y: 0, z: 0 });
        gsap.set(bones.upperArmR.rotation, { x: 0, y: 0, z: 2.13 });
        gsap.set(bones.forearmL.rotation, { x: 0, y: 0, z: 0 });
        gsap.set(bones.upperArmL.rotation, { x: 0, y: 0, z: -2.13 });
        gsap.set(barbellRef.current.position, { x: -8.7, y: 1.36, z: -12.25 });
        gsap.set(bones.wristL.rotation, {
          x: THREE.MathUtils.degToRad(-80),
          y: THREE.MathUtils.degToRad(0),
          z: 2.6,
        });
        gsap.set(bones.wristR.rotation, {
          x: THREE.MathUtils.degToRad(-80),
          y: THREE.MathUtils.degToRad(0),
          z: -2.6,
        });

        const timeline = gsap.timeline();

        timeline.to(
          bones.upperArmL.rotation,
          {
            x: 0,
            y: 0,
            z: -0.5,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => bones.upperArmL.quaternion.normalize(),
          },
          0
        );
        timeline.to(
          bones.upperArmR.rotation,
          {
            x: 0,
            y: 0,
            z: 0.5,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => bones.upperArmR.quaternion.normalize(),
          },
          0
        );
        timeline.to(
          bones.forearmL.rotation,
          {
            x: 0,
            y: 0,
            z: -1.6,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => bones.forearmL.quaternion.normalize(),
          },
          0
        );
        timeline.to(
          bones.forearmR.rotation,
          {
            x: 0,
            y: 0,
            z: 1.6,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => bones.forearmR.quaternion.normalize(),
          },
          0
        );
        timeline.to(
          barbellRef.current.position,
          {
            x: -8.7,
            y: 1.135,
            z: -12.25,
            duration: 0.75,
            ease: "power2.out",
          },
          0.05
        );

        timeline.to(
          bones.upperArmL.rotation,
          {
            x: 0,
            y: 0,
            z: -2.13,
            duration: 0.75,
            onUpdate: () => bones.upperArmL.quaternion.normalize(),
          },
          0.75
        );
        timeline.to(
          bones.upperArmR.rotation,
          {
            x: 0,
            y: 0,
            z: 2.13,
            duration: 0.75,
            onUpdate: () => bones.upperArmR.quaternion.normalize(),
          },
          0.75
        );
        timeline.to(
          bones.forearmL.rotation,
          {
            x: 0,
            y: 0.1,
            z: 0,
            duration: 0.75,
            onUpdate: () => bones.forearmL.quaternion.normalize(),
          },
          0.75
        );
        timeline.to(
          bones.forearmR.rotation,
          {
            x: 0,
            y: -0.1,
            z: 0,
            duration: 0.75,
            onUpdate: () => bones.forearmR.quaternion.normalize(),
          },
          0.75
        );
        timeline.to(
          barbellRef.current.position,
          {
            x: -8.7,
            y: 1.36,
            z: -12.25,
            duration: 0.45,
          },
          0.8
        );
      } else {
        console.error("Some bones were not found");
      }
    }
  }, [playAnimation]);

  useEffect(() => {
    console.log(currentView);
    const timer = setTimeout(() => {
      onCameraChange("reception");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentView === "reception") {
      gsap.to(leftDoorRef.current.rotation, { z: Math.PI / 2, duration: 1 });
      gsap.to(rightDoorRef.current.rotation, { z: -Math.PI / 2, duration: 1 });
      setShowHitboxes(true);
    } else if (currentView === "about") {
      setShowHitboxes(true);
    } else {
      setShowHitboxes(false);
    }
  }, [currentView]);

  return (
    <>
      <a.group ref={gymRef}>
        <group name="Scene">
          <group
            name="Menu"
            position={[2.01, 1.41, -10.58]}
            rotation={[Math.PI, -0.401, Math.PI]}
            scale={0.5}
          >
            <mesh
              name="Cube003_1"
              geometry={nodes.Cube003_1.geometry}
              material={materials.menu}
            />
            <mesh
              name="Cube003_2"
              geometry={nodes.Cube003_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="Cube003_3"
              geometry={nodes.Cube003_3.geometry}
              material={materials.Material}
            />
            {showHitboxes && (
              <>
                <Hitbox
                  position={[-0.375, 0.3, 0.1]}
                  size={[0.75, 0.2, 0.1]}
                  onClick={() => onCameraChange("projects")}
                />
                <Hitbox
                  position={[-0.25, 0.1, 0.1]}
                  size={[1, 0.2, 0.1]}
                  onClick={() => onCameraChange("about")}
                />
                <Hitbox
                  position={[-0.5, -0.1, 0.1]}
                  size={[0.5, 0.2, 0.1]}
                  onClick={() => onCameraChange("skills")}
                />
                <Hitbox
                  position={[-0.25, -0.3, 0.1]}
                  size={[1, 0.2, 0.1]}
                  onClick={() => onCameraChange("game")}
                />
              </>
            )}
          </group>
          {currentView === "game" && (
            <>
              <group
                ref={characterRef}
                name="character_3"
                position={[-8.7, 0.9, -10.726]}
              >
                <group name="character3">
                  <skinnedMesh
                    name="character3_1" //torso
                    geometry={nodes.character3_1.geometry}
                    material={materials["red rubber"]}
                    skeleton={nodes.character3_1.skeleton}
                  />
                  <skinnedMesh
                    name="character3_2" //legs
                    geometry={nodes.character3_2.geometry}
                    material={materials.rubber}
                    skeleton={nodes.character3_2.skeleton}
                  />
                  <skinnedMesh
                    name="character3_3" //arms and legs
                    geometry={nodes.character3_3.geometry}
                    material={materials.skin}
                    skeleton={nodes.character3_3.skeleton}
                  />
                  <skinnedMesh
                    name="character3_4"
                    geometry={nodes.character3_4.geometry}
                    material={materials.sock}
                    skeleton={nodes.character3_4.skeleton}
                  />
                </group>
                <primitive object={nodes.Bone} />
              </group>
              <group
                ref={barbellRef}
                name="barbell_game"
                position={[-8.7, 1.664, -12.5]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="gym_model_079001"
                  geometry={nodes.gym_model_079001.geometry}
                  material={materials.metal}
                />
                <mesh
                  name="gym_model_079001_1"
                  geometry={nodes.gym_model_079001_1.geometry}
                  material={materials.weights}
                />
              </group>
            </>
          )}
          {currentView === "projects" && (
            <>
              <Locker
                nodes={nodes}
                materials={materials}
                position={[3.37, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => onPopupTrigger("swimWebsite")}
                canInteract={true}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[4.62, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => onPopupTrigger("saferly")}
                canInteract={true}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[5.87, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => onPopupTrigger("portfolio")}
                canInteract={true}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[7.12, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 4 clicked")}
                canInteract={false}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[8.37, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 5 clicked")}
                canInteract={false}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[9.62, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 5 clicked")}
                canInteract={false}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[10.87, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 6 clicked")}
                canInteract={false}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[12.12, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 7 clicked")}
                canInteract={false}
              />
              <Locker
                nodes={nodes}
                materials={materials}
                position={[13.37, 0.1, 9.08]}
                rotation={[Math.PI / 2, 0, 0]}
                onClick={() => console.log("Locker 8 clicked")}
                canInteract={false}
              />
            </>
          )}
          {currentView === "about" && (
            <>
              <group
                name="treadmills005"
                position={[9.7, 0.11, -12.5]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="gym_model_122005"
                  geometry={nodes.gym_model_122005.geometry}
                  material={materials["plastic(grey)"]}
                />
                <mesh
                  name="gym_model_122005_1"
                  geometry={nodes.gym_model_122005_1.geometry}
                  material={materials["rubber-grey"]}
                />
                <mesh
                  name="gym_model_122005_2"
                  geometry={nodes.gym_model_122005_2.geometry}
                  material={materials.rubber}
                />
                <mesh
                  name="gym_model_122005_3"
                  geometry={nodes.gym_model_122005_3.geometry}
                  material={materials.screen}
                />
                <Logo
                  svgPath={about}
                  position={[0, -0.46, -1.146]}
                  scale={0.0011}
                  tilt={-0.38}
                  rotation={{ x: Math.PI / 2, y: 0, z: Math.PI }}
                  fillColor="#F3FBFB"
                  strokeColor="black"
                />
                {currentView === "about" && (
                  <Hitbox
                    position={[0, -0.5, -1.1]}
                    size={[0.25, 0.15, 0.25]}
                    onClick={() => onPopupTrigger("aboutMe")}
                  />
                )}
              </group>
              <group
                name="treadmills002"
                position={[8.1, 0.11, -12.5]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="gym_model_122006"
                  geometry={nodes.gym_model_122006.geometry}
                  material={materials["plastic(grey)"]}
                />
                <mesh
                  name="gym_model_122006_1"
                  geometry={nodes.gym_model_122006_1.geometry}
                  material={materials["rubber-grey"]}
                />
                <mesh
                  name="gym_model_122006_2"
                  geometry={nodes.gym_model_122006_2.geometry}
                  material={materials.rubber}
                />
                <mesh
                  name="gym_model_122006_3"
                  geometry={nodes.gym_model_122006_3.geometry}
                  material={materials.screen}
                />
                <Logo
                  svgPath={work}
                  position={[-0.011, -0.5, -1.153]}
                  scale={0.0067}
                  tilt={-0.38}
                  rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
                  fillColor="#F3FBFB"
                  strokeColor="blue"
                />
                {currentView === "about" && (
                  <Hitbox
                    position={[0, -0.5, -1.1]}
                    size={[0.25, 0.15, 0.25]}
                    onClick={() => onPopupTrigger("experience")}
                  />
                )}
              </group>
              <group
                name="treadmills004"
                position={[11.3, 0.11, -12.5]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="gym_model_122008"
                  geometry={nodes.gym_model_122008.geometry}
                  material={materials["plastic(grey)"]}
                />
                <mesh
                  name="gym_model_122008_1"
                  geometry={nodes.gym_model_122008_1.geometry}
                  material={materials["rubber-grey"]}
                />
                <mesh
                  name="gym_model_122008_2"
                  geometry={nodes.gym_model_122008_2.geometry}
                  material={materials.rubber}
                />
                <mesh
                  name="gym_model_122008_3"
                  geometry={nodes.gym_model_122008_3.geometry}
                  material={materials.screen}
                />
                <Logo
                  svgPath={edu}
                  position={[0, -0.5, -1.145]}
                  scale={0.0003}
                  tilt={-0.38}
                  rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
                  fillColor="#F3FBFB"
                  strokeColor="blue"
                />
                {currentView === "about" && (
                  <Hitbox
                    position={[0, -0.5, -1.1]}
                    size={[0.25, 0.15, 0.25]}
                    onClick={() => onPopupTrigger("education")}
                  />
                )}
              </group>
            </>
          )}
          {currentView === "skills" && (
            <>
              {/* High Confidence Skills - Large Dumbbells */}
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 1.17, 1.1]}
                rotation={[0, 0, 1.204]}
                scale={0.002}
                canInteract={true}
                level="Large"
                confidenceLevel={90}
                svgPath={java}
                svgPos={[0.08, -0.25, 0.03]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 1.17, 0.8]}
                rotation={[0, 0, 1.204]}
                scale={0.002}
                canInteract={true}
                level="Large"
                confidenceLevel={85}
                svgPath={csharp}
                svgPos={[0.05, -0.25, 0.02]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 1.17, 0.5]}
                rotation={[0, 0, 1.204]}
                scale={0.002}
                canInteract={true}
                level="Large"
                confidenceLevel={85}
                svgPath={python}
                svgPos={[0.05, -0.25, 0.018]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 1.17, 0.2]}
                rotation={[0, 0, 1.204]}
                scale={0.002}
                canInteract={true}
                level="Large"
                confidenceLevel={80}
                svgPath={postgresql}
                svgPos={[0.05, -0.25, 0.02]}
              />
              
              {/* Medium Confidence Skills - Medium Dumbbells */}
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.8, 1.1]}
                rotation={[0, 0, 1.204]}
                scale={0.0033}
                canInteract={true}
                level="Medium"
                confidenceLevel={75}
                svgPath={typescript}
                svgPos={[0.05, -0.25, 0.02]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.8, 0.8]}
                rotation={[0, 0, 1.204]}
                scale={0.0033}
                canInteract={true}
                level="Medium"
                confidenceLevel={70}
                svgPath={html}
                svgPos={[0.05, -0.25, 0.015]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.8, 0.5]}
                rotation={[0, 0, 1.204]}
                scale={0.0033}
                canInteract={true}
                level="Medium"
                confidenceLevel={70}
                svgPath={css}
                svgPos={[0.05, -0.25, 0.02]}
              />
              
              {/* Lower Confidence Skills - Small Dumbbells */}
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.48, 1.1]}
                rotation={[0, 0, 1.204]}
                scale={0.0015}
                canInteract={true}
                level="Small"
                confidenceLevel={40}
                svgPath={flutter}
                svgPos={[0.05, -0.25, 0.02]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.48, 0.8]}
                rotation={[0, 0, 1.204]}
                scale={0.0015}
                canInteract={true}
                level="Small"
                confidenceLevel={30}
                svgPath={php}
                svgPos={[0.14, -0.25, 0]}
              />
              <SkillDumbbell
                nodes={nodes}
                materials={materials}
                position={[-13.6, 0.48, 0.5]}
                rotation={[0, 0, 1.204]}
                scale={0.0015}
                canInteract={true}
                level="Small"
                confidenceLevel={25}
                svgPath={r}
                svgPos={[0.05, -0.25, 0.02]}
              />
            </>
          )}
          {/* end of custom components and models */}
          <mesh
            name="Plane"
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
            position={[0, -0.01, 0]}
            scale={[40, 1, 40]}
          />
          <mesh
            name="Text"
            geometry={nodes.Text.geometry}
            material={nodes.Text.material}
            position={[2.35, 1.53, -10.74]}
            rotation={[Math.PI / 2, 0, 2.74]}
            scale={[0.1, 1, 0.1]}
          />
          <group
            name="pullupab_rack002"
            position={[7, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_077002"
              geometry={nodes.gym_model_077002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_077002_1"
              geometry={nodes.gym_model_077002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench003"
            position={[-5, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118003"
              geometry={nodes.gym_model_118003.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118003_1"
              geometry={nodes.gym_model_118003_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020001"
            position={[-1, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020003_1"
              geometry={nodes.gym_model_020003_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020003_2"
              geometry={nodes.gym_model_020003_2.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020003_3"
              geometry={nodes.gym_model_020003_3.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench002"
            position={[-1, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118004"
              geometry={nodes.gym_model_118004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118004_1"
              geometry={nodes.gym_model_118004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020003"
            position={[-5, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020004"
              geometry={nodes.gym_model_020004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020004_1"
              geometry={nodes.gym_model_020004_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020004_2"
              geometry={nodes.gym_model_020004_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack006"
            position={[3, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007006"
              geometry={nodes.gym_model_007006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007006_1"
              geometry={nodes.gym_model_007006_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007006_2"
              geometry={nodes.gym_model_007006_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack002"
            position={[7, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007009"
              geometry={nodes.gym_model_007009.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007009_1"
              geometry={nodes.gym_model_007009_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007009_2"
              geometry={nodes.gym_model_007009_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack005"
            position={[-1, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007010"
              geometry={nodes.gym_model_007010.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007010_1"
              geometry={nodes.gym_model_007010_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007010_2"
              geometry={nodes.gym_model_007010_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack003"
            position={[11, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007011"
              geometry={nodes.gym_model_007011.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007011_1"
              geometry={nodes.gym_model_007011_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007011_2"
              geometry={nodes.gym_model_007011_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="plate_holder_wplates001"
            position={[-9, 0.1, -4]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078003"
              geometry={nodes.gym_model_078003.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078003_1"
              geometry={nodes.gym_model_078003_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078003_2"
              geometry={nodes.gym_model_078003_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="yoga_ball_rack002"
            position={[7.2, 0.1, 8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_017002"
              geometry={nodes.gym_model_017002.geometry}
              material={materials["light_blue rubber"]}
            />
            <mesh
              name="gym_model_017002_1"
              geometry={nodes.gym_model_017002_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_017002_2"
              geometry={nodes.gym_model_017002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="punching_bag001"
            position={[11, 0.1, 8.1]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_021002"
              geometry={nodes.gym_model_021002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_021002_1"
              geometry={nodes.gym_model_021002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall003"
            position={[14.35, 2, -3]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061003"
              geometry={nodes.gym_model_061003.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061003_1"
              geometry={nodes.gym_model_061003_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall001"
            position={[14.35, 2, 4]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061004"
              geometry={nodes.gym_model_061004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061004_1"
              geometry={nodes.gym_model_061004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="treadmills003"
            position={[12.9, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122007"
              geometry={nodes.gym_model_122007.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122007_1"
              geometry={nodes.gym_model_122007_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122007_2"
              geometry={nodes.gym_model_122007_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122007_3"
              geometry={nodes.gym_model_122007_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike001"
            position={[6.5, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120005"
              geometry={nodes.gym_model_120005.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120005_1"
              geometry={nodes.gym_model_120005_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120005_2"
              geometry={nodes.gym_model_120005_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120005_3"
              geometry={nodes.gym_model_120005_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike005"
            position={[12.9, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120006"
              geometry={nodes.gym_model_120006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120006_1"
              geometry={nodes.gym_model_120006_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120006_2"
              geometry={nodes.gym_model_120006_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120006_3"
              geometry={nodes.gym_model_120006_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike003"
            position={[9.7, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120007"
              geometry={nodes.gym_model_120007.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120007_1"
              geometry={nodes.gym_model_120007_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120007_2"
              geometry={nodes.gym_model_120007_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120007_3"
              geometry={nodes.gym_model_120007_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike004"
            position={[11.3, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120008"
              geometry={nodes.gym_model_120008.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120008_1"
              geometry={nodes.gym_model_120008_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120008_2"
              geometry={nodes.gym_model_120008_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120008_3"
              geometry={nodes.gym_model_120008_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="bench_press_w_bench001"
            position={[-12, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_090001"
              geometry={nodes.gym_model_090001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_090001_1"
              geometry={nodes.gym_model_090001_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_090001_2"
              geometry={nodes.gym_model_090001_2.geometry}
              material={materials.weights}
            />
          </group>
          <group
            name="plate_holder_wplates003"
            position={[-2, 0.1, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078004"
              geometry={nodes.gym_model_078004.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078004_1"
              geometry={nodes.gym_model_078004_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078004_2"
              geometry={nodes.gym_model_078004_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="incline_ab001"
            position={[-5.4, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022001"
              geometry={nodes.gym_model_022001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022001_1"
              geometry={nodes.gym_model_022001_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="incline_ab002"
            position={[-12, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022002"
              geometry={nodes.gym_model_022002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022002_1"
              geometry={nodes.gym_model_022002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench001"
            position={[-5.3, 1.7, 10.6]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006005"
              geometry={nodes.gym_model_006005.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006005_1"
              geometry={nodes.gym_model_006005_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench002"
            position={[-5.3, 1.7, 8.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006006"
              geometry={nodes.gym_model_006006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006006_1"
              geometry={nodes.gym_model_006006_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench003"
            position={[-5.3, 1.7, 6.4]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006007"
              geometry={nodes.gym_model_006007.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006007_1"
              geometry={nodes.gym_model_006007_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench005"
            position={[-5.3, 1.7, 4.3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006008"
              geometry={nodes.gym_model_006008.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006008_1"
              geometry={nodes.gym_model_006008_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="dumbbell_rack_5001"
            position={[-13.6, 0.1, 5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_050002"
              geometry={nodes.gym_model_050002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_050002_1"
              geometry={nodes.gym_model_050002_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_050002_2"
              geometry={nodes.gym_model_050002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="dumbbell_rack_1001"
            position={[-13.6, 0.1, 7]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_131001"
              geometry={nodes.gym_model_131001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_131001_1"
              geometry={nodes.gym_model_131001_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_131001_2"
              geometry={nodes.gym_model_131001_2.geometry}
              material={materials["red rubber"]}
            />
            <mesh
              name="gym_model_131001_3"
              geometry={nodes.gym_model_131001_3.geometry}
              material={materials["yellow rubber"]}
            />
          </group>
          <group
            name="locker_benches001"
            position={[12.75, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004004"
              geometry={nodes.gym_model_004004.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004004_1"
              geometry={nodes.gym_model_004004_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004004_2"
              geometry={nodes.gym_model_004004_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="locker_benches003"
            position={[7.25, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004005"
              geometry={nodes.gym_model_004005.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004005_1"
              geometry={nodes.gym_model_004005_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004005_2"
              geometry={nodes.gym_model_004005_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="locker_benches004"
            position={[10, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004006"
              geometry={nodes.gym_model_004006.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004006_1"
              geometry={nodes.gym_model_004006_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004006_2"
              geometry={nodes.gym_model_004006_2.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="yoga_mat_2011"
            geometry={nodes.yoga_mat_2011.geometry}
            material={materials["green rubber.001"]}
            position={[-2.75, 0.1, 9]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="gym_floor"
            geometry={nodes.gym_floor.geometry}
            material={materials["rubber-grey"]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 5, 1]}
          />
          <mesh
            name="big_shelves_1"
            geometry={nodes.big_shelves_1.geometry}
            material={materials.dark_wood}
            position={[0, 0.1, -6.8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          />
          <group
            name="chair"
            position={[0, 0.1, -9.16]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_115"
              geometry={nodes.gym_model_115.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_115_1"
              geometry={nodes.gym_model_115_1.geometry}
              material={materials.metal}
            />
          </group>
          <mesh
            name="gym_model_135"
            geometry={nodes.gym_model_135.geometry}
            material={materials["plastic(grey)"]}
            position={[-2.94, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="Left_door"
              position={[5.065, 0.115, 0]}
              ref={leftDoorRef}
            >
              <mesh
                name="gym_model_138"
                geometry={nodes.gym_model_138.geometry}
                material={materials.glass}
              />
              <mesh
                name="gym_model_138_1"
                geometry={nodes.gym_model_138_1.geometry}
                material={materials.rubber}
              />
            </group>
            <group
              name="Right_door"
              position={[0.717, 0.115, 0]}
              ref={rightDoorRef}
            >
              <mesh
                name="gym_model_137"
                geometry={nodes.gym_model_137.geometry}
                material={materials.glass}
              />
              <mesh
                name="gym_model_137_1"
                geometry={nodes.gym_model_137_1.geometry}
                material={materials.rubber}
              />
            </group>
          </mesh>
          <group
            name="front_desk"
            position={[0, 0.12, -9.94]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_112"
              geometry={nodes.gym_model_112.geometry}
              material={materials.Material}
            />
            <mesh
              name="gym_model_112_1"
              geometry={nodes.gym_model_112_1.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="1-window-wall"
            position={[-14.5, 0, -8.72]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133"
              geometry={nodes.gym_model_133.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133_1"
              geometry={nodes.gym_model_133_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall"
            position={[2.84, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136"
              geometry={nodes.gym_model_136.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136_1"
              geometry={nodes.gym_model_136_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <mesh
            name="shelves_1"
            geometry={nodes.shelves_1.geometry}
            material={materials.dark_wood}
            position={[3.37, 0, 8.32]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          />
          <group
            name="incline_ab"
            position={[-8.7, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022"
              geometry={nodes.gym_model_022.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022_1"
              geometry={nodes.gym_model_022_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="empty_bench"
            position={[-8.7, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_059"
              geometry={nodes.gym_model_059.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_059_1"
              geometry={nodes.gym_model_059_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench_press_w_bench"
            position={[-5.4, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_090"
              geometry={nodes.gym_model_090.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_090_1"
              geometry={nodes.gym_model_090_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_090_2"
              geometry={nodes.gym_model_090_2.geometry}
              material={materials.weights}
            />
          </group>
          <group
            name="pullupab_rack"
            position={[11, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_077"
              geometry={nodes.gym_model_077.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_077_1"
              geometry={nodes.gym_model_077_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="punching_bag"
            position={[13, 0.1, 8.1]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_021"
              geometry={nodes.gym_model_021.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_021_1"
              geometry={nodes.gym_model_021_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020"
            position={[3, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020_1"
              geometry={nodes.gym_model_020_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020_2"
              geometry={nodes.gym_model_020_2.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020_3"
              geometry={nodes.gym_model_020_3.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="rolled_towel_2"
            geometry={nodes.rolled_towel_2.geometry}
            material={materials["blue rubber"]}
            position={[3.183, 1.141, 8.1]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="yoga_mat_2"
            geometry={nodes.yoga_mat_2.geometry}
            material={materials["blue rubber"]}
            position={[-6.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group
            name="dumbbell_rack_1"
            position={[-13.6, 0.1, 8.6]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_131"
              geometry={nodes.gym_model_131.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_131_1"
              geometry={nodes.gym_model_131_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_131_2"
              geometry={nodes.gym_model_131_2.geometry}
              material={materials["red rubber"]}
            />
            <mesh
              name="gym_model_131_3"
              geometry={nodes.gym_model_131_3.geometry}
              material={materials["yellow rubber"]}
            />
          </group>
          <group
            name="plate_holder_wplates"
            position={[7, 0.1, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078"
              geometry={nodes.gym_model_078.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078_1"
              geometry={nodes.gym_model_078_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078_2"
              geometry={nodes.gym_model_078_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="empty_dumbbell_rack_short"
            position={[-13.6, 0.1, -2.17]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_108"
              geometry={nodes.gym_model_108.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_108_1"
              geometry={nodes.gym_model_108_1.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="empty_dumbbell_rack"
            geometry={nodes.empty_dumbbell_rack.geometry}
            material={materials.metal}
            position={[-13.6, 0, 0.19]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group
            name="dumbbell_rack_5"
            position={[-13.6, 0.1, 2.8]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_050"
              geometry={nodes.gym_model_050.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_050_1"
              geometry={nodes.gym_model_050_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_050_2"
              geometry={nodes.gym_model_050_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="half_yoga_ball"
            position={[8.67, 0.1, 8.054]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_130"
              geometry={nodes.gym_model_130.geometry}
              material={materials["blue rubber"]}
            />
            <mesh
              name="gym_model_130_1"
              geometry={nodes.gym_model_130_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="3-window-wall001"
            position={[8.601, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136001"
              geometry={nodes.gym_model_136001.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136001_1"
              geometry={nodes.gym_model_136001_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall002"
            position={[-8.72, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136002"
              geometry={nodes.gym_model_136002.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136002_1"
              geometry={nodes.gym_model_136002_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall003"
            position={[-14.5, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136003"
              geometry={nodes.gym_model_136003.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136003_1"
              geometry={nodes.gym_model_136003_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall001"
            position={[-14.5, 0, -2.947]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133001"
              geometry={nodes.gym_model_133001.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133001_1"
              geometry={nodes.gym_model_133001_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall002"
            position={[-14.5, 0, 2.831]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133002"
              geometry={nodes.gym_model_133002.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133002_1"
              geometry={nodes.gym_model_133002_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall003"
            position={[-14.5, 0, 8.597]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133003"
              geometry={nodes.gym_model_133003.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133003_1"
              geometry={nodes.gym_model_133003_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall004"
            position={[-14.5, 0, 14.374]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133004"
              geometry={nodes.gym_model_133004.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133004_1"
              geometry={nodes.gym_model_133004_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <mesh
            name="gym_model_134002"
            geometry={nodes.gym_model_134002.geometry}
            material={materials["plastic(grey)"]}
            position={[-14.5, 0, 14.36]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 1, 1]}
          />
          <mesh
            name="gym_model_134005"
            geometry={nodes.gym_model_134005.geometry}
            material={materials["plastic(grey)"]}
            position={[14.36, 0, 14.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[5.02, 1, 1]}
          />
          <mesh
            name="gym_model_134010"
            geometry={nodes.gym_model_134010.geometry}
            material={materials["plastic(grey)"]}
            position={[2.785, 0, 8.6]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2, 1, 1]}
          />
          <group
            name="locker_benches002"
            position={[4.5, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004002"
              geometry={nodes.gym_model_004002.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004002_1"
              geometry={nodes.gym_model_004002_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004002_2"
              geometry={nodes.gym_model_004002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="treadmills001"
            position={[6.5, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122001"
              geometry={nodes.gym_model_122001.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122001_1"
              geometry={nodes.gym_model_122001_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122001_2"
              geometry={nodes.gym_model_122001_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122001_3"
              geometry={nodes.gym_model_122001_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike002"
            position={[8.1, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120002"
              geometry={nodes.gym_model_120002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120002_1"
              geometry={nodes.gym_model_120002_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120002_2"
              geometry={nodes.gym_model_120002_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120002_3"
              geometry={nodes.gym_model_120002_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="bench004"
            position={[-5.3, 1.7, 2.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006004"
              geometry={nodes.gym_model_006004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006004_1"
              geometry={nodes.gym_model_006004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack001"
            position={[-5, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007001"
              geometry={nodes.gym_model_007001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007001_1"
              geometry={nodes.gym_model_007001_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007001_2"
              geometry={nodes.gym_model_007001_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench001"
            position={[3, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118001"
              geometry={nodes.gym_model_118001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118001_1"
              geometry={nodes.gym_model_118001_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall002"
            position={[14.35, 2, 0.5]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061002"
              geometry={nodes.gym_model_061002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061002_1"
              geometry={nodes.gym_model_061002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="yoga_ball_rack001"
            position={[5.6, 0.1, 8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_017001"
              geometry={nodes.gym_model_017001.geometry}
              material={materials["light_blue rubber"]}
            />
            <mesh
              name="gym_model_017001_1"
              geometry={nodes.gym_model_017001_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_017001_2"
              geometry={nodes.gym_model_017001_2.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="yoga_mat_2001"
            geometry={nodes.yoga_mat_2001.geometry}
            material={materials["green rubber"]}
            position={[-4.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2002"
            geometry={nodes.yoga_mat_2002.geometry}
            material={materials["yellow rubber"]}
            position={[-2.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2003"
            geometry={nodes.yoga_mat_2003.geometry}
            material={materials.rubber}
            position={[-0.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2004"
            geometry={nodes.yoga_mat_2004.geometry}
            material={materials.rubber}
            position={[1.25, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2005"
            geometry={nodes.yoga_mat_2005.geometry}
            material={materials["red rubber"]}
            position={[1.25, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2006"
            geometry={nodes.yoga_mat_2006.geometry}
            material={materials["blue rubber"]}
            position={[-0.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2007"
            geometry={nodes.yoga_mat_2007.geometry}
            material={materials.light_pink}
            position={[-2.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2008"
            geometry={nodes.yoga_mat_2008.geometry}
            material={materials["yellow rubber"]}
            position={[-4.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2009"
            geometry={nodes.yoga_mat_2009.geometry}
            material={materials["red rubber"]}
            position={[-6.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2010"
            geometry={nodes.yoga_mat_2010.geometry}
            material={materials["green rubber"]}
            position={[-2.75, 0.1, 9]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="rolled_towel_2001"
            geometry={nodes.rolled_towel_2001.geometry}
            material={materials["yellow rubber"]}
            position={[2.974, 1.153, 8.102]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2002"
            geometry={nodes.rolled_towel_2002.geometry}
            material={materials.rubber}
            position={[2.982, 1.34, 8.162]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2003"
            geometry={nodes.rolled_towel_2003.geometry}
            material={materials["green rubber"]}
            position={[3.178, 1.323, 8.159]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2004"
            geometry={nodes.rolled_towel_2004.geometry}
            material={materials.light_pink}
            position={[3.494, 1.165, 8.11]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2005"
            geometry={nodes.rolled_towel_2005.geometry}
            material={materials["yellow rubber"]}
            position={[3.694, 1.173, 8.114]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2006"
            geometry={nodes.rolled_towel_2006.geometry}
            material={materials["green rubber"]}
            position={[3.817, 1.311, 8.159]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2007"
            geometry={nodes.rolled_towel_2007.geometry}
            material={materials["red rubber"]}
            position={[3.612, 1.34, 8.167]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2008"
            geometry={nodes.rolled_towel_2008.geometry}
            material={materials["yellow rubber"]}
            position={[3.837, 1.644, 8.266]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2009"
            geometry={nodes.rolled_towel_2009.geometry}
            material={materials.rubber}
            position={[3.654, 1.656, 8.269]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2010"
            geometry={nodes.rolled_towel_2010.geometry}
            material={materials["blue rubber"]}
            position={[3.816, 1.83, 8.326]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2011"
            geometry={nodes.rolled_towel_2011.geometry}
            material={materials.light_pink}
            position={[3.22, 1.66, 8.267]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2012"
            geometry={nodes.rolled_towel_2012.geometry}
            material={materials["green rubber"]}
            position={[3.024, 1.652, 8.263]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2013"
            geometry={nodes.rolled_towel_2013.geometry}
            material={materials["red rubber"]}
            position={[3.223, 0.466, 8]}
          />
          <mesh
            name="rolled_towel_2014"
            geometry={nodes.rolled_towel_2014.geometry}
            material={materials["red rubber"]}
            position={[1.002, 1.236, -7]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2015"
            geometry={nodes.rolled_towel_2015.geometry}
            material={materials["green rubber"]}
            position={[0.791, 1.242, -6.914]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2016"
            geometry={nodes.rolled_towel_2016.geometry}
            material={materials["yellow rubber"]}
            position={[0.915, 1.422, -6.894]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2017"
            geometry={nodes.rolled_towel_2017.geometry}
            material={materials["yellow rubber"]}
            position={[0.417, 1.236, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2018"
            geometry={nodes.rolled_towel_2018.geometry}
            material={materials["light_blue rubber"]}
            position={[-0.32, 1.22, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2019"
            geometry={nodes.rolled_towel_2019.geometry}
            material={materials.light_pink}
            position={[-0.47, 1.349, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2020"
            geometry={nodes.rolled_towel_2020.geometry}
            material={materials["blue rubber"]}
            position={[-0.718, 1.242, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2022"
            geometry={nodes.rolled_towel_2022.geometry}
            material={materials.rubber}
            position={[0.29, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2023"
            geometry={nodes.rolled_towel_2023.geometry}
            material={materials.rubber}
            position={[0.76, 1.727, -6.942]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2024"
            geometry={nodes.rolled_towel_2024.geometry}
            material={materials["red rubber"]}
            position={[-0.11, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2025"
            geometry={nodes.rolled_towel_2025.geometry}
            material={materials["green rubber"]}
            position={[-0.305, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group
            name="ceiling_Light"
            position={[0, 3.42, -5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx001"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode002">
                <group
                  name="CINEMA_4D_Editor001"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4001" />
                </group>
                <group name="Cube001">
                  <mesh
                    name="Cube__0001"
                    geometry={nodes.Cube__0001?.geometry}
                    material={materials["Scene_-_Root.001"]}
                  />
                </group>
                <group name="Symmetry001">
                  <mesh
                    name="Symmetry__0001"
                    geometry={nodes.Symmetry__0001?.geometry}
                    material={materials["Scene_-_Root.001"]}
                  />
                </group>
                <group name="Symmetry_1001">
                  <mesh
                    name="Symmetry_1__0001"
                    geometry={nodes.Symmetry_1__0001?.geometry}
                    material={materials["Scene_-_Root.001"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="CINEMA_4D_Editor"
            position={[10.598, 26.398, -30.444]}
            rotation={[Math.PI, -1.503, 2.293]}
          >
            <group name="Object_4" />
          </group>
          <group
            name="ceiling_Light_1001"
            position={[-7, 3.42, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx002"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode003">
                <group
                  name="CINEMA_4D_Editor002"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4002" />
                </group>
                <group name="Cube002">
                  <mesh
                    name="Cube__0002"
                    geometry={nodes.Cube__0002?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry002">
                  <mesh
                    name="Symmetry__0002"
                    geometry={nodes.Symmetry__0002?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1002">
                  <mesh
                    name="Symmetry_1__0002"
                    geometry={nodes.Symmetry_1__0002?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1002"
            position={[-7, 3.42, -5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx003"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode004">
                <group
                  name="CINEMA_4D_Editor003"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4003" />
                </group>
                <group name="Cube003">
                  <mesh
                    name="Cube__0003"
                    geometry={nodes.Cube__0003?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry003">
                  <mesh
                    name="Symmetry__0003"
                    geometry={nodes.Symmetry__0003?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1003">
                  <mesh
                    name="Symmetry_1__0003"
                    geometry={nodes.Symmetry_1__0003?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1003"
            position={[-7, 3.42, -10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx004"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode005">
                <group
                  name="CINEMA_4D_Editor004"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4004" />
                </group>
                <group name="Cube004">
                  <mesh
                    name="Cube__0004"
                    geometry={nodes.Cube__0004?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry004">
                  <mesh
                    name="Symmetry__0004"
                    geometry={nodes.Symmetry__0004?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1004">
                  <mesh
                    name="Symmetry_1__0004"
                    geometry={nodes.Symmetry_1__0004?.geometry}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1004"
            position={[7, 3.42, 10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx005"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode006">
                <group
                  name="CINEMA_4D_Editor005"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4005" />
                </group>
                <group name="Cube006">
                  <mesh
                    name="Cube__0006"
                    geometry={safeGeometry("Cube__0006")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry006">
                  <mesh
                    name="Symmetry__0006"
                    geometry={safeGeometry("Symmetry__0006")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1006">
                  <mesh
                    name="Symmetry_1__0006"
                    geometry={safeGeometry("Symmetry_1__0006")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1005"
            position={[7, 3.42, 5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx006"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode007">
                <group
                  name="CINEMA_4D_Editor006"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4006" />
                </group>
                <group name="Cube007">
                  <mesh
                    name="Cube__0007"
                    geometry={safeGeometry("Cube__0007")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry007">
                  <mesh
                    name="Symmetry__0007"
                    geometry={safeGeometry("Symmetry__0007")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1007">
                  <mesh
                    name="Symmetry_1__0007"
                    geometry={safeGeometry("Symmetry_1__0007")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1006"
            position={[7, 3.42, -10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx007"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode008">
                <group
                  name="CINEMA_4D_Editor007"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4007" />
                </group>
                <group name="Cube008">
                  <mesh
                    name="Cube__0008"
                    geometry={safeGeometry("Cube__0008")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry008">
                  <mesh
                    name="Symmetry__0008"
                    geometry={safeGeometry("Symmetry__0008")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1008">
                  <mesh
                    name="Symmetry_1__0008"
                    geometry={safeGeometry("Symmetry_1__0008")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1007"
            position={[7, 3.42, -5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx008"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode009">
                <group
                  name="CINEMA_4D_Editor008"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4008" />
                </group>
                <group name="Cube009">
                  <mesh
                    name="Cube__0009"
                    geometry={safeGeometry("Cube__0009")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry009">
                  <mesh
                    name="Symmetry__0009"
                    geometry={safeGeometry("Symmetry__0009")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1009">
                  <mesh
                    name="Symmetry_1__0009"
                    geometry={safeGeometry("Symmetry_1__0009")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1008"
            position={[7, 3.42, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx009"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode010">
                <group
                  name="CINEMA_4D_Editor009"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4009" />
                </group>
                <group name="Cube010">
                  <mesh
                    name="Cube__0010"
                    geometry={safeGeometry("Cube__0010")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry010">
                  <mesh
                    name="Symmetry__0010"
                    geometry={safeGeometry("Symmetry__0010")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1010">
                  <mesh
                    name="Symmetry_1__0010"
                    geometry={safeGeometry("Symmetry_1__0010")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1009"
            position={[0, 3.42, -10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx010"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode011">
                <group
                  name="CINEMA_4D_Editor010"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4010" />
                </group>
                <group name="Cube011">
                  <mesh
                    name="Cube__0011"
                    geometry={safeGeometry("Cube__0011")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry011">
                  <mesh
                    name="Symmetry__0011"
                    geometry={safeGeometry("Symmetry__0011")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1011">
                  <mesh
                    name="Symmetry_1__0011"
                    geometry={safeGeometry("Symmetry_1__0011")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1010"
            position={[0, 3.42, 10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx011"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode012">
                <group
                  name="CINEMA_4D_Editor011"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4011" />
                </group>
                <group name="Cube012">
                  <mesh
                    name="Cube__0012"
                    geometry={safeGeometry("Cube__0012")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry012">
                  <mesh
                    name="Symmetry__0012"
                    geometry={safeGeometry("Symmetry__0012")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1012">
                  <mesh
                    name="Symmetry_1__0012"
                    geometry={safeGeometry("Symmetry_1__0012")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1011"
            position={[0, 3.42, 5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx012"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode013">
                <group
                  name="CINEMA_4D_Editor012"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4012" />
                </group>
                <group name="Cube013">
                  <mesh
                    name="Cube__0013"
                    geometry={safeGeometry("Cube__0013")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry013">
                  <mesh
                    name="Symmetry__0013"
                    geometry={safeGeometry("Symmetry__0013")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1013">
                  <mesh
                    name="Symmetry_1__0013"
                    geometry={safeGeometry("Symmetry_1__0013")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1012"
            position={[0, 3.42, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx013"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode014">
                <group
                  name="CINEMA_4D_Editor013"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4013" />
                </group>
                <group name="Cube014">
                  <mesh
                    name="Cube__0014"
                    geometry={safeGeometry("Cube__0014")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry014">
                  <mesh
                    name="Symmetry__0014"
                    geometry={safeGeometry("Symmetry__0014")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1014">
                  <mesh
                    name="Symmetry_1__0014"
                    geometry={safeGeometry("Symmetry_1__0014")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            name="ceiling_Light_1014"
            position={[-7, 3.42, 10]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group
              name="b0ada5875fd342f09c431cbe4002bffdfbx014"
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <group name="RootNode015">
                <group
                  name="CINEMA_4D_Editor014"
                  position={[10.598, 26.398, -30.444]}
                  rotation={[Math.PI, -1.503, 2.293]}
                >
                  <group name="Object_4014" />
                </group>
                <group name="Cube015">
                  <mesh
                    name="Cube__0015"
                    geometry={safeGeometry("Cube__0015")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry015">
                  <mesh
                    name="Symmetry__0015"
                    geometry={safeGeometry("Symmetry__0015")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
                <group name="Symmetry_1015">
                  <mesh
                    name="Symmetry_1__0015"
                    geometry={safeGeometry("Symmetry_1__0015")}
                    material={materials["Scene_-_Root.002"]}
                  />
                </group>
              </group>
            </group>
          </group>

          <mesh
            name="gym_ceiling"
            geometry={nodes.gym_ceiling.geometry}
            material={materials["rubber-grey"]}
            position={[0, 3.462, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 5, 0.48]}
          />

          {/* Locker room models */}

          {currentView === "projects" && (
            <>
              {/* 3D project models removed - lockers are now empty */}
            </>
          )}
        </group>
      </a.group>
    </>
  );
};

export default Gym;
