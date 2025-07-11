"use client";
import Link from "next/link";
import {
  FaStar,
  FaRegStar,
  FaBookmark,
  FaRegBookmark,
  FaFire,
} from "react-icons/fa";
import useStore from "@/store/WishlistStore";

export default function Card({
  id,
  imageUrl,
  title,
  rating,
  authorName,
  authorAvatarUrl,
  calories,
  cuisine,
}) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-red-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const { addToWishlist, removeItemFromWishlist, items } = useStore();
  const isInWishlist = items.some((item) => item.id === id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative group transition-transform duration-200 hover:scale-[1.02]">
      <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
        <Link href={`/recipes/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600">
          {isInWishlist ? (
            <FaBookmark
              className="text-red-500"
              onClick={() => removeItemFromWishlist(id)}
            />
          ) : (
            <FaRegBookmark
              className="text-gray-500 dark:text-gray-400"
              onClick={() => addToWishlist({ id, imageUrl, title, calories, rating })}
            />
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-1 mb-2">{renderStars()}</div>

        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 leading-tight mb-4">
          {title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          {/* {authorName && ( */}
            <div className="flex items-center space-x-2">
              {/* {authorAvatarUrl && (
                <img
                  src={authorAvatarUrl}
                  alt={authorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )} */}
              {/* <span>{authorName}</span> */}
              <span>{cuisine}</span>
              


            </div>
          {/* )} */}

          {calories && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
              <FaFire className="text-red-500 text-base" />
              <span>{calories} cals</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
