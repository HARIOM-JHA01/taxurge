import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Details Page | Tax Urge",
  description: "This is Blog Details Page for Tax Urge",
};

const BlogDetailsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Blog Details"
        description="Stay informed with our latest insights and updates on tax-related matters."
      />

      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="flex flex-col-reverse gap-[50px] lg:flex-row">
            <div className="w-full lg:w-[33.33%]">
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <div className="border-b border-body-color border-opacity-10 py-4 px-6 dark:border-white dark:border-opacity-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Post Author
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="relative h-[70px] w-[70px] overflow-hidden rounded-full">
                        <Image
                          src="/images/blog/author-02.png"
                          alt="author"
                          fill
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">
                        Goutam Kumar Jha
                      </h4>
                      <p className="text-sm text-body-color">Tax Expert</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <div className="border-b border-body-color border-opacity-10 py-4 px-6 dark:border-white dark:border-opacity-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Popular Articles
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-[70px] w-[70px] overflow-hidden rounded-sm">
                        <Image
                          src="/images/blog/blog-details-02.jpg"
                          alt="image"
                          fill
                        />
                      </div>
                    </div>
                    <div>
                      <h4>
                        <a
                          href="#0"
                          className="mb-1 inline-block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
                        >
                          Understanding GST Returns
                        </a>
                      </h4>
                      <p className="text-sm text-body-color">Jan 15, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <div className="border-b border-body-color border-opacity-10 py-4 px-6 dark:border-white dark:border-opacity-10">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Popular Tags
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap">
                    <TagButton text="Tax" />
                    <TagButton text="GST" />
                    <TagButton text="ITR" />
                    <TagButton text="Finance" />
                    <TagButton text="Business" />
                  </div>
                </div>
              </div>

              <SharePost />
            </div>

            <div className="w-full lg:w-[66.66%]">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  10 Tips for Filing Your Income Tax Return Accurately
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src="/images/blog/author-02.png"
                            alt="author"
                            fill
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-base font-medium text-body-color">
                          By
                          <span className="pl-2">Goutam Kumar Jha</span>
                        </h4>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-2">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            className="fill-current"
                          >
                            <path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z" />
                            <path d="M6.429 8.67529H5.64035C5.49696 8.67529 5.40137 8.77089 5.40137 8.91428V9.67904C5.40137 9.82243 5.49696 9.91802 5.64035 9.91802H6.429C6.57239 9.91802 6.66799 9.82243 6.66799 9.67904V8.91428C6.66799 8.77089 6.5724 8.67529 6.429 8.67529Z" />
                            <path d="M8.93828 8.67529H8.14963C8.00624 8.67529 7.91064 8.77089 7.91064 8.91428V9.67904C7.91064 9.82243 8.00624 9.91802 8.14963 9.91802H8.93828C9.08167 9.91802 9.17727 9.82243 9.17727 9.67904V8.91428C9.17727 8.77089 9.08167 8.67529 8.93828 8.67529Z" />
                            <path d="M11.4715 8.67529H10.6828C10.5394 8.67529 10.4438 8.77089 10.4438 8.91428V9.67904C10.4438 9.82243 10.5394 9.91802 10.6828 9.91802H11.4715C11.6149 9.91802 11.7105 9.82243 11.7105 9.67904V8.91428C11.7105 8.77089 11.6149 8.67529 11.4715 8.67529Z" />
                            <path d="M3.89531 11.1606H3.10666C2.96327 11.1606 2.86768 11.2562 2.86768 11.3996V12.1644C2.86768 12.3078 2.96327 12.4034 3.10666 12.4034H3.89531C4.03871 12.4034 4.1343 12.3078 4.1343 12.1644V11.3996C4.1343 11.2562 4.03871 11.1606 3.89531 11.1606Z" />
                            <path d="M6.429 11.1606H5.64035C5.49696 11.1606 5.40137 11.2562 5.40137 11.3996V12.1644C5.40137 12.3078 5.49696 12.4034 5.64035 12.4034H6.429C6.57239 12.4034 6.66799 12.3078 6.66799 12.1644V11.3996C6.66799 11.2562 6.5724 11.1606 6.429 11.1606Z" />
                            <path d="M8.93828 11.1606H8.14963C8.00624 11.1606 7.91064 11.2562 7.91064 11.3996V12.1644C7.91064 12.3078 8.00624 12.4034 8.14963 12.4034H8.93828C9.08167 12.4034 9.17727 12.3078 9.17727 12.1644V11.3996C9.17727 11.2562 9.08167 11.1606 8.93828 11.1606Z" />
                            <path d="M11.4715 11.1606H10.6828C10.5394 11.1606 10.4438 11.2562 10.4438 11.3996V12.1644C10.4438 12.3078 10.5394 12.4034 10.6828 12.4034H11.4715C11.6149 12.4034 11.7105 12.3078 11.7105 12.1644V11.3996C11.7105 11.2562 11.6149 11.1606 11.4715 11.1606Z" />
                            <path d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.31296 0C6.59599 0 5.99853 0.597464 5.99853 1.31442C5.99853 1.91189 6.4287 2.43765 6.97837 2.58105V3.3697H1.36221C0.61918 3.3697 0 3.98888 0 4.73191V13.2637C0 14.0067 0.61918 14.6259 1.36221 14.6259H13.2637C14.0067 14.6259 14.6259 14.0067 14.6259 13.2637V4.73191C14.6259 3.98888 14.0067 3.3697 13.2637 3.3697ZM7.31296 0.795041C7.55909 0.795041 7.75972 0.995671 7.75972 1.24181C7.75972 1.48794 7.55909 1.68857 7.31296 1.68857C7.06683 1.68857 6.8662 1.48794 6.8662 1.24181C6.8662 0.995671 7.06683 0.795041 7.31296 0.795041ZM13.8308 13.2637C13.8308 13.5099 13.6302 13.7105 13.384 13.7105H1.24181C0.995671 13.7105 0.795041 13.5099 0.795041 13.2637V4.73191C0.795041 4.48578 0.995671 4.28515 1.24181 4.28515H13.384C13.6302 4.28515 13.8308 4.48578 13.8308 4.73191V13.2637Z" />
                          </svg>
                        </span>
                        Jan 15, 2024
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <a
                      href="#0"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Tax Tips
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Filing your income tax return can be a complex process, but with
                    proper preparation and attention to detail, you can ensure
                    accuracy and maximize your benefits. Here are 10 essential tips
                    to help you file your ITR correctly.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/images/blog/blog-details-02.jpg"
                        alt="image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    1. Gather all necessary documents before starting
                    <br />
                    2. Double-check your personal information
                    <br />
                    3. Report all sources of income
                    <br />
                    4. Claim eligible deductions and exemptions
                    <br />
                    5. Verify your bank account details
                    <br />
                    6. Keep records of your investments
                    <br />
                    7. File within the deadline
                    <br />
                    8. Review before submission
                    <br />
                    9. Pay any due taxes on time
                    <br />
                    10. Keep copies of your filed return
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;