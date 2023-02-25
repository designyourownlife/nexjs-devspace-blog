import Link from 'next/link';
import Image from 'next/image';

import CategoryLabel from './CategoryLabel';

export default function Post({ post }) {
  const { frontmatter: fm } = post;
  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
      <Image
        src={fm.cover_image}
        alt={fm.title}
        height={420}
        width={600}
        className='mb-4 rounded'
      />
      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>{fm.date}</span>
        <CategoryLabel>{fm.category}</CategoryLabel>
      </div>
      <div className='mt-2'>
        <Link
          href={`/blog/${post.slug}`}
          className='text-2xl text-gray-700 font-bold transition duration-300 ease hover:underline hover:text-gray-600'
        >
          {fm.title}
        </Link>
        <p className='mt-2 text-gray-500'>{fm.excerpt}</p>
      </div>
      <div className='flex justify-between items-center mt-6'>
        <Link
          href={`/blog/${post.slug}`}
          className='text-gray-900 hover:text-rose-300'
        >
          &rarr; read more
        </Link>
        <div className='flex items-center'>
          <img
            src={fm.author_image}
            alt={fm.author}
            className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
          />
          <h3 className='text-gray-700 font-bold'>{fm.author}</h3>
        </div>
      </div>
    </div>
  );
}
