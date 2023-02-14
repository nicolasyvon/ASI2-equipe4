import React, { useEffect, useState } from "react"
import CardDisplay from "../card/CardDisplay"

export const GameField = () => {
    return (
        <div class="ui segment" style={{height:'100%'}}>
        <div class="ui grid">
            <div class="four wide column">
                    <div id="chatContent"></div> 
            </div>
            <div class="twelve wide column">
                        <div class="row">
                                <div class="ui grid">
                                        <div class="two wide column">
                                                <div class="ui one  column grid">    
                                                        <div class="row">                   
                                                                <div class="column"> <i class="user circle huge icon "></i></div>
                                                        </div>
                                                        <div class="row">
                                                                <div class=" column">Player A</div>      
                                                         </div>     
                                                         
                                                         <div class="row">
                                                                 <div class="column">
                                                                        <div class="ui teal progress" data-percent="74" id="progressBarId1" >
                                                                            <div class="label">Action Points</div>
                                                                            <div class="bar"></div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="ten wide column">
                                                <div class="ui four column grid">
                                                        <div class="column">
                                                                <div id="shortCardA1">
                                                                    CardA <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA2">CardA <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA3">CardA <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA4">CardA <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="four wide column">
                                                <div id="fullCardA1">Card A1 <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                        </div>
                                </div>
                        </div>

                        <div class="row">
                                <div class="ui grid ">
                                        <div class="twelve wide column">
                                                <h4 class="ui horizontal divider header">
                                                                VS
                                                </h4>                                                        
                                        </div>
                                        <div class="four wide column">
                                                <button class="huge ui primary button">
                                                                Attack
                                                </button>
                                        </div>
                                </div>
                        </div>


                        <div class="row">
                                        <div class="ui grid">
                                                <div class="two wide column">
                                                        <div class="ui one  column grid">    
                                                                <div class="row">                   
                                                                        <div class="column"> <i class="user circle huge icon "></i></div>
                                                                </div>    
                                                                <div class="row">
                                                                        <div class=" column">Player B</div>      
                                                                 </div>     
                                                                 <div class="row">
                                                                        <div class="column">
                                                                                <div class="ui teal progress" data-percent="80" id="progressBarId2" >
                                                                                    <div class="bar"></div>     
                                                                                    <div class="label">Action Points</div>                                                                                   
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                     
                                                                 
                                                        </div>
                                                </div>
                                                <div class="ten wide column">
                                                        <div class="ui four column grid">
                                                                <div class="column">
                                                                        <div id="shortCardB1">CardB <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB2">CardB <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB3">CardB <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB4">CardB <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="four wide column">
                                                        <div id="fullCardB1">CardB1 <br/>
                                                                <CardDisplay></CardDisplay></div> 
                                                </div>
                                        </div>
                                </div>





                </div> 
        </div>
</div>
    );
  };