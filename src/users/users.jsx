import { useNavigate } from "react-router-dom"
import './users.css'

export function Users() {

    return (
      <>
        <h1>User List</h1>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Date Joined</th>
              <th scope="col">Contributions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User3918</td>
              <td>10/27/2024</td>
              <td>109</td>
            </tr>
            <tr>
              <td>User04620</td>
              <td>07/13/2021</td>
              <td>1</td>
            </tr>
            <tr>
              <td>User007</td>
              <td>01/01/2020</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </>
    );
}