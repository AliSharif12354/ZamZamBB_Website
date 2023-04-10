import {
    MDBContainer,
    MDBCol,
    MDBRow } from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../Styles/Information.module.css";

function Information(props) {
	return (
        <MDBContainer className='justify-content-center'>
            <MDBRow className='justify-content-center'>
                <MDBCol className='pd-1'>
		            <img style={{height: "100%", minWidth: "400px"}} className='img-fluid hover-shadow pd-10 ' src={props.logo} alt="Image not found"/> 
                </MDBCol>
                <MDBCol>
                    <h1>Location</h1>
                    <p/>
                    <p>45 Overlea Blvd, Unit 176</p>
                    <p>Toronto, ON, M4H 1C3</p>
                    <p>416-817-6849</p>
                    <p>Zamzam630@hotmail.com - Travel needs</p>
                    <p>Zamzam630@hotmail.ca - Clothing needs</p>
                </MDBCol>
                <MDBCol>
                    <h1>Hours</h1>
                    <p/>
                    <p>Monday 11am - 7pm</p>
                    <p>Tuesday 11am - 7pm</p>
                    <p>Wednesday 11am - 7pm</p>
                    <p>Thursday 11am - 7pm</p>
                    <p>Friday 11am - 7pm</p>
                    <p>Saturday 12pm - 6pm</p>
                    <p>Sunday 1pm - 5pm</p>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

	);
}

export default Information;