import Link from "next/link";

// used in getStaticProps
import fs from "fs";
import utils from "util";
import path from "path";
import fm from "front-matter";
import serialize from "../utils/serialize";

const readdir = utils.promisify(fs.readdir);
const readfile = utils.promisify(fs.readFile);

export default (props) => {
  return (
    <>
      <div className="page">
        <h1>My blog</h1>
        <div className="page__posts">
          <ul className="posts">
            {props.posts.map((post) => {
              return (
                <Link key={post.postId} href={`/${post.postId}`}>
                  <li tabIndex={0} className="post">
                    <div className="post__header">
                      <p className="post__title">{post.attributes.title}</p>
                      <span className="post__date">
                        {new Date(post.attributes.publish_date).toDateString()}
                      </span>
                    </div>
                    <p className="post__description">
                      {post.attributes.description}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .posts > .post > .post__header > .post__title {
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .posts > .post > .post__header > .post__date {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.8);
        }

        .posts > .post > .post__header {
          display: flex;
          flex-wrap: nowrap;
          font-size: 1.5rem;
          align-items: center;
        }

        .posts > .post:hover,
        .posts > .post:focus,
        .posts > .post:active {
          outline: none;
          box-shadow: 0 -3.7px 5.1px rgba(0, 0, 0, 0.02),
            0 -5px 12.2px rgba(0, 0, 0, 0.028),
            0 -2.8px 22.9px rgba(0, 0, 0, 0.035),
            0 4.7px 40.9px rgba(0, 0, 0, 0.042),
            0 22.4px 76.5px rgba(0, 0, 0, 0.05),
            0 69px 183px rgba(0, 0, 0, 0.07);
        }

        .posts > .post {
          padding: 1rem;
          border-radius: var(--border-radius);
          transition: box-shadow 0.1s ease;
        }

        .posts {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .page > h1 {
          font-size: 3rem;
        }

        .page {
          width: 100vw;
          overflow-x: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
};

export async function getStaticProps() {
  const postFileNames = await readdir(path.resolve(process.cwd(), "posts"));

  const posts = [];

  for (let filename of postFileNames) {
    posts.push({
      attributes: fm(
        await readfile(path.resolve(process.cwd(), "posts", filename), {
          encoding: "utf8",
        })
      ).attributes,
      postId: path.basename(filename, ".md"),
    });
  }

  return {
    props: {
      posts: serialize(posts),
    },
  };
}
