uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() {

    vec3 newPosition = position;

    //Twist
    float twistPerlin = texture2D(uPerlinTexture, vec2(0.5, uv.x * 0.2 - uTime * 0.005)).r;
    float angle = twistPerlin * 10.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    //Wind
    vec2 windOffset = vec2(texture2D(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5, texture2D(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5);
    windOffset *= pow(uv.x, 2.0);
    newPosition.xz += windOffset;

    //Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    //varyings
    vUv = uv;

}