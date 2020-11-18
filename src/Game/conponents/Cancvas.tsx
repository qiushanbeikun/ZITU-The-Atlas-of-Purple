import React, {useRef, useEffect} from 'react'

export const Canvas = (props:any) => {

    const canvasRef = useRef();

    const draw = (ctx: any, frameCount: any) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#999999';
        ctx.beginPath();
        ctx.arc(500, 500, 100 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    };

    useEffect(() => {

        const canvas = canvasRef.current;
        // @ts-ignore
        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId: any;

        //Our draw came here
        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render)
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw]);

    return <canvas width="1000" height="1000" ref={canvasRef} {...props}/>
};

