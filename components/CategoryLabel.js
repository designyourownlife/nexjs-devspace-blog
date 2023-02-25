import Link from 'next/link';
import { COLOR_KEYS } from '@/config';

export default function CategoryLabel({ children }) {
  return (
    <div
      className={`px-2 py-1 bg-${
        COLOR_KEYS[children.toLowerCase()]
      }-600 text-gray-100 rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
