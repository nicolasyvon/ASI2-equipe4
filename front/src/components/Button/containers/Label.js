import "./Label.css"

export const Label =(props)=>{
  return (
    <div className={props.title+"-label"}>
      {props.title}     
    </div>

);
}