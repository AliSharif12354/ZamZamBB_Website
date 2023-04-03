import Flyer from "./Flyer";

function Flyers(props) {
    let html = []
    for(let i = 0; i < props.flyers.size; i++) {
        console.log(html.push(<Flyer logo={props.flyers[i].logo}/>))
    }
    console.log(html)
	return (
		html
	);
}

export default Flyers;