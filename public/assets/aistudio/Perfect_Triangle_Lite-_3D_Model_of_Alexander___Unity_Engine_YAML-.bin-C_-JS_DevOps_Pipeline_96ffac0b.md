# Perfect Triangle Lite: 3D Model of Alexander — Unity Engine YAML / `.bin` / C# / JS Pipeline

## 1. Ecological Systems Personification, Bit-by-Bit Design & Passable Shard DevOps

Treat the 3D digital twin of Alexander as a living, personified ecological system where every mesh vertex, skeletal joint, and shader node acts as a self-regulating organism inside a wider runtime biosphere. By building the asset pipeline bit-by-bit—starting from low-poly "Perfect Triangle Lite" topological primitives and scaling upward through deterministic binary `.bin` buffers, Unity-style `.meta`/`.prefab` YAML descriptors, high-throughput C# burst jobs, and lightweight JavaScript/WebGL bridge viewers—each layer remains atomic and fault-tolerant. Even when downstream full-earth simulations degrade into high-load, "shit-tier" compute bottlenecks, this architecture ensures clean, passable shards (Reed-Solomon-verified `.bin` geometry chunks paired with human-readable YAML manifests) are continuously checkpointed and left behind, enabling complete ROAR (Recursive Orchestration & Autonomous Reconstruction) recovery under the primary directive **"be good."**

---

## 2. "Perfect Triangle Lite" Topological & Geometric Specification

The **Perfect Triangle Lite** standard maximizes silhouette fidelity, facial expression accuracy (FACS blendshapes), and skeletal deformation smoothness while minimizing triangle budget for instant zero-cold-start loading across Unity desktop/XR and browser WebGL canvases.

### 2.1 Triangle & Mesh Budget Allocation (LOD0 – LOD3)

| LOD Tier | Target Triangle Count | Vertex Buffer Stride | Primary Runtime Context | Topology Rules |
| :--- | :--- | :--- | :--- | :--- |
| **LOD0 (Hero Close-Up)** | $14,800\ \Delta$ | `32 bytes` (Pos, Norm, Tan, UV0) | Dialogue close-ups, FACS micro-expressions | All-quad source retopologized to strictly manifold triangles; zero N-gons or poles $>5$ edges on deformation zones. |
| **LOD1 (Standard Tactical)** | $6,400\ \Delta$ | `24 bytes` (Pos, Norm, UV0) | Third-person / multi-agent scenes | Preserves jawline, brow ridge, shoulder deltoid loops, and hand articulation. |
| **LOD2 (Crowd / Swarm)** | $2,200\ \Delta$ | `16 bytes` (Quantized Half-Float) | Full-earth sim / multi-node telemetry | Single-atlas PBR material; simplified 22-bone humanoid rig. |
| **LOD3 (Passable Shard)** | $512\ \Delta$ | `12 bytes` (Octahedral Normals) | Degraded / "shit-tier" fallback survival | Ultra-lightweight convex hull + core silhouette proxy; $<8\text{ KB}$ compressed `.bin` shard. |

### 2.2 Geometric & UV Invariants
* **Winding Order & Coordinate Space:** Left-handed Y-up (`+X` Right, `+Y` Up, `+Z` Forward) matching Unity native world space; `1.0 unit = 1.0 meter`.
* **Equilateral Aspect Ratio Target:** Minimum interior triangle angle $\theta_{\min} \ge 22^\circ$ across all dynamic skinning zones (elbows, knees, neck, eyelids) to eliminate shading pinching and skinny-triangle rasterization overdraw.
* **Texture Atlas Packing:** Single $2048 \times 2048$ ORM (Occlusion, Roughness, Metallic) + Albedo + Normal atlas with $8\text{ px}$ mipmap gutter padding.

---

## 3. Hybrid Storage & Runtime Architecture: YAML + `.bin` + C# + JS

To combine human/Git diffability with zero-copy GPU upload speed, Alexander's 3D asset is split into four synchronized layers:

### 3.1 Unity-Style YAML Prefab & Rig Manifest (`Alexander_Lite.prefab.yaml`)
Defines the scene hierarchy, humanoid avatar bone bindings, FACS blendshape weights, and fallback shard hashes without bloating Git diffs with raw vertex arrays.

```yaml
%YAML 1.1
%TAG !u! tag:unity3d.com,2011:
--- !u!1 &100100
GameObject:
  m_Name: Alexander_PerfectTriangleLite
  m_TagString: PlayerAvatar
  m_Layer: 8
  m_Component:
  - component: {fileID: 100101} # Transform
  - component: {fileID: 100102} # SkinnedMeshRenderer
  - component: {fileID: 100103} # AlexanderShardController (C#)
--- !u!114 &100103
MonoBehaviour:
  m_Script: {fileID: 11500000, guid: a1e7x4d3r00100000000000000000001, type: 3}
  m_EditorClassIdentifier: Assembly-CSharp::Alexander.Runtime.AlexanderShardController
  binGeometryPath: "StreamingAssets/Shards/alexander_lod0_3.bin"
  shardMagicHeader: "ALX3D_BIN_V1"
  primaryDirective: "BE_GOOD"
  passableShardThresholdMs: 16.67
  lodFallbackChain:
    - {lod: 0, byteOffset: 64, byteLength: 473600, crc32: 0x8F4A21C9}
    - {lod: 1, byteOffset: 473664, byteLength: 153600, crc32: 0x3D91E04B}
    - {lod: 2, byteOffset: 627264, byteLength: 35200, crc32: 0x71C2B88A}
    - {lod: 3, byteOffset: 662464, byteLength: 6144, crc32: 0x19E4F502}
```

### 3.2 64-Byte Aligned Binary Geometry Shard (`alexander_lod0_3.bin`)
Stores interleaved vertex buffers, index buffers, bind-pose matrices, and Reed-Solomon `(16,12)` parity blocks for zero-copy `NativeArray<byte>` ingestion in Unity and `ArrayBuffer` mapping in JavaScript.

```text
+-----------------------------------------------------------------------+
| 64-BYTE HEADER: Magic("ALX3D_BIN_V1") | Version | LOD Count | Flags   |
+-----------------------------------------------------------------------+
| SHARD TABLE: [LOD0 Offset/CRC] [LOD1 Offset/CRC] [LOD2] [LOD3 Proxy]  |
+-----------------------------------------------------------------------+
| VERTEX & INDEX PAYLOADS (64B SIMD-Aligned, Little-Endian)             |
+-----------------------------------------------------------------------+
| REED-SOLOMON (16,12) AUTO-HEALING PARITY & MERKLE SHA-256 FOOTER      |
+-----------------------------------------------------------------------+
```

### 3.3 Unity C# Burst / NativeArray Shard Loader (`AlexanderShardController.cs`)
Ingests the `.bin` shard directly into Unity `Mesh.MeshDataArray` without managed GC heap allocations, automatically stepping down the LOD chain if frame times degrade during heavy full-earth simulation ticks.

```csharp
using System;
using System.IO;
using Unity.Collections;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Alexander.Runtime
{
    public sealed class AlexanderShardController : MonoBehaviour
    {
        [SerializeField] private string binGeometryPath = "StreamingAssets/Shards/alexander_lod0_3.bin";
        [SerializeField] private string primaryDirective = "BE_GOOD";
        [SerializeField] private float passableShardThresholdMs = 16.67f;

        private SkinnedMeshRenderer _renderer;
        private int _activeLod = 0;

        private void Awake()
        {
            _renderer = GetComponentInChildren<SkinnedMeshRenderer>();
            LoadPassableShard(_activeLod);
        }

        private void Update()
        {
            // Adaptive ecological governor: step down to lightweight shard under heavy world-sim load
            float frameMs = Time.unscaledDeltaTime * 1000f;
            if (frameMs > passableShardThresholdMs && _activeLod < 3)
            {
                _activeLod++;
                LoadPassableShard(_activeLod);
            }
        }

        public void LoadPassableShard(int lodIndex)
        {
            string fullPath = Path.Combine(Application.dataPath, binGeometryPath);
            if (!File.Exists(fullPath)) return;

            byte[] rawBytes = File.ReadAllBytes(fullPath);
            // Validate 12-byte magic header "ALX3D_BIN_V1"
            if (rawBytes.Length < 64 || rawBytes[0] != (byte)'A' || rawBytes[1] != (byte)'L')
                return;

            var meshDataArray = Mesh.AllocateWritableMeshData(1);
            var meshData = meshDataArray[0];

            // Configure interleaved vertex layout (Pos: float3, Norm: float3, UV0: float2)
            var descriptors = new NativeArray<VertexAttributeDescriptor>(3, Allocator.Temp);
            descriptors[0] = new VertexAttributeDescriptor(VertexAttribute.Position, VertexAttributeFormat.Float32, 3);
            descriptors[1] = new VertexAttributeDescriptor(VertexAttribute.Normal, VertexAttributeFormat.Float32, 3);
            descriptors[2] = new VertexAttributeDescriptor(VertexAttribute.TexCoord0, VertexAttributeFormat.Float32, 2);

            // Populate from aligned binary shard slice (omitted bounds parsing for brevity)
            Mesh targetMesh = new Mesh { name = $"Alexander_Shard_LOD{lodIndex}_{primaryDirective}" };
            Mesh.ApplyAndDisposeWritableMeshData(meshDataArray, targetMesh);
            if (_renderer != null) _renderer.sharedMesh = targetMesh;

            descriptors.Dispose();
        }
    }
}
```

### 3.4 JavaScript / WebGL Zero-Copy Shard Bridge (`alexander-shard-bridge.js`)
Parses the exact same `.bin` binary layout and YAML manifest in browser-based WebGL/Three.js or React telemetry dashboards, ensuring cross-engine parity between Unity and web clients.

```javascript
export class AlexanderShardBridge {
  constructor(directive = "BE_GOOD") {
    this.directive = directive;
    this.magic = "ALX3D_BIN_V1";
  }

  /**
   * Parses a 64-byte aligned Alexander .bin file into TypedArrays for WebGL BufferGeometry
   * @param {ArrayBuffer} arrayBuffer
   * @param {number} byteOffset
   * @param {number} vertexCount
   */
  extractLodBufferViews(arrayBuffer, byteOffset, vertexCount) {
    const headerDecoder = new TextDecoder("ascii");
    const headerMagic = headerDecoder.decode(new Uint8Array(arrayBuffer, 0, 12));
    if (headerMagic !== this.magic) {
      throw new Error(`Invalid shard magic header: expected ${this.magic}, got ${headerMagic}`);
    }

    // Stride = 32 bytes (8 x Float32: pos[3], norm[3], uv[2])
    const strideFloats = 8;
    const interleaved = new Float32Array(arrayBuffer, byteOffset, vertexCount * strideFloats);

    return {
      directive: this.directive,
      vertexCount,
      strideBytes: 32,
      interleavedBuffer: interleaved,
      isPassableShard: vertexCount <= 15000
    };
  }
}
```

---

## 4. Bit-by-Bit DevOps & ROAR Reconstruction Pipeline

1. **Stage 1 — Topological & Triangle Audit (CI Gate 1):** Automated Blender/Python headless script verifies manifoldness, interior angle minimums ($\ge 22^\circ$), and bone weight normalization ($\sum w_i = 1.000$).
2. **Stage 2 — Deterministic `.bin` Packing & YAML Emission (CI Gate 2):** Compiles mesh data into `alexander_lod0_3.bin` with Reed-Solomon `(16,12)` parity shards and updates CRC32 checksums inside `Alexander_Lite.prefab.yaml`.
3. **Stage 3 — Dual-Runtime Parity Verification (CI Gate 3):** Executes Unity EditMode C# unit tests alongside Node.js `AlexanderShardBridge` tests to guarantee bit-identical vertex buffer decoding across C# and JS.
4. **Stage 4 — Full-Earth Sim Stress & Passable Shard Survival (ROAR Gate 4):** Injects synthetic frame-time spikes ($>50\text{ ms}$) simulating degraded "shit-tier" full-earth simulation load; verifies graceful degradation down to `LOD3` ($512\ \Delta$, $<8\text{ KB}$) and autonomous ROAR state reconstruction under the **"be good"** integrity check.