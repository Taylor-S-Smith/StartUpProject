import { useNavigate } from "react-router-dom"
import './weave.css'

export function Weave() {

    return (
      <>
        <h1>All things are connected...</h1>

        <div className="my-3" id="weaveDependencyGraph">
        
        <div id="graphBorder" className="my-5">
            <div className="mb-3">
                <b>Properly creating this dependency graph will require learning a third party java-script library</b>
            </div>
            <div>
            Chapter 1 -{">"} Chapter 2 -{">"} Chapter 6
            </div>
            <div>
            |-{">"} Chapter 3 -{">"} Chapter 4
            </div>
            <div>
                |-Chapter 5
            </div>
        </div>
        
        </div>
        
        <div>
        <div id="pageCount">
            Total Pages So Far: Connect to database
        </div>
        <div id="choiceCount">
            Total Choices So Far: Connect to database
        </div>  
        </div>
      </>
    );
}