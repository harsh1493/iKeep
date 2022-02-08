import React,{useState} from "react";
import Tooltip from '@mui/material/Tooltip';
const ColorPalette = (props) => {
    const [color, setColor] = useState("Default");
    const{note,setBackground}=props;
    const setcolor = (color) => {
      setColor(color);
    
    setBackground(color,note);
     
    };
    
    return (
        <div className="absolute h-12 p-2 w-fit hover:cursor-pointer  -bottom-8 bg-white border-2 rounded-lg flex space-x-2 shadow-xl">
            <Tooltip title="Default"><div onClick={()=>{setcolor("Default")}} className={`w-7 h-7 rounded-full bg-white  border-2 ${color==="Default"?"border-blue-500":"border-gray-"} hover:border-2 border-grey relative`}><i class="fas fa-tint-slash absolute left-1 mr-1 h-1 w-10"></i>{color==="Default"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Red"><div onClick={()=>{setcolor("red");}} className={`w-7 h-7 rounded-full  bg-red-400 border-2 ${color==="red"?"border-blue-500":"border-white"} hover:border-2 ${color==="red"?"border-blue-500":"border-black"}  relative`}>{color==="red"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Yellow"><div onClick={()=>{setcolor("yellow")}} className={`w-7 h-7 rounded-full  bg-yellow-400 border-2 ${color==="yellow"?"border-blue-500":"border-white"} hover:border-2 ${color==="yellow"?"border-blue-500":"border-black"}  relative`}>{color==="yellow"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Blue"><div onClick={()=>{setcolor("blue")}} className={`w-7 h-7 rounded-full  bg-blue-400 border-2 ${color==="blue"?"border-blue-500":"border-white"} hover:border-2 ${color==="blue"?"border-blue-500":"border-black"}  relative`}>{color==="blue"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Green"><div onClick={()=>{setcolor("green")}} className={`w-7 h-7 rounded-full  bg-green-400 border-2 ${color==="green"?"border-blue-500":"border-white"} hover:border-2 ${color==="green"?"border-blue-500":"border-black"}  relative`}>{color==="green"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Violet"><div onClick={()=>{setcolor("violet")}} className={`w-7 h-7 rounded-full  bg-violet-400 border-2 ${color==="violet"?"border-blue-500":"border-white"} hover:border-2 ${color==="violet"?"border-blue-500":"border-black"}  relative`}>{color==="violet"?<Selected/>:""}</div></Tooltip>
            <Tooltip title="Orange"><div onClick={()=>{setcolor("orange")}} className={`w-7 h-7 rounded-full  bg-orange-400 border-2 ${color==="orange"?"border-blue-500":"border-white"} hover:border-2 ${color==="orange"?"border-blue-500":"border-black"}  relative`}>{color==="orange"?<Selected/>:""}</div></Tooltip>
        </div>);
};

const Selected = () => {
    return (
        <div className='w-3 h-3 rounded-full bg-blue-600 z-10 absolute bottom-4 left-4'>
    <i className="fas fa-check text-white z-20 absolute top-1 righ-4" style={{fontSize:"6px"}}></i>
        </div>
    );
}

export default ColorPalette;