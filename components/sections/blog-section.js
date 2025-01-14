import BlogCard from "../cards/BlogCard";

const BlogSection = () => {
  const blogPosts = [
    {
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/4/thumbnail-1.png",
      title: "How to write content about your photographs",
      date: "April 09, 2022",
      excerpt:
        "Lorem ipsum dolor sit amet, consec tetur adip iscing elit quis auctor...",
    },
    {
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/4/thumbnail-2.png",
      title: "How to write content about your photographs",
      date: "April 09, 2022",
      excerpt:
        "Lorem ipsum dolor sit amet, consec tetur adip iscing elit quis auctor...",
    },
    {
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/4/thumbnail-3.png",
      title: "How to write content about your photographs",
      date: "April 09, 2022",
      excerpt:
        "Lorem ipsum dolor sit amet, consec tetur adip iscing elit quis auctor...",
    },
    {
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/4/thumbnail-4.png",
      title: "How to write content about your photographs",
      date: "April 09, 2022",
      excerpt:
        "Lorem ipsum dolor sit amet, consec tetur adip iscing elit quis auctor...",
    },
  ];

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 mt-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Learn how to improve your Photography skills
          </h2>

          <div className="mt-6 sm:mt-0 sm:shrink-0">
            <a
              href="#"
              title=""
              className="inline-flex items-center text-base font-medium text-gray-900 group"
            >
              See all articles
              <svg
                className="w-5 h-5 ml-2 transition-all duration-200 transform group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
