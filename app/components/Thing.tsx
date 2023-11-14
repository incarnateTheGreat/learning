async function loadPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

type Post = {
  id: string | number;
  title: string;
  body: string;
};

const PostList = async () => {
  const posts = await loadPosts();
  return (
    <div className="post-list">
      {posts.map((post: Post) => (
        <div key={post.id} className="post-listing">
          <h3 className="post-title mt-4 text-3xl font-semibold">
            {post.title}
          </h3>
          <p className="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
