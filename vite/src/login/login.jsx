import './login.css'
import AnAdventureAwaits from '/src/assets/AnAdventureAwaits.png';

export function Login() {

    return (
      <>
        <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-5 py-3">
                <img src={AnAdventureAwaits} className="img-fluid" alt="A hero begins his journey"/>
            </div>
        </div>
        
        <div className="text-center">
            <div className="row justify-content-center pb-4">
                <div className="col-md-6 col-11">
                    <h3>
                        Welcome to Storyweave, An Adventure Awaits!
                    </h3>
                    <div className="row justify-content-center">
                        <div className="pt-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Type your email"/>
                        </div>
                        <div className="py-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="********"/>
                        </div>
                        <button className="btn btn-lg btn-secondary btn-block">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}