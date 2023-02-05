import "./Visual.css"
export const Visual=(props) =>{
    return(
        <div>
            <img alt='button description'
            className={props.title}
            src={props.src}  
            />
        </div>   
    );
}