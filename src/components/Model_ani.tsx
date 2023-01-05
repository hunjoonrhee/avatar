/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from 'three'
import React, {useEffect, useRef} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Body: THREE.SkinnedMesh
    Wolf3D_Glasses: THREE.SkinnedMesh
    Wolf3D_Hair: THREE.SkinnedMesh
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
    Wolf3D_Outfit_Top: THREE.SkinnedMesh
    EyeLeft: THREE.SkinnedMesh
    EyeRight: THREE.SkinnedMesh
    Wolf3D_Head: THREE.SkinnedMesh
    Wolf3D_Teeth: THREE.SkinnedMesh
    Hips: THREE.Bone
  }
  materials: {
    ['Wolf3D_Body.001']: THREE.MeshStandardMaterial
    ['Wolf3D_Glasses.001']: THREE.MeshStandardMaterial
    Wolf3D_Hair: THREE.MeshStandardMaterial
    ['Wolf3D_Outfit_Bottom.001']: THREE.MeshStandardMaterial
    ['Wolf3D_Outfit_Footwear.001']: THREE.MeshStandardMaterial
    ['Wolf3D_Outfit_Top.001']: THREE.MeshStandardMaterial
    ['Wolf3D_Eye.001']: THREE.MeshStandardMaterial
    Wolf3D_Skin: THREE.MeshStandardMaterial
    ['Wolf3D_Teeth.001']: THREE.MeshStandardMaterial
    animations: GLTFAction[];
  }
}

type ActionName = 'Armature|mixamo.com|Layer0'
interface GLTFAction extends THREE.AnimationClip {
name: ActionName;
}

export default function ModelAni(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/model_ani.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)
  useEffect(()=>{
    actions['Armature|mixamo.com|Layer0']!.play();
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials['Wolf3D_Body.001']} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh name="Wolf3D_Glasses" geometry={nodes.Wolf3D_Glasses.geometry} material={materials['Wolf3D_Glasses.001']} skeleton={nodes.Wolf3D_Glasses.skeleton} />
          <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials['Wolf3D_Outfit_Bottom.001']} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials['Wolf3D_Outfit_Footwear.001']} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials['Wolf3D_Outfit_Top.001']} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials['Wolf3D_Eye.001']} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials['Wolf3D_Eye.001']} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials['Wolf3D_Teeth.001']} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model_ani.glb')
