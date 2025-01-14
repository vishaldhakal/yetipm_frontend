const BlogCard = ({ image, date, title, excerpt }) => {
  return (
    <div className="relative overflow-hidden bg-gray-900 group rounded-xl">
      <a href="#" title="" className="block">
        <img className="object-cover w-full h-full" src={image} alt={title} />
      </a>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 group-hover:backdrop-blur-[2px] transition-all duration-200 via-gray-900/20 to-transparent"></div>
      <div className="absolute transition-all duration-200 opacity-0 top-4 right-4 group-hover:opacity-100">
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="17" y1="7" x2="7" y2="17"></line>
          <polyline points="8 7 17 7 17 16"></polyline>
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="transition-all duration-300 transform translate-y-1/2 group-hover:translate-y-0">
          <p className="text-lg font-bold leading-tight text-white">
            <a href="#" title="">
              {title}
              <span className="absolute inset-0" aria-hidden="true"></span>
            </a>
          </p>
          <p className="mt-4 text-sm font-medium text-white/70">{date}</p>
          <p className="mt-5 text-sm font-normal leading-6 text-white">
            {excerpt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
