/* eslint-disable @typescript-eslint/no-explicit-any */
// Minimal JSX intrinsic elements to satisfy TS in this project for react-three-fiber
// This avoids noisy type errors for Three elements used as JSX tags.
declare namespace JSX {
  interface IntrinsicElements {
    points: any;
    bufferGeometry: any;
    bufferAttribute: any;
    pointsMaterial: any;
    ambientLight: any;
    pointLight: any;
    mesh: any;
    sphereGeometry: any;
    meshStandardMaterial: any;
  }
}
