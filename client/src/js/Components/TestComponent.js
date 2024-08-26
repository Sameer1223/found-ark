function TestComponent(props) {
    return (  
        <div>
            <h2>{props.title}</h2>
            <p>{props.username}</p>
            <p>{props.laClass}</p>
            <p>{props.gamemode}</p>
            <p>{props.upvotes}</p>
            <p>{props.downvotes}</p>
        </div>
    );
}

export default TestComponent;