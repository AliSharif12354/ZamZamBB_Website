import "mdb-react-ui-kit/dist/css/mdb.min.css";

function Item(props) {
	return (
        <div className="p-3" style={{width: "30%"}}>
            <div className="p-3">
                <a href={props.link}>
                    <img style={{width: "100%", height: "100%"}} className="" src={props.logo} alt="Image not found"/> 
                </a>
                <p className="text-center">{props.description}</p>
            </div>
        </div>
	);
}

export default Item;