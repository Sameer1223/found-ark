import '../../style/Card.css'
import { useNavigate } from 'react-router-dom';

function Card(props) {
  let navigate = useNavigate();

  return (
    <div className="Card" onClick={() => navigate("../" + props.title, { replace: true })}>
      <img className="Image" src={props.img}/>
      <div className="TitleBar"/>
      <div className='Title'>{props.title.toUpperCase()}</div>
    </div>
  );
}

export default Card;