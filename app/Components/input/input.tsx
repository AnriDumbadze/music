import style from './input.module.scss'

interface Props{
    placeholder?:string;
    type:string;
    width?:string;
    height?:string;
    padding?:string;
    bordeRadius?:string;
    border?:string;
    outline?:string;
    backgroundColor?:string;
    color?:string
}

export default function Input(props:Props){
    const styleInput = {
        width:props.width,
        height:props.height,
        padding:props.padding,
        borderRadius:props.bordeRadius,
        border:props.border,
        outline:props.outline,
        backgroundColor:props.backgroundColor,
        color:props.color
    }
    return (
        <>
        <input type={props.type} placeholder={props.placeholder} style={styleInput} />
        </>
    )
}