import "./ChatBox.css";

export const ChatBox= (props) =>{
    return(
        <div className='chatBox'>
            <div className="message">
            <input type="text" className='inputMessages'/>
            <button className="sendButton">
                Button
            </button>
            </div>
            <div className="chat"></div>
            <div className="information">
                <div className="userBattle">
                    <img alt="imageUser" src="/images/user.png" className="imageUser"/>
                </div>
                <select className="selectFriend">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </div>
        </div>
        );
}