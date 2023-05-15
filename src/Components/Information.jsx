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
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%" }}>Monday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%" }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"   }}>Tuesday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>Wednesday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>Thursday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>Friday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>11am - 7pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>Saturday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>12pm - 6pm</td>
                </tr>
                <tr>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>Sunday</td>
                    <td className="text-center" style={{ color: "black", background: "white", fontSize: "150%"  }}>1pm - 5pm</td>
                </tr>
            </tbody>
        </Table>
    );
}


function Information(props) {

    const loc = "https://www.google.com/maps/place/Zam+Zam+Bags+%26+Boutique/@43.7057991,-79.3486025,17z/data=!3m1!4b1!4m6!3m5!1s0x89d4cd34ccf10d77:0x52a8a954000f98c3!8m2!3d43.7057953!4d-79.3460276!16s%2Fg%2F11j03r8d3_"

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
                            <h1 style={{ color: "white", marginBottom: "10px" }}><a href={loc} target="_blank">45 Overlea Blvd, Unit 176</a></h1>
                            <h2 style={{ color: "white", marginBottom: "10px" }}>East York Town Center</h2>
                            <p style={{ color: "white", marginBottom: "10px" }}>Toronto, ON, M4H 1C3</p>
                            <h3 style={{ color: "white", marginBottom: "10px" }}>Call: 416-817-6849</h3>
                            <p style={{ color: "white", marginBottom: "10px" }}>EMAIL:</p>
                            <h3 style={{ color: "white", marginBottom: "10px" }}> - zamzam630@hotmail.com - <br /></h3> 
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
