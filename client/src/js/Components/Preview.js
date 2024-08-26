import '../../style/Class.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { api } from "../api";
import { useMutation } from '@apollo/client';

function Preview(props) {
  let navigate = useNavigate();
  let mode = "Gamemode " + props.guide.gamemode;
  const [likeGuide] = useMutation(api.likeGuide(
    props.guide._id
  ), {
    onerror: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
        console.log(data) // the response
    }
  });

  return (
    <div className="Preview">
        <div className={mode}>{props.guide.gamemode}</div>
        <div className='Content' onClick={() => navigate("../" + props.guide.laClass + "/" + props.guide._id, { replace: true })}>
            <div className='Text'>By {props.guide.username}</div>
            <div className='Title'>{props.guide.title}</div>
        </div>
        <a className='Score' onClick={() => likeGuide({
          variables: {
            _id: props.guide_id
          }
        })}>
            <img className='Like' alt='Like' src={require('../../images/like.png')}/>
            <div className='Text'>{props.guide.upvotes} likes</div>
        </a>
    </div>
  );
}

export default Preview;