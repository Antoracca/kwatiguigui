import React, { useRef, useEffect, useState } from 'react';
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";
import { CheckCircle } from "@phosphor-icons/react";
import Link from 'next/link';

// --- Internal Helper Components (Not exported) --- //

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([1.0, 1.0, 1.0]);

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      const isDark = root.classList.contains('dark');
      setBackgroundColor(isDark ? [0.039, 0.039, 0.039] : [1.0, 1.0, 1.0]); // neutral-950 approx for dark
    };
    updateColor();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColor();
        }
      }
    });
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        // Adapted to Kussala colors (blueish/greenish tint instead of default)
        vec3 foregroundColor=vec3(v.x * 0.5, 0.5 + v.y * 0.5, 0.8 - v.y*v.x);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute top-0 -left-[50%] w-[200%] md:left-0 md:w-full h-[550px] md:h-full z-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] md:[mask-image:none]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};


// --- EXPORTED Building Blocks --- //

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  suffix?: string;
  features: string[];
  buttonText: string;
  buttonLink?: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
}

export const PricingCard = ({
  planName, description, price, suffix = "/ mois", features, buttonText, buttonLink = "/register", isPopular = false, buttonVariant = 'primary'
}: PricingCardProps) => {
  const cardClasses = `
    bg-white dark:bg-neutral-900 rounded-3xl shadow-xl flex-1 w-full max-w-sm mx-auto px-6 py-8 md:px-8 md:py-10 flex flex-col transition-all duration-300
    border border-neutral-200/50 dark:border-neutral-800/50
    ${isPopular ? 'md:scale-105 relative ring-2 ring-primary-500/30 dark:ring-primary-500/50 shadow-2xl z-10' : 'z-0'}
  `;
  const buttonClasses = `
    mt-auto w-full py-3.5 rounded-xl font-bold text-sm transition-all
    ${buttonVariant === 'primary' 
      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20' 
      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white dark:border-neutral-700'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-6 px-4 py-1.5 text-xs font-black rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg shadow-primary-500/30 uppercase tracking-widest">
          Recommandé
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 dark:text-white font-heading uppercase">{planName}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{description}</p>
      </div>
      <div className="my-6 md:my-8 flex items-baseline gap-2 flex-wrap">
        <span className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white font-heading">{price}</span>
        {price !== "Sur Devis" && (
          <>
            <span className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mt-1">FCFA</span>
            <span className="text-sm font-bold text-neutral-400 whitespace-nowrap">{suffix}</span>
          </>
        )}
      </div>
      <div className="card-divider w-full mb-6 md:mb-8 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]"></div>
      <ul className="flex flex-col gap-3 md:gap-4 text-sm text-neutral-700 dark:text-neutral-300 mb-8 md:mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="text-primary-500 w-5 h-5 shrink-0 mt-0.5" weight="fill" /> 
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={buttonLink} className="w-full mt-auto block">
        <RippleButton className={buttonClasses.trim()}>{buttonText}</RippleButton>
      </Link>
    </div>
  );
};


// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950 py-24 sm:py-32" id="tarifs">
      {showAnimatedBackground && <ShaderCanvas />}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 justify-center items-stretch w-full">
          {plans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
        </div>
      </div>
    </section>
  );
};
