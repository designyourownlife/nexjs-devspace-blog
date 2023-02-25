import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CategoryList({ categories }) {
  const { asPath: currentPath } = useRouter();
  console.log(currentPath);
  return (
    <div className='hidden md:block w-full p-0 bg-white rounded-lg shadow-md mt-6'>
      <h3 className='text-2xl bg-gray-800 text-white p-3 rounded'>
        Categories
      </h3>
      <ul className='divide-y divide-gray-300'>
        {categories.map((category, index) => (
          <Link
            href={`/blog/category/${category.toLowerCase()}`}
            key={index}
            className={
              currentPath === `/blog/category/${category.toLowerCase()}`
                ? 'active'
                : ''
            }
          >
            <li className='p-4 cursor-pointer hover:bg-gray-50 hover:text-rose-300'>
              {category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
