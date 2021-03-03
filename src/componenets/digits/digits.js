import {React, useEffect, useState} from 'react'
import "./digits.css"

import axios from "axios"

function Digits() {
    useEffect(()=>{
        document.getElementById("digits-canvas").height = window.innerHeight/2
        document.getElementById("digits-canvas").width = window.innerWidth/2

        let canvas = document.getElementById("digits-canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#474A4F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setDrawing(ctx, canvas)
        document.getElementById("digits-pen").onclick = ()=>{
            ctx.strokeStyle = "white"
        }
        document.getElementById("digits-eraser").onclick =()=>{
            ctx.strokeStyle = "#474A4F"
        }

        Detect()
    },[])

    const [prediction, setPrediction] = useState()
    // ============================================

    const setDrawing = (ctx, canvas)=>{
        let mouseDown = false
        let pos = {x:0, y:0}
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 10
        ctx.lineCap = 'round';

        // making background black
        canvas.onmousedown = (e)=>{
            mouseDown = true
        }
        canvas.onmouseup = (e)=>{
            mouseDown = false
        }
        canvas.onmousemove = (e)=>{
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
            let newPos = {x:e.clientX-canvas.getBoundingClientRect().left, y:e.clientY-canvas.getBoundingClientRect().top}
            if (mouseDown){
                ctx.lineTo(newPos.x, newPos.y)
            }
            ctx.stroke()
            pos = newPos
        }

        // ---
        let touch
        canvas.ontouchstart = (e)=>{
            mouseDown = true
            touch = e.touches[0]

            pos = {x:touch.clientX-canvas.getBoundingClientRect().left, y:touch.clientY-canvas.getBoundingClientRect().top}
        }
        canvas.ontouchend = (e)=>{
            mouseDown = false
        }
        canvas.ontouchmove = (e)=>{
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
            let newPos
            touch = e.touches[0]
            // setGuess(touch.clientX)
            if(touch){
                newPos = {x:touch.clientX-canvas.getBoundingClientRect().left, y:touch.clientY-canvas.getBoundingClientRect().top}
            }
            if (mouseDown){
                ctx.lineTo(newPos.x, newPos.y)
            }
            ctx.stroke()
            pos = newPos
        }
    }

    const Detect = (e)=>{
        let canvas = document.getElementById("digits-canvas")
        // let ctx = canvas.getContext("2d");
        // console.log(canvas.toDataURL("image/png"))
        let image = canvas.toDataURL("image/png")
        // console.log(Array.from(image.data))
        // let req = {
        //     image: image.data,
        //     height: window.innerHeight/2,
        //     width: window.innerWidth/2
        // }
        // let data = new FormData()
        // data.append('image', Array.from(image.data))
        // data.append('height', image.height)
        // data.append('width', image.width)
        axios({
            method:'post',
            url:"https://mlturingtest.herokuapp.com/digits/",
            data:{
                image: image,
                height: window.innerHeight/2,
                width: window.innerWidth/2
            }
        }).then(res=>{
            setPrediction(res.data)
        })
    }


    return (
        <div className="digits">
            <div className="digits-buttons">
                <button id="digits-pen">
                    <i class="fas fa-pen"></i>
                </button>
                <button id="digits-eraser">
                    <i class="fas fa-eraser"></i>
                </button>
                <button id="digits-detect" onClick={Detect}>
                    Detect
                </button>
            </div>
            <canvas className="digcanvasits-" id="digits-canvas">
            </canvas>
            {
                prediction?<div className="digits-prediction">
                    Prediction : {prediction.reverse()}
                </div>:
                <div className="digits-prediction"></div>
            }
        </div>
    )
}

export default Digits
