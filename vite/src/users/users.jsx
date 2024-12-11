import { useNavigate } from "react-router-dom"
import './users.css'

export function Users() {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/story');
    }

    return (
      <>
        <h1>Pending Approval</h1>

        <table className="table table-bordered mt-4">
          <tbody>
            <tr>
              <td>Chapter 13</td>
              <td>By: User3918</td>
              <td>
                <button onClick={handleNavigation} className="btn btn-primary btn-block">View Submission</button>
              </td>
              <td>
                <button className="btn btn-lg btn-success btn-block">Approve</button>
                <button className="btn btn-lg btn-danger btn-block">Deny</button>
              </td>
              
            </tr>
            <tr>
                <td>Chapter 14</td>
                <td>By: User007</td>
                <td>
                  <button onClick={handleNavigation} className="btn btn-primary btn-block">View Submission</button>
                </td>
                <td>
                  <button className="btn btn-lg btn-success btn-block">Approve</button>
                  <button className="btn btn-lg btn-danger btn-block">Deny</button>
                </td>
            </tr>
          </tbody>
          
        </table>
      </>
    );
}