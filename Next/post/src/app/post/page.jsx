// import PostCard from "@/components/PostCard"

async function loadPosts() {
    const res = await fetch("https:jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    return data;
}
async function PostPages() {
    const posts = await loadPosts();
    const sleep = await new Promise((response) => setTimeout(response, 400));
    return (
        <>
        <h1>POSTS</h1>
        <div>

            <ul className="grid grid-cols-4">
                {posts.map((post) => (
                    <li className="bg-slate-400 m-2 rounded-lg" key={post.id}>
                        <p> Title: {post.title} </p>                    
                        <p> Body: {post.body} </p>
                    </li>
                ))}
            </ul>

        </div>
        </>
    )
}

export default PostPages