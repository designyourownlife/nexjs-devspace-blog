import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/post';
import { COLOR_KEYS } from '@/config';

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <>
      <Layout>
        <div className='flex justify-between'>
          <div className='w-full md:w-4/5 mr-10'>
            <h1 className='text-5xl border-b-4 p-5 font-bold'>
              Posts on{' '}
              <span className={`text-${COLOR_KEYS[categoryName]}-600`}>
                {categoryName}
              </span>
            </h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
            <Link
              href='/blog'
              className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-300 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'
            >
              All Posts
            </Link>
          </div>
          <div className='w-0 none md:w-1/5 md:block'>
            <CategoryList categories={categories} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const categories = files.map((filename) => {
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markDownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);

  const uniqueCategories = [...new Set(categories)];

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
