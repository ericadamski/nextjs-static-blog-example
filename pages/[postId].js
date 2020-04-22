import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
      <article className="page">
        <div className="content">
          <h1>
            {props.post.attributes.title}
            <span>
              Published on:{" "}
              {new Date(props.post.attributes.publish_date).toDateString()}
            </span>
          </h1>
          <ReactMarkdown source={props.post.body} />
        </div>
      </article>
      <style jsx>{`
        .page > .content > h1 > span {
          font-size: 1rem;
          font-weight: normal;
          font-family: Poppins, sans-serif;
        }

        .page > .content > h1 {
          font-size: 3rem;
          display: flex;
          flex-direction: column;
        }

        .page {
          width: 100vw;
          overflow-x: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content {
          max-width: 800px;
          width: 100%;
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
};

export async function getStaticProps({ params }) {
  return {
    props: {
      post: serialize(
        fm(
          await readfile(
            path.resolve(process.cwd(), "posts", `${params.postId}.md`),
            {
              encoding: "utf8",
            }
          )
        )
      ),
    },
  };
}

export async function getStaticPaths() {
  const postFileNames = await readdir(path.resolve(process.cwd(), "posts"));

  return {
    paths: postFileNames.map((filename) => ({
      params: { postId: path.basename(filename, ".md") },
    })),
    fallback: false,
  };
}
