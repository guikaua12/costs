import React, {useEffect, useState} from 'react';
import './Posts.css';

function Posts() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setPosts(json);
                setLoading(false);
            });
    }, []);

    return (
        <div className="postsWrapper">
            {
                loading && <div>Loading...</div>
            }
            {
                posts.map(post => {
                    return (
                        <div key={post.id}> {post.id} </div>
                    );
                })
            }
        </div>
    );
}

export default Posts;