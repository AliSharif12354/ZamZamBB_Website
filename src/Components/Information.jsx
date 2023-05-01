import {
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../Styles/Information.module.css";
import { Table, Card } from 'react-bootstrap';



function HoursTable() {
    return (
        <Table bordered variant="dark" className="my-4">
            <thead>
                <tr>
                    <th colSpan="2" className="text-center h2">HOURS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Monday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Tuesday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Wednesday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Thursday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Friday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Saturday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>12pm - 6pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white" }}>Sunday</td>
                    <td className="text-center" style={{ color: "black", background: "white" }}>1pm - 5pm</td>
                </tr>
            </tbody>
        </Table>
    );
}


function Information(props) {
    return (
        <MDBContainer className="justify-content-center">
            <MDBRow className="justify-content-center">
                <MDBCol col="auto">
                    <br />
                    <Card border='info' className='text-center' bg='dark'>
                        <Card.Header>
                            <h1 style={{ color: "yellow" }}>Location</h1>
                        </Card.Header>
                        <Card.Body style={{ textAlign: "center" }}>
                            <h2 style={{ color: "white", marginBottom: "10px" }}>45 Overlea Blvd, Unit 176</h2>
                            <h2 style={{ color: "white", marginBottom: "10px" }}>East York Town Center</h2>
                            <p style={{ color: "white", marginBottom: "10px" }}>Toronto, ON, M4H 1C3</p>
                            <p style={{ color: "white", marginBottom: "10px" }}>Call: 416-817-6849</p>
                            <p style={{ color: "white", marginBottom: "10px" }}>EMAIL:</p>
                            <p style={{ color: "white", marginBottom: "10px" }}> - zamzam630@hotmail.com - <br /> Travel Needs</p>
                            <p style={{ color: "white", marginBottom: "10px" }}> - zamzam630@hotmail.ca - <br /> Clothing Needs</p>
                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol col="6">
                    {HoursTable()}
                </MDBCol>
            </MDBRow>
            <MDBCol col="12" className="pl-1">
                <br />
                <img
                    style={{ height: "50%", minWidth: "50%", objectFit: "fill", borderRadius: "10px" }}
                    className="img-fluid hover-shadow pd-0 w-100"
                    src={props.logo}
                    alt="Image not found"
                />
            </MDBCol>
            <br /><br /><br />
        </MDBContainer>
    );
}

export default Information;
