import '../../style/Banner.css'

function Banner(props) {
  return (
    <div className="Banner">
        <img className="Image" src={props.img}/>
        <div className="Title">{props.title}</div>
    </div>
  );
}

export default Banner;